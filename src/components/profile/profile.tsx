'use client';

import { useStore } from '@/hooks/useUserInfo';
import ProfileLogin from './profile-login';
import ProfileLogout from './profile-logout';

export default function Profile() {
    const userInfo = useStore((state) => state.userInfo);
    return (
        <div>
            {userInfo.isLoggedIn ? <ProfileLogin userInfo={userInfo}></ProfileLogin> : <ProfileLogout></ProfileLogout>}
        </div>
    );
}
