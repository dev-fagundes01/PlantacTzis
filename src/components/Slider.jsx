import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Card from './Card';

export default function Slider({ info, title }) {
  return (
    <>
      <h2 className='h2'>{title}</h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        className='swiper py-4'
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {info.map((item) => (
          <SwiperSlide className='!w-52 h-80' key={item.id}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};