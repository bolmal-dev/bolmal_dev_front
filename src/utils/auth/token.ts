import { removeAccessToken, setAccessToken } from './refresh';

export const refreshAccessToken = async () => {
    try {
        // 쿠키의 리프레시 토큰으로 엑세스토큰 리프레시 하는 API
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN!}/reissue`, {
            method: 'POST',
            credentials: 'include',
        });
        // resposne 응답 boolean으로 왔을 때 에러 던질 곳
        // if (!response.ok) throw new Error('리프레시 실패');
        const newToken = response.headers.get('Access')?.split('Bearer ')[1]; // 헤더에서 엑세스 토큰 가져오기
        if (!newToken) throw new Error('토큰 재발급 실패');
        setAccessToken(newToken);
        return newToken;
    } catch (error) {
        console.error(error);
        removeAccessToken();
        return null;
    }
};
