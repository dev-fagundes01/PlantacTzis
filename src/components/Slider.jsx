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
        {info.map((produto) => (
          <SwiperSlide className='!w-[4.5rem] md:!w-56' key={produto.id || produto.image}>
            <Card produto={produto} btn={true} store={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
