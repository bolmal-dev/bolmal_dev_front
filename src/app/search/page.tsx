'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from '@/components/search/search-result';

function SearchContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (q) {
            setSearchQuery(q);
        }
    }, [q]);

    return <SearchResults searchQuery={searchQuery} />;
}

const SearchPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Suspense
                fallback={
                    <div className="flex justify-center items-center py-20">
                        <div className="text-primary text-lg font-semibold">페이지 로딩 중...</div>
                    </div>
                }
            >
                <SearchContent />
            </Suspense>
        </div>
    );
};

export default SearchPage;
