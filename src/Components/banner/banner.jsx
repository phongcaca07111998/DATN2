import React from 'react'
import './banner.scss'
import Slider from 'react-slick'
import banner1 from '../../assets/img-banner/banner1.jpg'
import banner2 from '../../assets/img-banner/banner2.jpg'
import banner3 from '../../assets/img-banner/banner3.jpg'
import banner4 from '../../assets/img-banner/banner4.jpg'
import banner5 from '../../assets/img-banner/banner5.jpg'

export const Banner = () => {
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
        {/* <div className="slide-banner">
          <img className="anhbaner" src={banner1} alt="" />
        </div> */}
        <div className="slide-banner">
          <img className="anhbaner" src={banner2} alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src={banner3} alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src={banner4} alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src={banner5} alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src="https://s.meta.com.vn/img/thumb.ashx/Data/2022/Thang03/Banner-may-hut-bui-720x445.png" alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src="https://s.meta.com.vn/img/thumb.ashx/0x0x95/Data/image/2023/04/20/Banner-tv-samsung-970x270.png" alt="" />
        </div>
        <div className="slide-banner">
          <img className="anhbaner" src="https://s.meta.com.vn/img/thumb.ashx/0x0x95/Data/image/2023/05/05/Banner-chao-he-970x270.png" alt="" />
        </div>
        
        
      </Slider>
    );
  };
  