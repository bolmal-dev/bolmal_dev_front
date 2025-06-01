import Image from 'next/image';
import imgHeader from '../../../public/artist_header.svg';

const Artist = () => {
    return (
        <div className="flex flex-col items-center min-h-[80vh]">
            <Image width={1440} height={383} src={imgHeader} alt="이미지헤더" className="w-screen" />
            <h1 className="text-[30px] text-primary font-[900]">아티스트 페이지 준비중입니다.</h1>
        </div>
    );
};

export default Artist;
