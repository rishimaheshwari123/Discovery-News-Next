import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

const RightAds = () => {
  const { ads } = useSelector((state) => state.news);

  // Filtering ads with type 'right-add'
  const filterAds = ads?.filter((ad) => ad?.type === "right-add");

  useEffect(() => {
    console.log(filterAds);
  }, [filterAds]); // Dependency array ensures this runs when filterAds changes

  return (
    <div className='mt-[20px] border-t border-black'>
      {Array.isArray(filterAds) &&
        filterAds.map((currElem, index) => (
          <Link href={currElem?.url} key={index} passHref>
            <div className="block mb-4" target="_blank" rel="noopener noreferrer">
               <Image  width={500}
                    height={500}
                src={currElem?.image}
                alt="Ad Image"
                className="w-full rounded-lg shadow-md hover:shadow-lg transition duration-300"
              />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RightAds;
