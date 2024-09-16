import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Our Product Store</h1>
            <p>Check out our products:</p>
            <ul>
                <li>
                    <Link href="/products/1">
                        <a>Product 1</a>
                    </Link>
                </li>
                <li>
                    <Link href="/products/2">
                        <a>Product 2</a>
                    </Link>
                </li>
                {/* Add more products as needed */}
            </ul>
        </div>
    );
};

export default HomePage;