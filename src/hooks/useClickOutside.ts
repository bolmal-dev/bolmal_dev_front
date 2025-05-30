import { useEffect } from 'react';

export default function useClickOutside(
    ref: React.RefObject<HTMLDivElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // contains()는 DOM 요소의 메서드이고 ref는 useRef로 지정된 DOM 요소니까 useRef로 지정된 DOM 요소의 메서드
            if (ref.current && !ref.current.contains(event?.target as Node)) {
                // 즉, ref.current(DOM 요소)가 렌더링 된 상태이고 && 렌더링 된 DOM 요소가 event.target(마우스 이벤트가 발생한 타겟)을 포함하는지 => Ref의 내부인지 => 의 !
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, setIsOpen]);
}
