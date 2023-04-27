import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

export default function ProductDetail() {
    const { search } = useLocation();
    const [product, setProduct] = useState(null);

    const params = new URLSearchParams(search);
    const productCode = params.get('code');
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
                    <div>
                        <h1>{product.mkName}</h1>
                        <h2>{product.productName}</h2>
                        <p>{product.badge}</p>
                        <img src={product.imageUrl} alt={product.productName} />
                        <p>Rating: {product.rating}</p>
                        <p>Price: {product.price}</p>
                        <p>Free Shipping: {product.freeShipping ? "Yes" : "No"}</p>
                        <p>Last Update: {product.lastUpdate}</p>
                        <div>
                            <p>Storage Options:</p>
                            <ul>
                                {product.storageOptions.map((option) => (
                                    <li key={option}>{option}</li>
                                ))}
                            </ul>
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