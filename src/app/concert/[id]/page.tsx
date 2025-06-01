'use client';

import { useParams } from 'next/navigation';
import test1 from '../../../../public/ㅂㄹㅁㄹ.svg';
import MainInfo from '@/components/concert/mainInfo';
import TicketingButtons from '@/components/concert/ticketingButton';
import DetailInfo from '@/components/concert/underInfo/underDetailInfo';
import { useEffect, useState } from 'react';
import { fetchInstance } from '@/utils/fetchInstance';
import Profile from '@/components/profile/profile';

export interface ConcertDetail {
    id: number;
    concertName: string;
    ticketOpenInfo: string[]; // 변경: string[]로 수정
    concertPlace: string;
    concertDate: string;
    concertRuntime: string;
    price: string;
    onlineStore: string;
    onlineStoreURL: string;
    concertAge: string;
    viewingRestrict: string;
    posterUrl: string;
}

export default function ConcertDetail() {
    const params = useParams();
    const id = params.id;
    const [concertInfo, setConcertInfo] = useState<ConcertDetail>();
    useEffect(() => {
        const getConcertInfo = async () => {
            try {
                const response = await fetchInstance(`/concerts/${id}`, {}, false);
                setConcertInfo({
                    id: response.result.id,
                    concertName: response.result.concertName,
                    ticketOpenInfo: parseTicketOpenInfo(response.result.ticketOpenInfo), // 변경: parseTicketOpenInfo 함수 사용
                    concertPlace: response.result.concertPlace,
                    concertDate: response.result.concertDate,
                    concertRuntime: response.result.concertRuntime,
                    price: parseAllTicketPrices(response.result.price), // 변경: parseAllTicketPrices 함수 사용
                    onlineStore: response.result.onlineStore,
                    onlineStoreURL: response.result.onlineStoreURL,
                    concertAge: response.result.concertAge,
                    viewingRestrict: response.result.viewingRestrict,
                    posterUrl: response.result.posterUrl,
                });
            } catch (error) {
                console.error(error);
            }
        };
        getConcertInfo();
    }, [id]);

    function parseTicketOpenInfo(raw: string): string[] {
      const entries = raw.split(',').map(entry => entry.trim());
      return entries.map((entry, index) => {
        const labelMatch = entry.match(/^(.+?)\((.+?)\)$/);
        if (!labelMatch) return entry;

        const [_, label, datetimeStr] = labelMatch;
        const date = new Date(datetimeStr);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours < 12 ? '오전' : '오후';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;

        return `${index + 1}차 티켓오픈 ${year}.${month}.${day} (${dayOfWeek}) ${period} ${hour12}시`;
      });
    }

    function parseAllTicketPrices(raw: string | null | undefined): string {
      if (!raw) return '해당 정보를 찾을 수 없어요';

      const matches = raw.match(/[^:,]+:\s*[^:,]+/g);
      if (!matches) return '해당 정보를 찾을 수 없어요';

      return matches
        .map(entry => {
          const parts = entry.split(':');
          const label = parts[0]?.trim();
          const priceRaw = parts[1]?.trim();

          if (!priceRaw) return null;

          const onlyDigits = priceRaw.replace(/[^0-9]/g, '');
          if (!onlyDigits) return null;

          const formatted = Number(onlyDigits).toLocaleString('ko-KR');
          const priceFormatted = priceRaw.includes('원') ? priceRaw : `${formatted},000원`;

          // label이 type 또는 additionalProp1일 때는 라벨 없이 출력
          if (label === 'type' || label === 'additionalProp1') return priceFormatted;

          return `${label}: ${priceFormatted}`;
        })
        .filter((price): price is string => Boolean(price))
        .join(' / ');
    }

    // 설명 텍스트 더미 데이터 (API에 없지만 UI에 필요하여 일단 추가)
    const description =
        '- 공연 상세 정보입니다.\n- 추가 정보는 추후 업데이트될 예정입니다.\n- 자세한 사항은 공식 홈페이지를 참고하세요.';

    return (
        <div className="px-[8.33vw] w-full flex">
            <div className="mt-[1.94vw] w-full">
                {concertInfo ? (
                    <>
                        <MainInfo
                            tag={concertInfo.onlineStore === 'INTERPARK' ? '내한 콘서트' : '국내 콘서트'}
                            title={concertInfo.concertName}
                            nextTicketOpen={concertInfo.ticketOpenInfo}
                            location={concertInfo.concertPlace}
                            date={concertInfo.concertDate}
                            runningTime={concertInfo.concertRuntime}
                            price={concertInfo.price || '해당 정보를 찾을 수 없어요'}
                            posterUrl={concertInfo.posterUrl || test1}
                        />
                    </>
                ) : (
                    <div>로딩 중...</div>
                )}
                <TicketingButtons
                    interParkUrl={concertInfo?.onlineStore === 'INTERPARK' ? concertInfo?.onlineStoreURL : undefined}
                    yes24Url={concertInfo?.onlineStore === 'YES24' ? concertInfo?.onlineStoreURL : undefined}
                />
                {concertInfo ? (
                    <div>
                        <DetailInfo
                            fullTitle={concertInfo?.concertName}
                            date={concertInfo?.concertDate}
                            location={concertInfo?.concertPlace}
                            price={concertInfo?.price || '해당 정보를 찾을 수 없어요'}
                            runningTime={concertInfo?.concertRuntime}
                            ageLimit={concertInfo?.concertAge || '연령 제한 없음'}
                            ticketLimit={concertInfo?.viewingRestrict}
                            description={description}
                        />
                    </div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
            <Profile></Profile>
        </div>
    );
}
