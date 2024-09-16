"use client"
import React from 'react';
import { useRouter } from 'next/router';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Display loading message until ID is available
    if (typeof id === 'undefined') {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <p>Product ID: {id}</p>
        </div>
    );
};

export default ProductPage;