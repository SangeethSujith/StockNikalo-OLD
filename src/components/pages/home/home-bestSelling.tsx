import React, { useEffect, useState } from "react";
import BestSellProducts from "../../common/best-sellproducts";
import useScript from "../../hooks/useScript";

type HomeBestSellingProps = {
  data: any;
};

const HomeBestSelling: React.FC<HomeBestSellingProps> = (props: any) => {
  const { data } = props;
  const [imageArr, setImageArr] = useState([]);
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/assets/js/main.min.js";
    // document.body.appendChild(script);
    if(data?.products?.length > 0)setImageArr(data.products)
    else setImageArr([])
  }, [data])
  
  useScript("/assets/js/main.min.js","")
  
  return (
    <div
      className="tab-pane fade show active "
      id="customer-content"
      role="tabpanel"
      aria-labelledby="tab-customer"
    >
      <div className="row ">
        <div className="col-md-8">
          <div className="card selling-crd">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h3>{data.category}</h3>
                  <p>
                  {data.description}
                  </p>
                  <button className="btn btn-primary">
                    Shop Now &nbsp;
                    <i className="fas fa-angle-right" />
                  </button>
                </div>
                <div className="col-md-3">
                  {" "}
                  <img 
                  src={ data.image ? data.image :"/assets/images/products/product-1.jpg"}
                  alt="product" />
                  {" "}
                </div>
                <div className="col-md-3">
                  {" "}
                  <img 
                  src={ data.image1 ? data.image1 :"/assets/images/products/product-1.jpg"}
                  alt="product" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
            {
             imageArr.length > 0 ? < BestSellProducts productList={imageArr.slice(0, 5)} /> :""
            }
        </div>
      </div>
    </div>
  );
};
export default HomeBestSelling;
