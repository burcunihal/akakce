import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import currency from "currency.js"
import { FaStar, FaRegStar } from "react-icons/fa"

export default function ProductDetail() {
    const { search } = useLocation();
    const [product, setProduct] = useState(null);

    const params = new URLSearchParams(search);
    const productCode = params.get('code');
    const [selectedStorageOption, setSelectedStorageOption] = useState("");



    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://mocki.io/v1/1a1fb542-22d1-4919-914a-750114879775?code=${productCode}`);
            setProduct(response.data.result);
            console.log(response.data.result)
            console.log(product);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            {product ? (
                <>
                    <div className="product-detail">
      <div className="product-detail__info">
        <h1 className="product-detail__title">{product.mkName}</h1>
        <h2 className="product-detail__subtitle">{product.productName}</h2>
        <p className="product-detail__badge">{product.badge}</p>
        <p className="product-detail__rating">
          Rating: {product.rating.toFixed(1)}
        </p>
        <p className="product-detail__price">
          <span className="product-detail__price-label">Price: </span>
          <span className="product-detail__price-value">{currency(product.price, { symbol: '₺', precision: 0 }).divide(10).format()} </span>
        </p>
        <p className="product-detail__shipping">
           {product.freeShipping ? <h1 className='greenText'>Ücresiz Kargo </h1>: <b className='boldText'>Kargo Ücretlidir</b>}
        </p>
        <p className="product-detail__last-update">
          Son Güncelleme: {product.lastUpdate}
        </p>
        <div className="product-detail__storage-options">
          <p className="product-detail__storage-options-label">Storage Options:</p>
          <ul className="product-detail__storage-options-list">
            {product.storageOptions.map((option) => (

              <li key={option} className="product-detail__storage-option" onClick={() => setSelectedStorageOption(option)}
              >
                {option}
                
              </li>
            ))}
          </ul>
        </div>
       </div>
      <div className="product-detail__image-container">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="product-detail__image"
        />
      </div>
    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )

    // use the id parameter in your component
}