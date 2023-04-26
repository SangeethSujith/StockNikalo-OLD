import React, { useState } from 'react'
type ImageCarouselProps = {
    imageArr:[],
    defaultimage:string
};


const ImageCarousel: React.FC<any> = (props: ImageCarouselProps) => {
    
    const {imageArr,defaultimage}=props;

  return (
    <div id="carouselExampleControls" className="carousel slide d-flex" data-ride="carousel">
    <div className="carousel-inner">
            {
            imageArr?.map((item: any,index:number) => ( 
                <div className={`carousel-item ${index?"":"active"}`}>
                            <img className="d-block w-100" 
                            src={
                            item?.image
                                ? item?.image
                                : defaultimage
                                // "/assets/images/products/product-1.jpg"
                            }
                            data-zoom-image={
                            item?.image
                                ? item?.image
                                : defaultimage
                            }
                            alt="proudct-img"
                            width={480} 
                            height={480}/>
                    </div>
                ))
            }
    </div>
    <a className="carousel-control-prev"  href="#carouselExampleControls" role="button" data-slide="prev" 
     style={{top:"50%"}}>
      <span className="carousel-control-prev-icon bg-info" aria-hidden="true" ></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" style={{top:"50%"}}>
      <span className="carousel-control-next-icon bg-info" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  )
}

export default ImageCarousel
