interface TicketingButtonsProps {
    interParkUrl?: string;
    yes24Url?: string;
}

export default function TicketingButtons({ interParkUrl, yes24Url }: TicketingButtonsProps) {
    const handleOpenNewTab = (url?: string) => {
        if (url !== '티켓팅 사이트 링크 미정') {
            window.open(url, '_blank');
        } else {
            alert('현재 보고게신 콘서트는 티케팅 사이트 링크가 제공되고 있지 않는 상태입니다. 🥲');
        }
    };

    return (
        <div className="flex w-[62.08vw] justify-between my-[1.38vw]">
            <button
                disabled={interParkUrl === undefined}
                onClick={() => handleOpenNewTab(interParkUrl)}
                className={`w-[30.55vw] border-[2px] h-[4.51vw] rounded-[20px] flex items-center justify-center text-[1.11vw] font-[700] transition-all duration-300
                    ${
                        interParkUrl
                            ? 'border-violet-600 text-violet-600 hover:bg-violet-50 active:scale-[0.98]'
                            : 'border-gray-300 text-gray-400 cursor-not-allowed opacity-70'
                    }`}
            >
                {interParkUrl ? '인터파크에서 티켓팅 하러 가기 ＞' : '인터파크 티켓팅 준비중'}
            </button>
            <button
                disabled={yes24Url === undefined}
                onClick={() => handleOpenNewTab(yes24Url)}
                className={`w-[30.55vw] border-[2px] h-[4.51vw] rounded-[20px] flex items-center justify-center text-[1.11vw] font-[700] transition-all duration-300
                    ${
                        yes24Url
                            ? 'border-gray-600 text-gray-600 hover:bg-gray-50 active:scale-[0.98]'
                            : 'border-gray-300 text-gray-400 cursor-not-allowed opacity-70'
                    }`}
            >
                {yes24Url ? '예스24에서 티켓팅 하러 가기 ＞' : '예스24 티켓팅 준비중'}
            </button>
        </div>
    );
}
