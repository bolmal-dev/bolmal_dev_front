let accessToken: string | null = null; // 엑세스토큰은 클라이언트 메모리로 관리

// 엑세스토큰 등록
export const setAccessToken = (token: string) => {
    accessToken = token;
};

// 엑세스토큰 반환
export const getAccessToken = () => accessToken;

// 엑세스토큰 삭제
export const removeAccessToken = () => {
    accessToken = null;
};
