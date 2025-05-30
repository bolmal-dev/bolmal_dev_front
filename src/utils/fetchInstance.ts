import { getAccessToken, setAccessToken } from './auth/refresh';
import { refreshAccessToken } from './auth/token';

export const fetchInstance = async (url: string, options: RequestInit = {}, requiresToken: boolean) => {
    try {
        // 요청된 url로 api 호출하는 함수
        const fetchRequest = async () => {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...(options.headers as Record<string, string>), // headers 타입을 Record<string, string>으로 변환
            };

            // 토큰이 필요할 때만 하도록
            if (requiresToken) {
                const token = getAccessToken(); // 기존에 있는 토큰 값 가져온거로 검증
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }
            return fetch(`${process.env.NEXT_PUBLIC_DOMAIN!}${url}`, {
                ...options,
                credentials: 'include',
                headers,
            });
        };

        let response = await fetchRequest(); // 토큰이 있으면 제대로 나왔을거고 없으면 401

        if (url === '/oauth/kakao/front') {
            const accessToken = response.headers.get('Access');
            if (accessToken) {
                setAccessToken(accessToken);
            }
        }
        if (url == '/login') {
            const accessToken = response.headers.get('Access');
            if (accessToken) {
                setAccessToken(accessToken);
            }
        }

        if (response.status === 401) {
            // accessToken이 유효하지 않아서 401이 반환 됐을 때
            const newToken = await refreshAccessToken(); // reissue api 호출해서 재발급
            if (!newToken) throw new Error('reissue 실패');
            response = await fetchRequest(); // 토큰 재발급 받았으니 재시도
        }

        // 서버 상태를 확인하는 api가 문자열을 반환하는 경우가 있어서
        let data;
        const contentType = response.headers.get('Content-Type'); // 'Content-Type' 받아오고
        if (contentType && contentType.includes('application/json')) {
            // json이면
            data = await response.json(); // json 반환
        } else {
            // json이 아니면
            data = await response.text(); // 문자열로 처리
        }

        if (!response.ok) throw new Error(`응답 상태 : ${response.status}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
