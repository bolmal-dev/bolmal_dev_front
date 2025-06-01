'use client';

import useKakaoLogin from '@/hooks/useKakaoLogin';
import { useStore } from '@/hooks/useUserInfo';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import kakao from '../../public/kakao.svg';

export default function KakaoLogin() {
    const { data: session } = useSession();
    const handleKakaoLogin = useKakaoLogin();
    const router = useRouter();
    const userInfo = useStore((state) => state.userInfo);
    const onComming = userInfo.onComming;
    useEffect(() => {
        if (session?.user?.email && session?.user.name) {
            handleKakaoLogin(session.user.name, session.user.email); // 여기서 const response = handle...로 바꾸고 유저정보를 response 안에 반환해주면
            // 여기서 setUserState Store에서 호출해서 반환해준 정보들 담아주고(이건 handleKakaoLogin 로직 안에서 해결할듯)
            // if (onComming === '') {
            //     router.push('/'); // => 여기서 if문 조건 추가 정보 입력 안했을 때로 바꾸고 push 주소 추가 정보 입력 url로 바꾸면 됨
            // }
            // 위에 주석은 추가정보 입력 하는거로 할 때 적용 일단은 밑에 코드대로
            router.push('/');
        }
    }, [session, handleKakaoLogin, onComming, router]);
    const loginKakao = async () => {
        await signIn('kakao');
    };

    return (
        <div onClick={loginKakao}>
            <Image width={54} height={54} src={kakao} alt="카카오 로그인" />
        </div>
    );
}
