'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import test1 from '../../../public/ㅂㄹㅁㄹ.svg';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { useRouter } from 'next/navigation';

export default function WeeklyTicke() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const router = useRouter();
    const handlePrev = () => {
        if (swiper) swiper.slidePrev();
    };

    const handleNext = () => {
        if (swiper) swiper.slideNext();
    };

    const testObj = [
        { id: '1', url: test1 },
        { id: '2', url: test1 },
        { id: '3', url: test1 },
        { id: '4', url: test1 },
        { id: '5', url: test1 },
        { id: '6', url: test1 },
        { id: '7', url: test1 },
        { id: '8', url: test1 },
    ];

    //4개씩 나누기
    const createGroups = () => {
        const groups = [];
        for (let i = 0; i < testObj.length; i += 4) {
            groups.push(testObj.slice(i, i + 4));
        }
        return groups;
    };

    return (
        <div className="relative w-full">
            <div className="flex justify-between">
                <button
                    onClick={handlePrev}
                    className="absolute left-[-2vw] top-[50%] -translate-y-1/2 w-[3.47vw] h-[3.47vw] bg-white shadow-[0_0_10px_rgba(99,99,99,0.2)] rounded-[50%] z-50 flex items-center justify-center"
                >
                    {'<'}
                </button>
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} slidesPerView={1} onSwiper={setSwiper}>
                    {createGroups().map((group, index) => (
                        <SwiperSlide key={index}>
                            <div className="grid grid-cols-2 gap-x-[1.527vw] gap-y-[1.38vw]">
                                {group.map((item) => (
                                    <div
                                        onClick={() => router.push(`concert/${item.id}`)}
                                        key={item.id}
                                        className="p-[1.38vw] flex bg-white w-[39.93vw] aspect-[575/240] rounded-[20px] border-[1px] border-[rgba(240, 240, 240, 1)] justify-between items-center"
                                    >
                                        <Image
                                            src={item.url}
                                            alt={item.id}
                                            className="bg-black w-[10.41vw] rounded-[10px] aspect-[3/4]"
                                        />
                                        <div className="justify-center items-center">{item.id}</div>
                                        <div className="w-[20.27vw] flex flex-col justify-between h-[10.9vw]">
                                            <div className="h-[2.64vw] w-fit border-[2px] rounded-[10px] border-primary justify-center flex items-center gap-[0.48vw] p-[0.83vw]">
                                                <Image src={test1} alt="logo" className="w-[1.38vw] h-[1.38vw]"></Image>
                                                <span className="text-[1.04vw] font-[700] text-primary">
                                                    멤버십 선예매
                                                </span>
                                            </div>
                                            <div className="text-[1.38vw] font-[700] text-primary">
                                                2025.01.14 (화) 8PM
                                            </div>
                                            <div className="h-[4.86vw]">
                                                <div className="text-black text-[1.25vw] font-[700] overflow-hidden whitespace-nowrap text-ellipsis">{`j-hope Tour 'HOPE ON THE STAG글자넘는거테스트테스트으으`}</div>
                                                <div className="text-[1.04vw] font-500 text-[#AEAEAE]">
                                                    2025.02.28 - 03.02
                                                </div>
                                                <div className="text-[1.04vw] font-500 text-[#AEAEAE]">KSPO DOME</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={handleNext}
                    className="absolute right-[-2vw] top-[50%] -translate-y-1/2 w-[3.47vw] h-[3.47vw] bg-white shadow-[0_0_10px_rgba(99,99,99,0.2)] rounded-[50%] z-50 flex items-center justify-center"
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
}
