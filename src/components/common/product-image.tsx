import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import RoutePath from '../global/route-paths';
import useScript from '../hooks/useScript';
type ProductImageProps = {
    productList:[]
};

const ProductImage: React.FC<any> = (props: ProductImageProps)=>{
    const {productList} = props;

    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "/assets/js/main.min.js";
    //     document.body.append(script);
    //   }, []);

    useScript("/assets/js/main.min.js","")
    const navigate = useNavigate();
      
    return ( 
        <div
        className="owl-carousel owl-theme appear-animate"
        data-owl-options="{
        'loop': false,
        'dots': false,
        'nav': true,
        'margin': 20,
        'responsive': {
            '0': {
                'items': 1
            },
            '576': {
                'items': 4
            },
            '991': {
                'items': 5
            }
        }
    }"
      >
     
        {  Array.isArray(productList) &&
            productList.length > 0 &&
            productList.map((product:any) =>(
                    <div className="product-default inner-quickview inner-icon">
                                <figure>
                                {" "}
                                <a href="#" onClick={() =>
                            navigate(`${RoutePath.product}/${product.id}`)}>
                                    {" "}
                                    <img
                                    src={
                                        product?.images
                                        ? product?.images[0]?.image
                                        : "/assets/images/products/product-1.jpg"
                                    }
                                    width={300}
                                    height={300}
                                    alt="product"
                                    />{" "}
                                </a>{" "}
                                </figure>
                                <div className="product-details">
                                <div className="category-wrap">
                                    <div className="category-list">
                                    {" "}
                                    <a
                                        href="#"
                                        className="bg-success p-2 rounded-1 text-white"
                                    >
                                        {product.rating}&nbsp;
                                        <i className="fa fa-star" />
                                    </a>{" "}
                                {product.variation}{" "}
                                    </div>
                                </div>
                                <h3 className="product-title">
                                    {" "}
                                    <a href="#">
                                    {/* iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire
                                    MAG Welding Machine with 1 Year Warranty */}
                                    {product.shortName}
                                    </a>{" "}
                                </h3>
                                {/* End .product-container */}
                                <div className="price-box">
                                    {" "}
                                    <span className="product-price">${product.salePrice}</span>{" "}
                                    {product.salePrice >= product.mrp ? "":<del className="old-price">${product.mrp}</del>}                          
                                    <div className="category-list">
                                    {" "}
                                    <a href="#">{product.sku}% OFF</a>{" "}
                                    </div>
                                </div>
                                {/* End .price-box */}
                                </div>
                                {/* End .product-details */}
                    </div> 
             
            ))

        }
  
          </div>
   
             

    )
} 
export default ProductImage


