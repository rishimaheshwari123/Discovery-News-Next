'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaHome, FaSearch } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../services/operations/admin"; // Adjust path as needed
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { category } = useSelector((state) => state.news);
  const [categories, setCategories] = useState([]);

  const handleDropdownToggle = (index, hasSublinks) => {
    if (hasSublinks) {
      if (openDropdown === index) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(index);
      }
    } else {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();

        // Filter out the "राज्य" category
        const filteredCategories =
          categoriesData?.categories.filter(
            (cat) => cat.name.trim() !== "राज्य"
          ) || [];

        reorderCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (category.length !== 0) {
      // Filter out the "राज्य" category from existing data
      const filteredCategories = category.filter(
        (cat) => cat.name.trim() !== "राज्य"
      );

      reorderCategories(filteredCategories);
    } else {
      fetchCategories();
    }
  }, [category]);

  const reorderCategories = (categoriesList) => {
    const fixedOrder = ["विदेश", "देश", "मनोरंजन", "खेल"];
    const orderedCategories = fixedOrder
      .map((fixedCat) =>
        categoriesList.find((cat) => cat.name.trim() === fixedCat)
      )
      .filter(Boolean);

    const remainingCategories = categoriesList.filter(
      (cat) => !fixedOrder.includes(cat.name.trim())
    );

    setCategories([...orderedCategories, ...remainingCategories]);
  };

  return (
    <nav className="bg-black lg:bg-red-600">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex">
          <Link href="/" passHref>
            <div className="text-white lg:mr-3">
              <FaHome size={22} />
            </div>
          </Link>
          <div className="hidden lg:flex ">
            {categories.map((link, index) => (
              <div key={index} className="group relative z-50">
                <Link href={`/category/${link?._id}`} passHref>
                  <div
                    className="text-white hover:bg-gray-100 text-[16px] font-bold hover:text-black px-3"
                    onClick={handleLinkClick}
                  >
                    {link?.name}
                  </div>
                </Link>
                {link?.subCategories && link?.subCategories?.length > 0 && (
                  <div className="absolute left-0 top-8 text-[16px] font-bold bg-red-600 py-2 w-32 hidden group-hover:block text-start">
                    {link?.subCategories.map((sublink, subIndex) => (
                      <Link href={`/subcategory/${sublink?._id}`} passHref key={subIndex}>
                        <div
                          className="block text-white hover:bg-gray-100 hover:text-black px-3 py-2"
                          onClick={handleLinkClick}
                        >
                          {sublink?.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Adding Video and Live TV links */}
            <Link href="/video" passHref>
              <div className="text-white hover:bg-gray-100 text-[16px] font-bold hover:text-black px-3">
                वीडियो
              </div>
            </Link>
            <Link href="/live-tv" passHref>
              <div className="text-white hover:bg-gray-100 text-[16px] font-bold hover:text-black px-3">
                Live TV
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleSearch} className="text-white bg-gray-200 rounded-md p-2">
            <FaSearch className="text-black" />
          </button>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <FaBars size={24} />
            </button>
          </div>

          <SearchBox isOpen={isSearchOpen} toggleSearch={toggleSearch} />
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          {categories.map((link, index) => (
            <div key={index} className="border-b border-gray-200">
              <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
                <Link href={`/category/${link?._id}`} passHref>
                  <div className="text-white" onClick={handleLinkClick}>
                    {link?.name}
                  </div>
                </Link>
                {link.subCategories && link?.subCategories?.length > 0 && (
                  <>
                    {openDropdown === index ? (
                      <AiOutlineMinus
                        className="text-white cursor-pointer"
                        onClick={() =>
                          handleDropdownToggle(index, link.subCategories)
                        }
                      />
                    ) : (
                      <AiOutlinePlus
                        className="text-white cursor-pointer"
                        onClick={() =>
                          handleDropdownToggle(index, link.subCategories)
                        }
                      />
                    )}
                  </>
                )}
              </div>
              {openDropdown === index && link.subCategories && (
                <div className="bg-black pl-4">
                  {link.subCategories.map((sublink, subIndex) => (
                    <Link href={`/subcategory/${sublink?._id}`} passHref key={subIndex}>
                      <div
                        className="block text-white px-4 py-2"
                        onClick={handleLinkClick}
                      >
                        {sublink.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Adding Video and Live TV links for mobile */}
          <div className="border-b border-gray-200 px-4 py-2">
            <Link href="/video" passHref>
              <div className="text-white" onClick={handleLinkClick}>
                वीडियो
              </div>
            </Link>
          </div>
          <div className="border-b border-gray-200 px-4 py-2">
            <Link href="/live-tv" passHref>
              <div className="text-white" onClick={handleLinkClick}>
                Live TV
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
