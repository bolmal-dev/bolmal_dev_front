import Button from '../button';
import { useRouter } from 'next/navigation';

export default function ProfileLogout() {
    const router = useRouter();
    const goLogin = () => {
        router.push('/login');
    };
    return (
        <div className="rounded-[20px] bg-white w-[19.58vw] h-[fit] p-[18px]">
            <div className="flex justify-center py-[12px] mb-[8px]">
                <span className="px-[0.83vw] whitespace-pre-line text-center">{`로그인하고 볼래말래의 
            모든 기능을 사용해 보세요`}</span>
            </div>
            <Button handleClick={goLogin} size="medium2">
                로그인/회원가입
            </Button>
        </div>
    );
}
