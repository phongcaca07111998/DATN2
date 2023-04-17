import { useEffect, useState } from "react";

import { db } from "../../Components/firebase/firebase";

import { collection, onSnapshot } from "firebase/firestore";

import "./comments.scss";

import ReactStars from "react-rating-stars-component";

import { doc, getDoc, addDoc } from "firebase/firestore"

import useGetData from "../../custom-hooks/useGetData";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { getAuth } from "firebase/auth";

const CommentSection = () => {
    const {currentUser} = getAuth();

    const { data: commentsData, loading } = useGetData("comments");
    const location = useLocation();

    const productId = location.pathname.split("/")[2];
    const mainComment = useMemo(() => {
        return commentsData.filter(commentData => commentData.idcomment === productId);
      }, [commentsData, productId]);
      
      const [comment, setComment] = useState([]);
      const [comments, setComments] = useState([]);
      const [rating, setRating] = useState(0);
      
      useEffect(() => {
        if (!loading) {
          setComments(mainComment);
        }
      }, [loading, mainComment]);

    const handleRatingChange = (newRating) => {

        setRating(newRating);

    };

    const handleCommentChange = (event) => {

        setComment(event.target.value);

    };

    const handleSubmitComment = async () => {

        const newComment = {

            name: currentUser.displayName,

            content: comment,

            rating: rating,

            idcomment: productId

        };

        try {

            const docRef = await addDoc(collection(db, "comments"), newComment);

            setComments([...comments, { ...newComment, id: docRef.id }]);

            setComment("");

            setRating(0);

        } catch (error) {

            console.error("Error adding document: ", error);

        }

    };

    return (

        <div>

            <h2>Đánh giá và bình luận</h2>

            <div className="rating">

                <ReactStars

                    count={5}

                    onChange={handleRatingChange}

                    size={24}

                    activeColor="#ffd700"

                />

                <span>{rating} sao</span>

            </div>

            <div className="comment">

                <textarea

                    placeholder="Viết bình luận của bạn..."

                    value={comment}

                    onChange={handleCommentChange}

                ></textarea>

                <button onClick={handleSubmitComment}>Gửi</button>

            </div>

            <div className="comments">

                {comments.map((comment) => (

                    <div key={comment.id} className="comment-item">

                        <div className="comment-header">

                            <span>{comment.name}</span>

                            <ReactStars

                                count={5}

                                value={comment.rating}

                                size={16}

                                edit={false}

                                activeColor="#ffd700"

                            />

                        </div>

                        <div className="comment-content">{comment.content}</div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default CommentSection;