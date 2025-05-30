import { NextRequest, NextResponse } from 'next/server';
import testUrl from '../../../../public/ㅂㄹㅁㄹ.svg';

const dummyData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    // title: `콘서트 ${i + 1}`,
    // date: '2025.01.14',
    // time: '8PM',
    // venue: 'KSPO DOME',
    tag: i % 2 === 0 ? '팬클럽 선예매' : '1차 티켓오픈',
    url: testUrl,
}));

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 1;
    const itemsPerPage = 20; // 5x4그리드로 20개씩 표시할거니까

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return NextResponse.json({
        concerts: dummyData.slice(start, end),
        totalPages: Math.ceil(dummyData.length / itemsPerPage),
        currentPage: page,
    });
}
