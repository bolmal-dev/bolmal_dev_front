'use client';

import { useEffect } from 'react';

export default function ViewportSetter() {
    useEffect(() => {
        const isMobile = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
        };

        if (isMobile()) {
            // HTMLMetaElement로 타입 단언 추가
            const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
            if (viewport) {
                viewport.content = 'width=1024, user-scalable=yes';
            } else {
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=1024, user-scalable=yes';
                document.head.appendChild(meta);
            }
        }
    }, []);

    return null;
}
