import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import Ticket from '../ticket';
import { useRouter } from 'next/navigation';
import { fetchInstance } from '@/utils/fetchInstance';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export interface Concert {
    id: number;
    posterUrl: string;
    round: string;
    ticketOpenDate: string;
    concertName: string;
    concertDate: string;
}

interface RecommendSwiperProps {
    isLoggedIn: boolean;
}

export default function ConcertRecommend({ isLoggedIn }: RecommendSwiperProps) {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const router = useRouter();
    const handlePrev = () => {
        if (swiper) swiper.slidePrev();
    };
    const handleNext = () => {
        if (swiper) swiper.slideNext();
    };
    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const endpoint = isLoggedIn
                    ? '/home/recommend' // 로그인 안됐을 때 호출할 API
                    : '/home/recommend'; // 로그인 됐을 때 호출할 API <- 나중에 수정
                const response = await fetchInstance(endpoint, {}, isLoggedIn);
                setConcerts(response.result);
            } catch (error) {
                console.error('실패', error);
            }
        };
        fetchConcerts();
    }, [isLoggedIn]);

    return (
        <div className="relative w-full">
            <div className="flex justify-between">
                <button
                    className="absolute left-[-2%] top-[9.44vw] -translate-y-1/2 min-w-10 min-h-10 w-[3.472vw] h-[3.472vw] rounded-[50%] z-50 bg-white shadow-[0_0_10px_rgba(99,99,99,0.2)]"
                    onClick={handlePrev}
                >
                    ＜
                </button>
                <Swiper
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    modules={[Autoplay]}
                    autoplay={{ delay: 6000 }}
                    slidesPerView={5}
                    onSwiper={setSwiper}
                    spaceBetween={0}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    className="w-full"
                >
                    {concerts.map((concert) => (
                        <SwiperSlide key={concert.id} className="w-[20%] !flex !justify-center">
                            <div onClick={() => router.push(`concert/${concert.id}`)} className="w-[16.25vw] p-[15px]">
                                <Ticket concert={concert}></Ticket>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    className="absolute right-[-2%] top-[9.44vw] -translate-y-1/2 min-w-10 min-h-10 w-[3.472vw] h-[3.472vw] bg-white shadow-[0_0_10px_rgba(99,99,99,0.2)] rounded-[50%] z-50"
                    onClick={handleNext}
                >
                    ＞
                </button>
            </div>
        </div>
    );
}
