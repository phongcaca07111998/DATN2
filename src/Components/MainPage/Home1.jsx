import React from "react"
import { Banner } from "../banner/banner"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"

const Home1 = () => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories />

          {/* <SliderHome /> */}
          <Banner/>
        </div>
      </section>
    </>
  )
}

export default Home1
