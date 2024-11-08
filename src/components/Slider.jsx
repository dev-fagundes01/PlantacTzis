import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Card from './CardProduto';
import { twMerge } from 'tailwind-merge';

export default function Slider({ title, info, className }) {
  return (
    <>
      {info.length > 0 &&
        <h2 className='h2-c dm:text-lg'>{title}</h2>
      }
      <Swiper
        slidesPerView={3}
        className={twMerge('swiper dm:mr-[-3rem] p-2 md:py-4', className)}
        onSlideChange={() => console.log('slide change')}
      >
        {info.map((product) => (
          <SwiperSlide className='!w-[6.5rem] md:!w-56' key={product.id || product.image}>
            <Card product={product} store={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
