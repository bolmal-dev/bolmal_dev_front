'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import test1 from '../../public/ㅂㄹㅁㄹ.svg';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { fetchInstance } from '@/utils/fetchInstance';
import { useQuery } from '@tanstack/react-query';

export default function Ad() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['ad'],
        queryFn: async () => {
            const response = await fetchInstance(`/home/advertisement`, {}, true);
            return response.result.result;
        },
    });

    if (isLoading) {
        return <div>로딩중</div>;
    }

    if (isError) {
        return <div>에러가 발생했습니다</div>;
    }

    if (!data || data.length === 0) {
        return <div>광고 데이터가 없습니다</div>;
    }

    return (
        <div>
            <div className="w-[62.08vw] h-[23.81vw]">
                <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
                    className="mb-[1.04vw] bg-white rounded-[20px]"
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                >
                    {data.map((ad: any) => (
                        <SwiperSlide key={ad.id}>
                            <div className="flex items-center justify-center h-full">
                                {ad.imageUrl ? (
                                    <Image
                                        className="w-[62.08vw] h-[22vw]"
                                        src={ad.imageUrl}
                                        alt={ad.id}
                                        width={800}
                                        height={400}
                                    />
                                ) : (
                                    <>없음</>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="h-[0.55vw] gap-[0.55vw] flex ml-[0.97vw]">
                    {data.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => swiper?.slideTo(index)}
                            className={`h-[0.55vw] ${
                                activeIdx === index
                                    ? 'bg-primary-bg w-[1.38vw] rounded-[100px]'
                                    : 'bg-gray-300 w-[0.55vw] rounded-[50%]'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
