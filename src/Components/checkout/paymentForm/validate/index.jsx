import * as Yup from "yup";

const phoneRegExp =
  // /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  /^(\+?84|0)(3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/
// const number = /^[0-9]{9,12}$/i;

  export const PaymentSchema = Yup.object().shape({
  name: Yup.string()
    .required("Bắt buộc")
    .min(6, "Tối thiểu 6 ký tự")
    .max(30, "Quá dài"),
    
    phone: Yup.string()
    
    .matches(phoneRegExp, "Phone không hợp lệ")
    
    .required("Bắt buộc"),
    address: Yup.string()
    .required("Bắt buộc")
    .min(10, "Tối thiểu 10 ký tự")
});
