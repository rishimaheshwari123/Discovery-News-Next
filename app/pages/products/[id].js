"use client"
// pages/products/[id].js
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the URL
    // const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     if (id) {
    //         // Fetch the product details based on the ID
    //         const fetchProduct = async () => {
    //             const response = await fetch(`/api/products/${id}`);
    //             const data = await response.json();
    //             setProduct(data);
    //         };

    //         fetchProduct();
    //     }
    // }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>Product ID: {id}</h1>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

export default ProductPage;
