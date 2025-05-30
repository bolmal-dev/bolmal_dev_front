import { SortType } from '@/app/concert/page';
import useClickOutside from '@/hooks/useClickOutside';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

interface DropDownProps {
    sortType: SortType;
    setSortType: Dispatch<SetStateAction<SortType>>;
}

export default function DropDown({ sortType, setSortType }: DropDownProps) {
    const [view, setView] = useState<boolean>(false); // 드롭다운 눌렀는지 안 눌렀는지 판단하는 상태
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortTypeText = {
        TICKET_OPEN: '티켓오픈 가까운 순',
        POPULAR: '인기순',
        LATEST: '최신 등록순',
    };

    useClickOutside(dropdownRef, setView);

    return (
        <div ref={dropdownRef} className="relative">
            <ul
                onClick={() => {
                    setView((prev) => !prev);
                }}
            >
                <div className="w-[10.62vw] h-[38px] rounded-[10px] border-primary border-[2px] bg-white flex justify-center items-center mb-[10px] text-primary font-[700] text-[15px]">
                    {sortTypeText[sortType]} 🔻
                </div>
                {view && (
                    <div className="absolute z-50 bg-white shadow-[0_0_10px_rgba(172,172,172,0.2)] h-[128px] w-[10.62vw] justify-evenly flex flex-col border-[1px] rounded-[10px] border-[#F0F0F0]">
                        <li className="flex justify-center">
                            <button
                                className={`flex items-center justify-center h-[36px] bg-primary rounded-[7px] w-[9.93vw] font-[700] text-[15px] ${
                                    sortType === 'TICKET_OPEN' ? 'bg-primary text-white' : 'bg-white text-primary'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // 상위 div에 setView(true)가 있어서 이벤트 버블링 방지 목적
                                    setSortType('TICKET_OPEN');
                                    setView(false);
                                }}
                            >
                                티켓오픈 가까운 순
                            </button>
                        </li>
                        <li className="flex justify-center">
                            <button
                                className={`flex items-center justify-center h-[36px] bg-primary rounded-[7px] w-[9.93vw] font-[700] text-[15px] ${
                                    sortType === 'POPULAR' ? 'bg-primary text-white' : 'bg-white text-primary'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSortType('POPULAR');
                                    setView(false);
                                }}
                            >
                                인기순
                            </button>
                        </li>
                        <li className="flex justify-center">
                            <button
                                className={`flex items-center justify-center h-[36px] bg-primary rounded-[7px] w-[9.93vw] font-[700] text-[15px] ${
                                    sortType === 'LATEST' ? 'bg-primary text-white' : 'bg-white text-primary'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSortType('LATEST');
                                    setView(false);
                                }}
                            >
                                최신 등록 순
                            </button>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    );
}
