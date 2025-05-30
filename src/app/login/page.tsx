import LoginForm from '@/components/login-form';
//test

export default function Login() {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md mx-auto p-6">
                    <LoginForm></LoginForm>
                </div>

                <div></div>
            </div>
        </div>
    );
}
