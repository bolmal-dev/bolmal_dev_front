'use client';

import Button from '@/components/button';
import { fetchInstance } from '@/utils/fetchInstance';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SignUpForm {
    id: string;
    password: string;
    passwordCheck: string;
    name: string;
    gender: string;
    birth: string;
    email: string;
    phone: {
        phone1: string;
        phone2: string;
        phone3: string;
    };
}

interface ValidationCheckboxProps {
    isValid: boolean;
    text: string;
}

// 유효성 체크박스
const ValidationCheckbox = ({ isValid, text }: ValidationCheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 
                ${isValid ? 'bg-primary' : 'bg-white border-gray-200 border-2'}`}
            >
                {isValid ? (
                    <div className="w-2 h-[5px] border-l-2 border-b-2 border-white transform -rotate-45 mt-[-2px]" />
                ) : (
                    <div className="w-2 h-[5px] border-l-2 border-b-2 border-gray-200 transform -rotate-45 mt-[-2px]" />
                )}
            </div>
            <span className="text-sm">{text}</span>
        </div>
    );
};

export default function SignUp() {
    const router = useRouter();
    const [idValid, setIdValid] = useState(false);
    const onValid: SubmitHandler<SignUpForm> = async (data) => {
        if (!idValid) {
            setError('id', { message: '아이디 중복 확인이 필요합니다.' });
            return;
        } else {
            const userInfo = {
                username: data.id,
                password: data.password,
                name: data.name,
                gender: data.gender,
                birthDate: data.birth,
                email: data.email,
                phoneNumber: `${data.phone.phone1}-${data.phone.phone2}-${data.phone.phone3}`,
                serviceAgreement: true,
                privacyAgreement: true,
                financialAgreement: true,
                advAgreement: true,
            };
            const response = await fetchInstance(
                '/members/join',
                { method: 'POST', body: JSON.stringify(userInfo) },
                false
            );
            if (response.code === 'COMMON200') {
                router.push('/login');
            }
        }
    };
    const [passwordValue, setPasswordValue] = React.useState('');
    const {
        handleSubmit,
        register,
        getValues,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<SignUpForm>({
        mode: 'onBlur', // 유효성 검사 실행 시점 (onChange일 때는 렌더링 과도화 -> onBlur로 변경)
    });

    const validations = {
        hasLetter: /[a-zA-Z]/.test(passwordValue),
        hasNumber: /[0-9]/.test(passwordValue),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    };

    const checkDuplicate = async () => {
        const id = getValues('id');
        let response = null;
        const idTest = { username: id };
        response = await fetchInstance(
            '/members/valid/usernames',
            { method: 'POST', body: JSON.stringify(idTest) },
            false
        );
        if (!response.result) {
            setError('id', { message: '이미 누군가 사용중인 아이디입니다.' });
            return !response;
        } else {
            clearErrors('id');
            alert('사용할 수 있는 id 입니다.');
            setIdValid(true);
            return response;
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="flex flex-col w-full max-w-md mx-auto gap-8" onSubmit={handleSubmit(onValid)}>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-[600] text-[25px]">정보를 입력해 회원가입을 완료해 주세요.</p>
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">아이디</p>
                    <div className="flex flex-row justify-between">
                        <input
                            {...register('id', {
                                required: '아이디를 입력해주세요',
                                onChange: () => setIdValid(false),
                                minLength: {
                                    value: 4,
                                    message: '아이디는 4자 이상이어야 합니다',
                                },
                                maxLength: {
                                    value: 16,
                                    message: '아이디는 16자 이하여야 합니다',
                                },
                                pattern: {
                                    value: /^[a-z0-9]{4,16}$/,
                                    message: '영어 소문자와 숫자만 사용 가능합니다',
                                },
                            })}
                            placeholder="영어 소문자, 숫자 4-16자"
                            className="p-3 border rounded-[20px] h-[64px] w-[350px]"
                        />
                        <Button type="button" size="small" handleClick={checkDuplicate}>
                            중복 확인
                        </Button>
                    </div>
                    {errors.id && <p className="text-red-500 text-sm pt-2 pl-1">{errors.id.message}</p>}
                </div>
                <div>
                    <div className="w-[500px]">
                        <p className="font-[600] text-[20px]">비밀번호</p>
                        <div className="flex flex-row">
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    onChange: (e) => setPasswordValue(e.target.value),
                                    validate: (value) => {
                                        const hasLetter = /[a-zA-Z]/.test(value);
                                        const hasNumber = /[0-9]/.test(value);
                                        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                                        const isValidLength = value.length >= 8 && value.length <= 12;
                                        return (
                                            (hasLetter && hasNumber && hasSpecial && isValidLength) ||
                                            '영문, 숫자, 특수문자를 포함한 8-12자여야 합니다'
                                        );
                                    },
                                })}
                                placeholder="영문, 숫자, 특수문자 8-12자"
                                className="p-3 border rounded-[20px] w-full h-[64px]"
                            />{' '}
                        </div>
                        {errors.password && <p className="text-red-500 text-sm pt-2 pl-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex mt-2 gap-2">
                        <ValidationCheckbox isValid={validations.hasLetter} text="영문" />
                        <ValidationCheckbox isValid={validations.hasNumber} text="숫자" />
                        <ValidationCheckbox isValid={validations.hasSpecial} text="특수문자" />
                    </div>
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">비밀번호 확인</p>
                    <div className="flex flex-row">
                        <input
                            {...register('passwordCheck', {
                                validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다', //(value) => (value === passwordValue) || '비밀번호가 일치하지 않습니다'
                            })}
                            type="password"
                            className="p-3 border rounded-[20px] w-full h-[64px]"
                        />
                    </div>
                    {errors.passwordCheck && (
                        <p className="text-red-500 text-sm pt-2 pl-1">{errors.passwordCheck.message}</p>
                    )}
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">이름</p>
                    <div className="flex flex-row">
                        <input
                            {...register('name', { required: true })}
                            className="p-3 border rounded-[20px] w-full h-[64px]"
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm pt-2 pl-1">이름은 필수 입력 항목입니다.</p>}
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">성별</p>
                    <div className="flex flex-row">
                        <select
                            defaultValue="default"
                            {...register('gender', {
                                validate: (value) => value !== 'default' || '성별을 선택해주세요',
                            })}
                            className="p-3 border rounded-[20px] w-full h-[64px]"
                        >
                            <option value="default" disabled>
                                성별을 선택하세요
                            </option>
                            <option value="FEMALE">여성</option>
                            <option value="MALE">남성</option>
                        </select>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm pt-2 pl-1">{errors.gender.message}</p>}
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">생년월일</p>
                    <div className="flex flex-row">
                        <input
                            type="date"
                            {...register('birth', {
                                validate: (value) => value !== '' || '날짜를 골라주세요',
                            })}
                            className="p-3 border rounded-[20px] w-full h-[64px]"
                        />
                    </div>
                    {errors.birth && <p className="text-red-500 text-sm pt-2 pl-1">{errors.birth.message}</p>}
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">이메일</p>
                    <div className="flex flex-row">
                        <input
                            type="email"
                            {...register('email')}
                            className="p-3 border rounded-[20px] w-full h-[64px]"
                        />
                    </div>
                </div>
                <div className="w-[500px]">
                    <p className="font-[600] text-[20px]">휴대폰 번호</p>
                    <div className="flex flex-row gap-2">
                        <div className="w-full flex justify-between">
                            <input
                                {...register('phone.phone1')}
                                className="p-3 border rounded-[20px] w-[110px] h-[64px]"
                            />
                            <input
                                {...register('phone.phone2')}
                                className="p-3 border rounded-[20px] w-[110px] h-[64px]"
                            />
                            <input
                                {...register('phone.phone3')}
                                className="p-3 border rounded-[20px] w-[110px] h-[64px]"
                            />
                            <Button size="small">인증하기</Button>
                        </div>
                    </div>
                </div>
                <Button size="large">회원가입 완료</Button>
            </form>
        </div>
    );
}
