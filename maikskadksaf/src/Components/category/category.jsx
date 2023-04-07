import React from "react";
import "./category.scss";
export const Category = (prop) => {
  const filterSearch = (data) =>{
    prop.sentData(data)
  }
  return (
    <div className="Category">
      <div className="Category_header">
          <p>Danh mục</p>
      </div>
      <div className="Category_content">
          <p onClick={(e) => filterSearch("all")}>Tất cả</p>
          <p onClick={(e) => filterSearch("asus")}>Asus</p>
          <p onClick={(e) => filterSearch("acer")}>Acer</p>
          <p onClick={(e) => filterSearch("dell")}>Dell</p>
          <p onClick={(e) => filterSearch("lenovo")}>Lenovo</p>
          <p onClick={(e) => filterSearch("msi")}>MSI</p>
      </div>
    </div>
  );
};
