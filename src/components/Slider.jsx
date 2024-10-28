import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Card from './CardProduto';

export default function Slider({ info, title }) {
  return (
    <>
      {info.length > 0 &&
        <h2 className='h2-c'>{title}</h2>
      }
      <Swiper
        slidesPerView={3}
        className='swiper p-2 md:py-4'
        onSlideChange={() => console.log('slide change')}
      >
        {info.map((product) => (
          <SwiperSlide className='!w-[4.5rem] md:!w-56' key={product.id || product.image}>
            <Card product={product} store={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
