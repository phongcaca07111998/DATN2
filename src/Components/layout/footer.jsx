import React from "react";
import momo from "../../assets/imgs/momo.svg";
import vnpay from "../../assets/imgs/vnpay.svg";
import cash from "../../assets/imgs/cash_vi.svg";
import fb from "../../assets/imgs/facebook.svg";
import ig from "../../assets/imgs/instagram.svg";
import tw from "../../assets/imgs/twitter.svg";
import appstore from "../../assets/download/appstore.svg";
import ggplay from "../../assets/download/ggplay.svg";
import logo_CCDV from "../../assets/imgs/logo_CCDV_BCT.svg";

export const Footer = () => {
  return (
    <div className="footer_bidu">
      <div className="containeer">
        <div className="instruction-one">
          <h1 className="text-header-footer">CHĂM SÓC KHÁCH HÀNG</h1>
          <a href="#" className="d-block my-3">
            Hướng dẫn mua hàng
          </a>
          <a href="#" className="d-block my-3">
            Hướng dẫn đổi trả hàng
          </a>
        </div>
        <div className="instruction-one">
          <h1 className="text-header-footer">Về Chúng Tôi</h1>
          <a href="#" className="d-block my-3">
            Giới thiệu
          </a>
          <a href="#" className="d-block my-3">
            Tuyển dụng
          </a>
          <a href="#" className="d-block my-3">
            Quy chế hoạt động
          </a>
          <a href="#" className="d-block my-3">
            Chính sách giải quyết khiếu nại
          </a>
          <a href="#" className="d-block my-3">
            Chính sách bảo mật
          </a>
        </div>
        <div className="instruction-one">
          <h1 className="text-header-footer">Thanh toán</h1>
          <img className="pr-3" src={vnpay} alt="" />
          <img className="pr-3" src={momo} alt="" />
          <img className="pr-3" src={cash} alt="" />
        </div>
        <div className="instruction-one">
          <h1 className="text-header-footer">Kết nối với chung tôi</h1>
          <img className="px-3" src={fb} alt="" />
          <img className="px-3" src={ig} alt="" />
          <img className="px-3" src={tw} alt="" />
          <h1 className="text-header-footer">TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</h1>
          <img className="max-h-120 pr-3" src={appstore} alt="" />
          <img className="max-h-120 pr-3" src={ggplay} alt="" />
        </div>
      </div>
      <div className="footer-info">
        <div>
          <h1 className="infor-company">Công Ty Sinh Học</h1>
          <a href="" className="mx-2">
            <img src={logo_CCDV} alt="" />
          </a>
          <a href="" className="mx-2">
            <img src={logo_CCDV} alt="" />
          </a>
          <h1 className="infor-contact">
            Địa chỉ: 96 Ngô Tất Tố
          </h1>
          <h1 className="infor-enterprise">
            Người đại diện pháp luật: Hái Hoàng Hửa , Trong Vũ Phương
          </h1>
          <h1 className="infor-license">
            © 2023 - Bản quyền thuộc về Công ty Sinh Học
          </h1>
        </div>
      </div>
    </div>
  );
};
