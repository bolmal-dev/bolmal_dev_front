import { useState, useEffect } from 'react';
import Ticket from '../ticket';

export interface Concert {
    id: number;
    posterUrl: string;
    ticketRound: string;
    ticketOpenDate: string;
    concertName: string;
    concertDate: string;
}

interface SearchResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        concertInfoDTOList: Concert[];
    };
}

interface SearchResultsProps {
    searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchQuery) {
            setConcerts([]);
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://www.bolmal.shop/concerts/search/names?${encodeURIComponent(searchQuery)}`
                );

                if (!response.ok) {
                    throw new Error('검색 결과를 불러오는데 실패했습니다.');
                }

                const data: SearchResponse = await response.json();

                if (data.isSuccess) {
                    setConcerts(data.result.concertInfoDTOList);
                } else {
                    throw new Error(data.message || '검색에 실패했습니다.');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
                setConcerts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-primary text-lg font-semibold">검색 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="text-red-500 text-lg font-semibold mb-4">⚠️ {error}</div>
                <div className="text-gray-500">다른 키워드로 다시 시도해보세요.</div>
            </div>
        );
    }

    if (searchQuery && concerts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="text-2xl mb-4">🔍</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                    '{searchQuery}'에 대한 검색 결과가 없습니다
                </div>
                <div className="text-gray-500">다른 키워드로 검색해보세요.</div>
            </div>
        );
    }

    if (!searchQuery) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="text-4xl mb-4">🎭</div>
                <div className="text-xl font-bold text-primary mb-2">원하는 공연을 검색해보세요!</div>
                <div className="text-gray-500">아티스트명이나 공연명을 입력하면 관련 공연을 찾아드려요.</div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">'{searchQuery}' 검색 결과</h2>
                <p className="text-gray-600">
                    총 <span className="font-semibold text-primary">{concerts.length}개</span>의 공연을 찾았습니다.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                {concerts.map((concert) => (
                    <Ticket
                        key={concert.id}
                        concert={{
                            ...concert,
                            round:
                                concert.ticketRound === '팬클럽 선예매' || concert.ticketRound === '팬클럽' ? '1' : '2',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
