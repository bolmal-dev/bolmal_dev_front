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
                height: 4.44vw;
                width: 9.44vw;
                padding: 0.97vw 0.97vw;
                font-size: 1.38vw;
            `;
        case 'large':
            return css`
                height: 4.16vw;
                width: 33.07vw;
                padding: 0.97vw 0.97vw;
                font-size: 1.38vw;
            `;
        case 'medium2':
            return css`
                height: 3.95vw;
                width: 17.01vw;
                padding: 0.97vw 0.97vw;
                font-size: 1.38vw;
            `;
        default:
            return css`
                width: 18.651vw;
                height: 4.16vw;
                padding: 0.97vw 0.97vw;
                font-size: 1.38vw;
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
    border-radius: 1.38vw;
    font-weight: 700;
    background-color: #ff4869;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 0.69vw;
    line-height: 1.66vw;

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
