import { UserInfo } from '@/hooks/useUserInfo';
import Image from 'next/image';
import defaultImg from '../../../public/ㅂㄹㅁㄹ.svg';

export default function ProfileLogin({ userInfo }: { userInfo: UserInfo }) {
    return (
        <div className="h-[22.22vw] flex flex-col gap-[0.69vw]">
            <div className="flex flex-col rounded-[20px] bg-white w-[19.58vw] h-[11.11vw] border-[1px] border-[#F0F0F0] justify-between p-[1.38vw]">
                <div className="flex flex-col">
                    <div className="flex">
                        <Image
                            className="h-[3.82vw] w-[3.82vw] rounded-[50%] bg-black"
                            src={userInfo.imgUrl ? userInfo.imgUrl : defaultImg}
                            alt="프로필"
                            width={55}
                            height={55}
                        ></Image>
                        <div className="py-[0.35vw] ml-[1.38vw]">
                            <div className="text-[1.25vw]">
                                <span className="font-[700]">{userInfo.name}</span>
                                <span className="font-[500]">님</span>
                            </div>
                            <span className="text-[clamp(13px,0.972vw,24px)] font-[700]">
                                {userInfo.isSubscribe ? '프리미엄 구독중' : '무료버전 이용중'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-[#F7F7F7] w-[16.80vw] h-fit flex justify-between rounded-[10px] p-[1.04vw]">
                    <div className="flex">
                        <Image src={defaultImg} alt="타임어택" className="w-[1.38vw] h-[1.38vw] mr-[0.62vw]"></Image>
                        <span className="text-[1.04vw] font-[500]">다가오는 티켓팅</span>
                    </div>
                    {userInfo.onComming !== '' ? (
                        <span className="font-[700] text-[1.04vw]">{userInfo.onComming}전</span>
                    ) : (
                        <span className="font-[700] text-[1.04vw]">없음</span>
                    )}
                </div>
            </div>
            <div className="rounded-[20px] bg-white w-[19.58vw] h-[4.86vw] border-[1px] border-[#F0F0F0] py-[1.04vw] px-[1.73vw] flex justify-between">
                <div className="flex">
                    <Image src={defaultImg} alt="알람" className="h-[2.78vw] w-[2.78vw] mr-[1.388vw]"></Image>
                    <span className="py-[0.62vw] text-[1.25vw]">알람 이용권</span>
                </div>
                <span className="py-[0.62vw] text-[1.25vw] font-[700]">{userInfo.alarmTicket}개</span>
            </div>
            <div className="rounded-[20px] bg-white w-[19.58vw] h-[4.86vw] border-[1px] border-[#F0F0F0] py-[1.04vw] px-[1.73vw] flex justify-between">
                <div className="flex">
                    <Image src={defaultImg} alt="알람" className="h-[2.78vw] w-[2.78vw] mr-[1.388vw]"></Image>
                    <span className="py-[0.62vw] text-[1.25vw]">찜 이용권</span>
                </div>
                <span className="py-[0.62vw] text-[1.25vw] font-[700]">{userInfo.zzimTicket}개</span>
            </div>
        </div>
    );
}
