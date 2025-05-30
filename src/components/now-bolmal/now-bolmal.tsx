'use client';
//test

import { useStore } from '@/hooks/useUserInfo';
import ConcertRecommend from './concertRecommend';

export default function NowBolmal() {
    const isLoggedIn = useStore((state) => state.userInfo.isLoggedIn);
    const name = useStore((state) => state.userInfo.name);
    return (
        <div>
            <div className="pt-[10px] mb-[15px] font-[600] text-[25px]">
                {name === null ? '지금, 볼래말래?' : `${name}님을 위한 추천 티켓`}
            </div>
            <div>
                <ConcertRecommend isLoggedIn={isLoggedIn}></ConcertRecommend>
            </div>
            <div className="mt-[85px] font-[700] text-[25px]">이번주 가장 인기있는 티켓</div>
        </div>
    );
}
