import { useQuery } from '@tanstack/react-query';
import Ticket from '../ticket';
import { fetchInstance } from '@/utils/fetchInstance';
import { useRouter } from 'next/navigation';

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

const fetchSearchResults = async (query: string): Promise<Concert[]> => {
    if (!query.trim()) {
        return [];
    }

    try {
        const data = await fetchInstance(`/concerts/search/names?keyword=${encodeURIComponent(query)}`, {}, false);

        const jsonData = data as SearchResponse;

        if (!jsonData || !jsonData.isSuccess) {
            throw new Error(jsonData?.message || '검색에 실패했습니다.');
        }

        return jsonData.result?.concertInfoDTOList || [];
    } catch (error) {
        console.error('검색 API 에러:', error); // 디버깅용
        throw error;
    }
};

export default function SearchResults({ searchQuery }: SearchResultsProps) {
    const {
        data: concerts = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['searchConcerts', searchQuery],
        queryFn: () => fetchSearchResults(searchQuery),
        enabled: !!searchQuery?.trim(), // 검색어가 있을 때만 실행
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5분간 캐시
    });

    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-primary text-lg font-semibold">검색 중...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="text-red-500 text-lg font-semibold mb-4">
                    ⚠️ {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
                </div>
                <div className="text-gray-500">다른 키워드로 다시 시도해보세요.</div>
                {/* 디버깅용 - 개발 환경에서만 표시 */}
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-4 text-sm">
                        <summary className="cursor-pointer text-gray-400">에러 상세 정보</summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </details>
                )}
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
                    <div onClick={() => router.push(`concert/${concert.id}`)}>
                        <Ticket
                            key={concert.id}
                            concert={{
                                ...concert,
                                round:
                                    concert.ticketRound === '팬클럽 선예매' || concert.ticketRound === '팬클럽'
                                        ? '1'
                                        : '2',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
