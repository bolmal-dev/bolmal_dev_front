import Image from 'next/image';
import { Concert } from './now-bolmal/concertRecommend';
import { getFormattedData } from '@/utils/changeDataFormat';

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
                <span className="mb-[6px] text-[1.38vw] font-[700] text-primary">{concert.ticketOpenDate}</span>
                <span className="text-black text-[1.25vw] font-[700] overflow-hidden whitespace-nowrap text-ellipsis">
                    {concert.concertName}
                </span>
                <span className="text-[#AEAEAE] text-[1.04vw] font-[500]">{concert.concertDate}</span>
            </div>
        </div>
    );
}
