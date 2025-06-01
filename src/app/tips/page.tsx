import React from 'react';
import { Clock, User, Monitor, Globe, Zap, Shield, Target, Star } from 'lucide-react';

const TicketingGuide = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* 헤더 섹션 */}
            <div className="text-center mb-12">
                <div className="w-full h-64 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl mb-8 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">2025년 티켓팅 완전 정복 가이드</h1>
                        <p className="text-lg text-gray-600">YES24 & 인터파크 시스템 변화에 맞춘 실전 전략</p>
                    </div>
                </div>

                <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                        <strong>"어? 이거 예전이랑 좀 다른데?"</strong>
                    </p>
                    <p>그 감정, 절대 혼자만 느끼신 거 아니에요.</p>
                    <p className="text-pink-600 font-semibold">
                        2025년 들어서면서 YES24와 인터파크의 티켓팅 시스템이 크게 달라졌습니다.
                    </p>
                    <p>이제는 단순히 새로고침 타이밍이나 클릭 속도만으로는 부족해요.</p>
                </div>
            </div>

            {/* 공통 준비 팁 섹션 */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    <Target className="inline-block mr-3 text-pink-600" />
                    티켓팅 전에 꼭 챙겨야 할 공통 준비 팁
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                        <div className="flex items-center mb-4">
                            <User className="text-blue-600 mr-3" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">계정 & 본인인증</h3>
                        </div>
                        <p className="text-gray-700">
                            회원가입은 물론이고, 이름·주소·결제 정보 같은 <strong>개인 정보도 미리미리 업데이트</strong>
                            해두셔야 해요.
                        </p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                        <div className="flex items-center mb-4">
                            <Globe className="text-green-600 mr-3" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">브라우저 설정</h3>
                        </div>
                        <p className="text-gray-700">
                            크롬이나 웨일 추천! 팝업 차단 꼭 풀어두시고, <strong>예매 페이지 북마크</strong>도 미리
                            해두세요.
                        </p>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                        <div className="flex items-center mb-4">
                            <Monitor className="text-purple-600 mr-3" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">PC + 유선 인터넷</h3>
                        </div>
                        <p className="text-gray-700">
                            모바일보다는 <strong>PC방이나 고사양 컴퓨터</strong>에서 시도하는 게 훨씬 유리해요.
                        </p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                        <div className="flex items-center mb-4">
                            <Clock className="text-orange-600 mr-3" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">서버 시간 동기화</h3>
                        </div>
                        <p className="text-gray-700">
                            '네이비즘'이나 '타임시커' 사이트로 <strong>서버 시간 동기화</strong> 연습은 필수!
                        </p>
                    </div>
                </div>
            </div>

            {/* 인터파크 섹션 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 rounded-2xl mb-8">
                    <h2 className="text-3xl font-bold mb-4 flex items-center">
                        <Zap className="mr-3" />
                        인터파크 - 자동 버튼 + 연타 전략
                    </h2>
                    <p className="text-xl opacity-90">자동으로 바뀌는 버튼, 연타가 핵심!</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">🔄 새로고침? 이제 안 하셔도 됩니다</h3>
                        <p className="text-gray-700">
                            예매 시간이 되면 버튼이{' '}
                            <span className="bg-yellow-200 px-2 py-1 rounded">자동으로 '예매하기'로 바뀌어요</span>.
                            괜히 새로고침 연타하면 오히려 서버에 걸릴 수 있어요.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">⚡ 예매 버튼은 미리부터 연타!</h3>
                        <p className="text-gray-700">
                            예매 버튼이 바뀌기 직전부터{' '}
                            <span className="bg-red-200 px-2 py-1 rounded">미리 클릭하는 연타 전략</span>이
                            효과적입니다.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">👤 하나의 계정 = 하나의 대기열</h3>
                        <p className="text-gray-700">
                            2024년부터{' '}
                            <span className="bg-blue-200 px-2 py-1 rounded">계정 하나당 한 창만 접속 가능</span>합니다.
                            중복 접속은 제한될 수 있어요.
                        </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">🔐 보안문자 & 생년월일 팁</h3>
                        <p className="text-gray-700">
                            영문 키보드로 미리 바꿔두시고, 생년월일은 <strong>복사해두고 붙여넣기</strong> 하는 게 제일
                            빨라요.
                        </p>
                    </div>
                </div>
            </div>

            {/* YES24 섹션 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl mb-8">
                    <h2 className="text-3xl font-bold mb-4 flex items-center">
                        <Shield className="mr-3" />
                        YES24 - 멀티 브라우저 전략
                    </h2>
                    <p className="text-xl opacity-90">페이지 유형 확인하고, 브라우저 여러 개 활용!</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">📄 예매 페이지가 두 가지입니다</h3>
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                • <span className="font-mono bg-gray-100 px-2 py-1 rounded">hticket.yes24.com</span> →{' '}
                                <span className="text-green-600 font-semibold">자동 활성화</span>
                            </p>
                            <p className="text-gray-700">
                                • 일반 페이지 →{' '}
                                <span className="text-orange-600 font-semibold">직접 새로고침 필요</span> (59분
                                59초~정각)
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            🌐 브라우저를 여러 개 쓰면 성공 확률 UP!
                        </h3>
                        <p className="text-gray-700">
                            YES24는{' '}
                            <span className="bg-green-200 px-2 py-1 rounded">브라우저마다 대기번호가 따로 부여</span>
                            돼요. 크롬, 웨일, 엣지 등 다양하게 활용하세요!
                        </p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            ⚠️ 대기 페이지 떴다고 창 닫지 마세요
                        </h3>
                        <p className="text-gray-700">
                            예매 대기 페이지가 뜨면, <strong>절대 닫지 말고 그대로 두세요.</strong> 추가 시도는 새
                            창으로!
                        </p>
                    </div>
                </div>
            </div>

            {/* 마무리 섹션 */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white p-8 rounded-2xl text-center">
                <Star className="mx-auto mb-4" size={48} />
                <h2 className="text-3xl font-bold mb-4">티켓팅, 결국은 전략 + 연습 + 운</h2>
                <p className="text-xl mb-6 opacity-90">
                    어떤 플랫폼이든 중요한 건 <strong>시스템 이해 + 타이밍 + 준비된 손놀림</strong>이에요.
                </p>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                    <p className="text-lg mb-4">
                        <strong>볼래말래</strong>는 단순히 공연을 '추천'하는 데서 멈추지 않습니다.
                    </p>
                    <p className="text-lg mb-4">
                        공연을 <strong>직접 보고 즐길 수 있도록</strong>, 실전 정보도 꾸준히 알려드릴게요.
                    </p>
                    <p className="text-xl font-bold">볼래말래와 함께, 다음 공연도 준비되셨죠? 🎭</p>
                </div>
            </div>
        </div>
    );
};

export default TicketingGuide;
