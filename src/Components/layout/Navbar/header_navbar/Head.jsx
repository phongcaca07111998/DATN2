import React from 'react'
import Slider from 'react-slick'
import banner1 from './../../../../assets/img-banner/banner-3.png'
import banner2 from './../../../../assets/img-banner/banner-4.png'




export const Head = () => {
  var settings = {
    fade: true,
    autoplay: true,
    infinite: true,
    initialSlide: 0,
    speed: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return (
      <Slider {...settings}>
        <div className="slide-banner1">
          <img src={banner1} style={{width: "100%", height: "100"}} alt="" />
        </div>
        <div className="slide-banner1">
          <img src={banner2}  style={{width: "100%", height: "100"}} alt="" />
        </div>
        <div className="slide-banner1">
          <img src="https://s.meta.com.vn/img/thumb.ashx/Data/2023/Thang05/ngay-cua-me/Banner-ngay-cua-me-1236x60.png"  style={{width: "100%", height: "100"}} alt="" />
        </div>
        <div className="slide-banner1">
          <img src="https://s.meta.com.vn/img/thumb.ashx/Data/2023/Thang05/sea-games/Banner-sea-games-1236x60.png"  style={{width: "100%", height: "100"}} alt="" />
        </div>
        
      </Slider>
    );
  };
  export default Head