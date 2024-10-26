import React from 'react';
import Image from 'next/image';
import banner from '../../assests/banner.png';
import logo from '../../assests/newlogo.jpg';

function LogoSpace() {
  return (
    <div className="max-w-7xl p-4 mx-auto">
      <div className="flex justify-center mb-8">
        <Image 
           width={500}
           height={500}
          src={logo} 
          alt="Logo" 
          className="lg:max-h-[150px] max-h-[100px]" 
         
        />
      </div>
      {/* <div className="flex justify-center">
        <Image 
          src={banner} 
          alt="Banner" 
         
        />
      </div> */}
    </div>
  );
}

export default LogoSpace;
