import React, { Component } from 'react';

import { Link } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class Allproduct extends Component {
  render() {
    return (
      <>
        <Header />
        
        <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/pictures/banner.png" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="/pictures/banner.png" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="/pictures/banner.png" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    

       
        <Footer />
      </>
    )
  }
}

export default Allproduct;