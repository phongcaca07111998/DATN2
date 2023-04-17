import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import './addproduct.css';
import { db, storage } from "../../../Components/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterUsername, setEnterUsername] = useState("");
  
  const [enterProductImgs, setEnterProductImgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true);

    // Upload product images to Firebase Storage and get download URLs
    let imgUrls = [];
    for (let i = 0; i < enterProductImgs.length; i++) {
      const img = enterProductImgs[i];
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + img.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, img);

      try {
        await uploadTask;
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        imgUrls.push(imgUrl);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to upload product images!");
        return;
      }
    }

    // Add product to Firebase Firestore
    try {
      const docRef = await collection(db, "product");

      await addDoc(docRef, {
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        price: enterPrice,
        username:enterUsername,
        imgUrls: imgUrls,
      });

      setLoading(false);
      toast.success("Product successfully added!");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to add product!");
    }
  };

  return (
    <section className="section">
      <div className="container12"> 
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 ">Loading.......</h4>
            ) : (
              <>
                <h4 className="titlel mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={enterTitle}
                      onChange={e => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="lorem......"
                      value={enterShortDesc}
                      onChange={e => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description....."
                      value={enterDescription}
                      onChange={e => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>username</span>
                    <input
                      type="text"
                      placeholder="username....."
                      value={enterUsername}
                      onChange={e => setEnterUsername(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        value={enterPrice}
                        onChange={e => setEnterPrice(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        onChange={e => setEnterCategory(e.target.value)}
                      >
                        <option>Select category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group ">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={e => setEnterProductImgs(e.target.files)}
                        required
                        multiple
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn " type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AddProducts;
