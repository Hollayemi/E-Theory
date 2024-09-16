import React from 'react';
import Images from '../../Assets/Images/Images'
import {Carousel } from 'react-bootstrap';


const CarouselDiv = () =>{

  return(
    <div >
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
          className="d-block w-100"
          src={Images.slide2}
          alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
          className="d-block w-100"
          src={Images.slide1}
          alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
export default CarouselDiv;