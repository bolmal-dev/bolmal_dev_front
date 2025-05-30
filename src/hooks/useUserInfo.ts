import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
    id: number | null;
    name: string | null;
    isLoggedIn: boolean; // client에서 직접 수정
    onComming: string | null;
    alarmTicket: number | null;
    zzimTicket: number | null;
    isSubscribe: boolean | null;
    imgUrl: string | null;
}

interface UserState {
    userInfo: UserInfo;
    setUserState: (
        userId: number,
        userName: string,
        onCommingDate: string | null,
        alarmTicketCnt: number,
        zzimTicketCnt: number,
        isSubscribe: boolean,
        imgUrl: string | null
    ) => void;
    removeUserState: () => void;
}

export const useStore = create<UserState>()(
    persist(
        (set) => ({
            userInfo: {
                id: null,
                name: null,
                isLoggedIn: false,
                onComming: null,
                alarmTicket: null,
                zzimTicket: null,
                isSubscribe: null,
                imgUrl: null,
            },
            setUserState: (userId, userName, onCommingDate, alarmTicketCnt, zzimTicketCnt, isSubscribe, imgUrl) =>
                set({
                    userInfo: {
                        id: userId,
                        name: userName,
                        isLoggedIn: true,
                        onComming: onCommingDate,
                        alarmTicket: alarmTicketCnt,
                        zzimTicket: zzimTicketCnt,
                        isSubscribe: isSubscribe,
                        imgUrl: imgUrl,
                    },
                }),
            removeUserState: () =>
                set({
                    userInfo: {
                        id: null,
                        name: null,
                        isLoggedIn: false,
                        onComming: null,
                        alarmTicket: null,
                        zzimTicket: null,
                        isSubscribe: null,
                        imgUrl: null,
                    },
                }),
        }),
        {
            name: 'user-storage',
        }
    )
);
