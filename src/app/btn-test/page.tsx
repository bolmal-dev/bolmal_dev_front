'use client';
import Button from '@/components/button';

export default function Home() {
    const checkDisabled = () => {
        return true;
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-primary text-2xl">Button Examples</h1>
            <div className="space-y-2">
                <Button size="small">작은 버튼</Button>

                <Button>중간 버튼</Button>

                <Button size="large">큰 버튼</Button>
            </div>

            <div className="space-y-2">
                <Button isDisabled={checkDisabled}>비활성화 버튼</Button>
            </div>

            <div className="bg-bg-default p-4">
                <Button>배경 위의 버튼</Button>
            </div>
        </div>
    );
}
