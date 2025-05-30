import Ad from '@/components/ad';
import NowBolmal from '@/components/now-bolmal/now-bolmal';
import Profile from '@/components/profile/profile';
import WeeklyTicke from '@/components/weekly-ticket/weekly-ticket';
import ViewportSetter from './ViewPortSetter';

export default function Home() {
    return (
        <div>
            <ViewportSetter />
            <div className="bg-bg-default flex py-[20px] px-[8.33vw] justify-between gap-[24px]">
                <Ad></Ad>
                <Profile></Profile>
            </div>
            <div className="bg-white px-[8.33vw] py-[30px]">
                <NowBolmal></NowBolmal>
            </div>
            <div className="bg-[#FAFAFA] px-[8.33vw] pt-[30px]">
                <WeeklyTicke></WeeklyTicke>
            </div>
        </div>
    );
}
