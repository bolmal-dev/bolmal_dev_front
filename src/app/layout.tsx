import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/nav/navigation';
import AuthProvider from '@/components/providers/SessionProvier';
import QueryProvider from '@/components/providers/QueryProvider.tsx';

export const metadata: Metadata = {
    title: '볼래말래',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`}
                ></script>
                <QueryProvider>
                    <AuthProvider>
                        <Navigation />
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
