'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchResults from '@/components/search/search-result';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (q) {
            setSearchQuery(q);
        }
    }, [q]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <SearchResults searchQuery={searchQuery} />
        </div>
    );
};

export default SearchPage;
