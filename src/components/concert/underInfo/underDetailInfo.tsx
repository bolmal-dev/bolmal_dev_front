import { useState } from 'react';
import { UnderInfoItem, UnderInfoItemProps } from './underInfoItem';
import KakaoMap from '@/components/kakao-map/kakao-map';
import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '@/utils/fetchInstance';

interface DetailInfoProps {
    fullTitle: string;
    date: string;
    location: string;
    price: string;
    runningTime: string;
    ageLimit: string;
    ticketLimit: string;
    description: string;
}

export default function DetailInfo({
    fullTitle,
    date,
    location,
    price,
    runningTime,
    ageLimit,
    ticketLimit,
    description,
}: DetailInfoProps) {
    const [infoItems, setInfoItems] = useState<UnderInfoItemProps[]>([
        { label: '공연 제목', value: fullTitle || '' },
        { label: '공연 일시', value: date || '' },
        { label: '공연 장소', value: location || '' },
        { label: '티켓 가격', value: price || '' },
        { label: '러닝 타임', value: runningTime || '' },
        { label: '관람 연령', value: ageLimit || '' },
        { label: '예매 제한', value: ticketLimit || '' },
    ]);

    const [aboutInfos, setAboutInfos] = useState([
        { label: '오시는 길', value: '로딩중입니다. 잠시만 기다려주세요!' },
        { label: '주변 편의점', value: '로딩중입니다. 잠시만 기다려주세요!' },
        { label: '주변 맛집', value: '로딩중입니다. 잠시만 기다려주세요!' },
        { label: '숙박 시설', value: '로딩중입니다. 잠시만 기다려주세요!' },
    ]);

    const { data } = useQuery({
        queryKey: ['map-search'],
        queryFn: async () => {
            const response = await fetchInstance(`/kakao-map/search/fixed?keyword=${location}`, {}, false);
            return response[0].result;
        },
    });

    console.log(data);

    return (
        <div className="flex flex-col gap-[1.04vw] p-[2.08vw] w-[62.08vw] border-[#F0F0F0] border-[1.5px] rounded-[20px]">
            <section>
                <h3 className="font-[700] text-[1.38vw]">공연 상세 정보</h3>
                <hr />
                <div className="min-h-[16.94vw] justify-between flex flex-col mb-[2.77vw] mt-[1.04vw] font-[600] text-[1.25vw]">
                    {infoItems.map((item, index) => (
                        <UnderInfoItem key={index} {...item} />
                    ))}
                </div>
            </section>
            <div className="flex flex-col gap-[1.04vw]">
                <h3 className="font-[700] text-[1.38vw]">공연 소개</h3>
                <hr />
                <p className="whitespace-pre-line mt-[1.04vw] font-[600] text-[1.25vw]">{description}</p>
            </div>
            {aboutInfos.map((item) => (
                <div className="flex flex-col gap-[1.04vw]">
                    <h3 className="font-[700] text-[1.38vw]">{item.label}</h3>
                    <hr />
                    <p className="whitespace-pre-line my-[1.04vw] font-[600] text-[1.25vw]">{item.value}</p>
                    <KakaoMap />
                </div>
            ))}
        </div>
    );
}
