import { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from "@remix-run/react"

export default function Products() {
    const [horizontalProducts, setHorizontalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://mocki.io/v1/59906f35-d5d5-40f7-8d44-53fd26eb3a05');
            const { horizontalProducts, products, nextUrl } = response.data.result;
            setHorizontalProducts(horizontalProducts);
            setProducts(products);
            setNextUrl(nextUrl);
        } catch (error) {
            console.error(error);
        }
    };
    const renderHorizontalProducts = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <Slider {...settings}>

                {horizontalProducts.map(product => (
                    <Link to={`/productDetail/?code=${product.code}`}>
                    <div key={product.code}> 
                        <img src={product.imageUrl} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                    </Link>


                ))}
            </Slider>
        );
    };
    const renderProducts = () => {
        return (
            <>
                <div className='product-grid'>

                    {products.map(product => (
                        <Link to={`/productDetail/?code=${product.code}`}>
                        <div className='card' key={product.code}>
                            
                            <img src={product.imageUrl} alt={product.name} />
                            <div className='card-body'>
                                <h5 className='card-title'>{product.name}</h5>
                                <p className='card-text'>{product.price}</p>
                                
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };

    return (
        <main>
            <div >{renderHorizontalProducts()}</div>
            <div className="relative min-h-screen  sm:flex sm:items-center sm:justify-center">
                {renderProducts()}
            </div>
        </main>
    )
}