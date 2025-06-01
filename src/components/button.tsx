'use client';

import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large' | 'medium2';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: ButtonSize;
    isDisabled?: () => boolean;
    handleClick?: () => void;
}

interface StyledButtonProps {
    size: ButtonSize;
    disabled: boolean;
}

const getButtonSize = (size: ButtonSize) => {
    switch (size) {
        case 'small':
            return css`
                height: 64px;
                width: 136px;
                padding: 14px 14px;
                font-size: 20px;
            `;
        case 'large':
            return css`
                height: 60px;
                width: 476px;
                padding: 14px 14px;
                font-size: 20px;
            `;
        case 'medium2':
            return css`
                height: 57px;
                width: 245px;
                padding: 14px 14px;
                font-size: 20px;
            `;
        default:
            return css`
                width: 269px;
                height: 60px;
                padding: 14px 14px;
                font-size: 20px;
            `;
    }
};

/**
 *
 * @param children 컴포넌트 안에 들어갈 내용
 * @param size 버튼 크기(small, large, medium 중 하나)
 * @param isDisabled 활성화 / 비활성화 시킬 함수(boolean return)
 * @param handleClick onClick시 작동할 이벤트를 담은 함수
 * @returns
 */

const Button = ({ children, size = 'medium', isDisabled = () => false, handleClick, ...props }: ButtonProps) => {
    return (
        <StyledButton size={size} disabled={isDisabled()} onClick={handleClick} {...props}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-weight: 700;
    background-color: #ff4869;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 10px;
    line-height: 24px;

    ${({ size }) => getButtonSize(size)}

    &:hover:not(:disabled) {
        background-color: #ff3c60;
    }

    &:active:not(:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        background-color: #c7c7c7;
        cursor: not-allowed;
    }
`;

export default Button;
