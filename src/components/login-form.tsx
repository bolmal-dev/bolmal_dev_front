'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import Button from './button';
import { useRouter } from 'next/navigation';
import { useStore } from '@/hooks/useUserInfo';
import { useEffect, useState } from 'react';
import KakaoLogin from './kakao-login';
import { fetchInstance } from '@/utils/fetchInstance';

interface LoginResponse {
    code: string;
    result: {
        memberId: number;
        name: string;
        onComming: string | null;
        alarmCount: number;
        bookmarkCount: number;
        subcribe: boolean;
        imagePath: string | null;
    };
}

interface HookFormType {
    id: string;
    password: string;
}

export default function LoginForm() {
    const userInfo = useStore((state) => state.userInfo);
    const setUserState = useStore((state) => state.setUserState);
    const [loginState, setLoginState] = useState<LoginResponse | null>(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm<HookFormType>();
    const checkIdPw = () => {
        setError('password', { message: '비밀번호 또는 아이디가 일치하지 않습니다' });
    };

    const toSignUp = () => {
        router.push('/sign-up');
    };

    const userName = userInfo.name;
    useEffect(() => {
        if (userName) {
        }
    }, [userName]);
    useEffect(() => {
        if (userInfo.isLoggedIn) {
            localStorage.setItem('item', 'true');
        }
    }, [userInfo.isLoggedIn]);

    useEffect(() => {
        if (loginState?.code === 'COMMON200') {
            const userData = {
                id: loginState.result.memberId,
                name: loginState.result.name,
                isLoggedIn: true,
                onComming: loginState.result.onComming,
                alarmTicket: loginState.result.alarmCount,
                zzimTicket: loginState.result.bookmarkCount,
                isSubscribe: loginState.result.subcribe,
                imgUrl: loginState.result.imagePath,
            };

            setUserState(
                userData.id,
                userData.name,
                userData.onComming,
                userData.alarmTicket,
                userData.zzimTicket,
                userData.isSubscribe,
                userData.imgUrl
            );
            router.push('/');
        }
    }, [loginState]);

    const onValid: SubmitHandler<HookFormType> = async () => {
        const id = getValues('id');
        const pw = getValues('password');
        const loginBody = {
            username: id,
            password: pw,
        };
        try {
            const response = await fetchInstance(
                '/login',
                {
                    method: 'POST',
                    body: JSON.stringify(loginBody),
                },
                false
            );

            if (response.code === 'COMMON200') {
                // 성공 코드 확인
                setUserState(
                    response.result.memberId,
                    response.result.name,
                    response.result.onComming,
                    response.result.alarmCount,
                    response.result.bookmarkCount,
                    response.result.subcribe,
                    response.result.imagePath
                );
                setLoginState(response);
            } else {
                checkIdPw(); // 로그인 실패 처리
            }
        } catch (error) {
            console.error('Login error:', error);
            checkIdPw();
        }
    };
    const onInValid: SubmitErrorHandler<HookFormType> = () => {
        console.error('no');
        checkIdPw();
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <form className="flex flex-col" onSubmit={handleSubmit(onValid, onInValid)}>
                <div className="flex flex-col gap-[1.041vw]">
                    <input
                        {...register('id', {
                            required: true,
                            minLength: 4,
                            maxLength: { value: 16, message: '설정할 에러 메세지' },
                        })}
                        placeholder="아이디"
                        type="text"
                        className="bg-bg-default w-[33.07vw] h-[4.44vw] rounded-[20px] border-[1px]"
                    />
                    <input
                        {...register('password', { required: true, minLength: 8, maxLength: 16 })}
                        placeholder="비밀번호"
                        type="password"
                        className="bg-bg-default w-[33.07vw] h-[4.44vw] rounded-[20px] border-[1px]"
                    />
                </div>
                <div className="flex flex-row gap-[0.14vw] my-[1.5vw]">
                    <input type="checkbox" />
                    <div className="flex flex-row w-full justify-between">
                        <p>아이디 저장</p>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-[0.07vw]">{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <Button size="large">로그인</Button>
            </form>
            <div className="flex flex-row gap-[0.4vw] mt-[0.69vw]">
                <button className="text-[#686868]">아이디 찾기</button>
                <p className="text-[#C7C7C7]">|</p>
                <button className="text-[#686868]">비밀번호 찾기</button>
                <p className="text-[#C7C7C7]">|</p>
                <button onClick={toSignUp} className="text-[#ff4869]">
                    회원가입
                </button>
            </div>
            <div className="mt-[2.3vh]">
                <KakaoLogin></KakaoLogin>
            </div>
        </div>
    );
}
