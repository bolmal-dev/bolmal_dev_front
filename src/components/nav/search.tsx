'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchInputProps {
    onSearch?: (query: string) => void;
    initialValue?: string;
}

export default function Search({ onSearch, initialValue = '' }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const query = searchTerm.trim();

            router.push(`/search?q=${encodeURIComponent(query)}`);

            if (onSearch) {
                onSearch(query);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    useState(() => {
        setSearchTerm(initialValue);
    });

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="공연명을 검색하세요"
                className="w-[27.77vw] h-[3.7vh] rounded-[100px] bg-bg-default focus:outline-none focus:border-primary border-[1px] border-transparent pl-[10px] pr-[50px] placeholder:text-gray-400 text-[15px]"
            />
            <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
            >
                🔍
            </button>
        </form>
    );
}
