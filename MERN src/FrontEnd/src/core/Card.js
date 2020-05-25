import React, {useState, useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const Card = ({
    product, 
    addtoCart = true, 
    removefromCart = false, 
    setReload = f => f, 
    reload = undefined 
    }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const CardTitle = product ? product.name: "A photo from Unsplash"
    const CardDescription = product ? product.description: "Default description"
    const CardPrice = product ? product.price: "Default price"

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
        if(redirect) {
            return <Redirect to = "/cart"/>
        }
    }

    const showAddToCart = (addtoCart) => {
        return(
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = (removefromCart) => {
        return(
            removefromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2">
                    Remove from Cart
                </button>
            )
        );
    };

        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{CardTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
              <ImageHelper product={product}></ImageHelper>
              <p className="lead bg-success font-weight-normal text-wrap">
                {CardDescription}
              </p>
                <p className="btn btn-success rounded  btn-sm px-4">${CardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removefromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };

export default Card;