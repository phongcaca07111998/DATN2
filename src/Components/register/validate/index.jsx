import * as Yup from "yup";

const phoneRegExp =
  // /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  /^(\+?84|0)(3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/
// const number = /^[0-9]{9,12}$/i;

export const RegisterSchema = Yup.object().shape({
  // password: Yup.string()
  //   .required("Bắt buộc")
  //   .min(6, "Tối thiểu 6 ký tự")
  //   .max(30, "Quá dài"),
  hovaten: Yup.string().min(6, "Tối thiểu 6 ký tự"),
  username: Yup.string().min(6, "Tối thiểu 6 ký tự").matches(/^[a-zA-Z0-9._-]+$/, 'Username không hợp lệ'),
  email: Yup.string().email("Sai định dạng").required("Bắt buộc"),
  password: Yup.string().required("Bắt buộc").min(6, "Mật Khẩu phải từ 8-16 kí tự"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])/,
  //   "Mật Khẩu phải từ 8-16 kí tự, bao gồm chữ cái in hoa, chữ cái in thường, ký tự đặc biệt và con số."
  // ),
  password_confirm: Yup.string()
    .required("Bắt buộc")
    .oneOf([Yup.ref("password"), null], "Không trùng"),
    
  // gender: Yup.string()
  //   .oneOf(["1", "2", "3"], "Bạn không thể để trống Field này")
  //   .required(Messages.bat_buoc),
  // birthday: Yup.string().nullable(),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone không hợp lệ")
    
});
