'use client';
import { Map } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
    x: number;
    y: number;
    width?: string;
    height?: string;
    level?: number;
}

const KakaoMap = ({ x, y, width = '300px', height = '300px', level = 3 }: KakaoMapProps) => {
    return (
        <div>
            <Map center={{ lat: x, lng: y }} style={{ width: width, height: height }} level={level} />
        </div>
    );
};

export default KakaoMap;
