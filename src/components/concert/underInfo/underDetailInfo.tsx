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

interface PlaceInfo {
    placeName: string;
    roadAddressName: string;
    x: string;
    y: string;
    categoryGroupName: string;
    placeUrl: string;
}

interface CategoryData {
    stores: PlaceInfo[];
    parking: PlaceInfo[];
    subway: PlaceInfo[];
    restaurants: PlaceInfo[];
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

    const [categoryData, setCategoryData] = useState<CategoryData>({
        stores: [],
        parking: [],
        subway: [],
        restaurants: [],
    });

    const [selectedStore, setSelectedStore] = useState<PlaceInfo | null>(null);
    const [selectedParking, setSelectedParking] = useState<PlaceInfo | null>(null);
    const [selectedSubway, setSelectedSubway] = useState<PlaceInfo | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<PlaceInfo | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['map-search', location],
        queryFn: async () => {
            const response = await fetchInstance(`/kakao-map/search/fixed?keyword=${location}`, {}, false);

            const stores = response[0]?.result || [];
            const parking = response[1]?.result || [];
            const subway = response[2]?.result || [];
            const restaurants = response[3]?.result || [];

            setCategoryData({
                stores,
                parking,
                subway,
                restaurants,
            });

            // 각 카테고리의 첫 번째 항목을 기본 선택
            setSelectedStore(stores[0] || null);
            setSelectedParking(parking[0] || null);
            setSelectedSubway(subway[0] || null);
            setSelectedRestaurant(restaurants[0] || null);

            return { stores, parking, subway, restaurants };
        },
        enabled: !!location,
    });

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

            {aboutInfos.map((item, index) => (
                <div key={index} className="flex flex-col gap-[1.04vw]">
                    <h3 className="font-[700] text-[1.38vw]">{item.label}</h3>
                    <hr />
                    <div className="my-[1.04vw] font-[600] text-[1.25vw]">{item.content}</div>
                    <div className="h-[300px] w-full">
                        {item.mapCenter ? (
                            <KakaoMap
                                x={item.mapCenter.lat}
                                y={item.mapCenter.lng}
                                width="100%"
                                height="300px"
                                level={3}
                            />
                        ) : (
                            <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center rounded-lg">
                                <p className="text-gray-500">지도를 불러올 수 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
