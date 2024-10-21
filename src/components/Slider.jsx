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
        spaceBetween={50}
        slidesPerView={3}
        className='swiper p-2 md:py-4'
        onSlideChange={() => console.log('slide change')}
      >
        {info.map((produto) => (
          <SwiperSlide key={produto.id || produto.image} className='md:!w-52 md:h-80'>
            <Card produto={produto} btn={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};