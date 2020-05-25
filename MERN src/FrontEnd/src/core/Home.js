import React, {useState, useEffect} from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';




export default function Home() {

    const [products, setProducts] = useState([])
    const [error, seterror] = useState(false)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data.error){
                seterror(data.error)
            } else {
                setProducts(data)
            }
        });
    };

    useEffect(() => {
        loadAllProducts()
    }, []);

    console.log("API IS", API);
    return (
      <Base title="Home Page" description="Welcome to the TShirts site">
          <div className="row text-center">
              <h1 className = "text-white">All of TSHIRTS</h1>
              <div className="row">
              {products.map((product, index) => {
                  return(
                      <div key = {index} className = "col-4 mb-4">
                          <Card product = {product}></Card>
                      </div>
                  );
              })}
              </div>
          </div>
      </Base>
  );
};