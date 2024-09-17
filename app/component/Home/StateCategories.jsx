"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { fetchCategory } from '../../services/operations/admin';

const StateSubcategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const categoriesData = await fetchCategory();
        console.log("Fetched categories data:", categoriesData);

        // Find the "राज्य" category
        const stateCategory = categoriesData?.categories.find(
          (cat) => cat.name.trim() === "राज्य"
        );

        if (stateCategory) {
          setSubCategories(stateCategory.subCategories || []);
        } else {
          setSubCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="relative p-4 text-center text-gray-600">Loading...</div>
    );
  }

  if (error) {
    return <div className="relative p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="relative bg-gray-200 p-4 rounded-md shadow-md">
      {subCategories.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-w-7xl mx-auto">
          {subCategories.map((sublink) => (
            <Link
              key={sublink?._id}
              href={`/subcategory/${sublink?._id}`}
            >
              <p className="block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                {sublink?.name}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No subcategories available
        </div>
      )}
    </div>
  );
};

export default StateSubcategories;
