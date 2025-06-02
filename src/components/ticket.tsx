import Image from 'next/image';
import { Concert } from './now-bolmal/concertRecommend';
import { getFormattedData } from '@/utils/changeDataFormat';
import {formatConcertDate } from '@/utils/changeDataFormat';
import { useEffect } from 'react';

interface TicketProps {
    concert: Concert;
}

export default function Ticket({ concert }: TicketProps) {
    return (
        <div className="flex flex-col items-center">
            <Image
                className="bg-black rounded-[10px] w-[14.16vw] h-fit aspect-[204/272]"
                src={concert.posterUrl}
                alt={concert.concertName}
                unoptimized
                width={204}
                height={272}
            ></Image>
            <div className="w-[14.16vw] mt-[20px] flex flex-col">
                <div className="p-[0.694vw] border-primary border-[2px] rounded-[10px] w-fit mb-[10px] flex gap-[7px] text-center items-center">
                    <span className="min-w-[1.38vw] h-[1.38vw] font-[500]">⏰</span>
                    <div className="text-[1.04vw] font-[700] text-primary">
                        {concert.round === '2' ? '2차 티켓 오픈' : '1차 티켓 오픈'}
                    </div>
                </div>
                <span className="mb-[6px] text-[1.38vw] font-[700] text-primary">
                    {concert.ticketOpenDate ? getFormattedData(concert.ticketOpenDate) : '티켓 오픈일 미정'}
                </span>
                <span className="text-black text-[1.25vw] font-[700] overflow-hidden whitespace-nowrap text-ellipsis">
                    {concert.concertName} // 여기도 수정하면 내비상으로 콘서트에 있는 내용들은 잘 변경되는데 그걸 가져다가 쓰는 홈에 "지금, 볼래말래?"에 있는 내용에는 내용이 깨져서 들어감.
                </span>
                <span className="text-[#AEAEAE] text-[1.04vw] font-[500]">{concert.concertDate}</span>
            </div>
        </div>
    );
}
