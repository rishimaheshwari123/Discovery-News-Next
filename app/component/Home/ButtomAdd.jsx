import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useSelector } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';

const ButtomAdd = () => {
  const { ads } = useSelector((state) => state.news);

  return (
    <div className="flex justify-center items-center -mb-30 lg:mt-0 mt-[130px]">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        className="max-w-7xl mx-auto"
      >
        {Array.isArray(ads) &&
          ads.map(
            (currElem, index) =>
              currElem?.type === "buttom-add" && (
                <SwiperSlide key={index}>
                  <Link href={currElem?.url} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                      <Image
                        src={currElem?.image}
                        alt="not found"
                        layout="responsive"
                        width={500} // Adjust width as needed
                        height={300} // Adjust height as needed
                        className="w-full"
                      />
                    </a>
                  </Link>
                </SwiperSlide>
              )
          )}
      </Swiper>
    </div>
  );
};

export default ButtomAdd;
