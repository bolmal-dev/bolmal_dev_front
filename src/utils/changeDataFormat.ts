// 입력값은 2025-02-10T20:00:00와 같이 ISO 8601형식(타입을 지정해두진 않았지만 서버에서 이런식으로 줌, 저 형식이 가장 안전하지만 다른 유형도 커버가 가능하긴 함)
export const getFormattedData = (dateString: string) => {
    const date = new Date(dateString); // dateString을 Date 객체로 반환 ex) Mon Feb 10 2025 20:00:00 GMT+0900 (한국 표준시)

    // 요일 배열
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // 연도, 월, 일, 요일 추출
    const year = date.getFullYear(); // 2025
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth하면 현재 월 -1 한만큼 나오고 거기에 01, 02처럼 표현하기 위해 padStart 적용
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];

    // 시간을 12시간 형식으로 변환
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환

    return `${year}.${month}.${day} (${weekday}) ${hours}${ampm}`;
};
