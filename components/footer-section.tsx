"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function FooterSection() {
  const router = useRouter()
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  return (
    <>
      <section
        className="relative w-full text-white bg-cover bg-center flex flex-col justify-between"
        style={{
          backgroundImage: "url('/images/footer2.png')",
          height: "475px",
          backgroundColor: "transparent",
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/45 z-0" />

        {/* 콘텐츠 전체 */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-[1440px] mx-auto w-full px-6 lg:px-12">
          {/* 상단 CTA 영역 */}
          <div className="flex flex-col items-center justify-center text-center pt-20">
            <h2 className="text-[32px] lg:text-[44px] font-extrabold leading-tight">이미 브랜드가 있으신가요?</h2>
            <p className="mt-3 text-[18px] lg:text-[20px] text-white/85">
              브릭업의 효과적인 인큐베이팅을 경험해보세요.
            </p>

            <button
              onClick={() => router.push("/franchise-incubating")}
              className="mt-8 bg-white text-[#111827] font-semibold rounded-full px-10 py-3 shadow-md hover:brightness-110 transition"
            >
              지금 신청하세요
            </button>
          </div>

          {/* 구분선 */}
          <div className="border-t border-white/20 mt-8 mb-6"></div>

          {/* 하단 회사 정보 */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end text-[13px] leading-relaxed pb-4">
            {/* 좌측 로고 및 회사명 */}
            <div className="flex flex-col gap-1">
              <img src="/images/brickup-logo-ww.png" alt="Brickup Logo" className="w-[130px] h-auto mb-2" />
              <p className="font-bold">주식회사 브릭업</p>
              <p>사업자등록번호 : 0000000000 | 법인등록번호 : 0000000</p>
              <p>서울시 금천구 벚꽃로 234 에이스하이엔6차 804호 | brickup@naver.com</p>
            </div>

            {/* 우측 저작권 */}
            <div className="text-right text-white/85 mt-8 lg:mt-0">
              <p>Copyright © Brickup Inc. All Rights Reserved.</p>
              <p className="space-x-2">
                <button onClick={() => setShowTermsModal(true)} className="hover:underline">
                  이용약관
                </button>
                <span>|</span>
                <button onClick={() => setShowPrivacyModal(true)} className="hover:underline">
                  개인정보처리방침
                </button>
                <span>|</span>
                <span>사업자정보확인</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">이용약관</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <h4 className="font-bold text-[#111827] mb-2">제1조 (목적)</h4>
              <p className="mb-4">
                본 약관은 주식회사 브릭업(이하 "회사"라 한다)이 제공하는 모든 서비스(이하 "서비스"라 한다)의 이용과
                관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조 (정의)</h4>
              <p className="mb-4">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
                <br />
                1. "서비스"란 회사가 제공하는 프랜차이즈 창업 컨설팅, 매칭, 상권 분석 등 모든 관련 서비스를 의미합니다.
                <br />
                2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                <br />
                3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을
                의미합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조 (약관의 효력 및 변경)</h4>
              <p className="mb-4">
                1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
                <br />
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 약관이 변경되는
                경우 회사는 변경사항을 시행일자 7일 전부터 회원에게 공지합니다.
                <br />
                3. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조 (서비스의 제공 및 변경)</h4>
              <p className="mb-4">
                1. 회사는 다음과 같은 서비스를 제공합니다:
                <br />- 프랜차이즈 창업 컨설팅 및 브랜드 매칭
                <br />- 상권 및 입지 분석
                <br />- 계약 지원 및 사후 관리
                <br />- 기타 회사가 정하는 서비스
                <br />
                2. 회사는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수
                있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조 (서비스의 중단)</h4>
              <p className="mb-4">
                1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                서비스의 제공을 일시적으로 중단할 수 있습니다.
                <br />
                2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 회원 또는 제3자가 입은 손해에
                대하여 배상합니다. 단, 회사에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조 (회원의 의무)</h4>
              <p className="mb-4">
                1. 회원은 다음 행위를 하여서는 안 됩니다:
                <br />- 신청 또는 변경 시 허위내용의 등록
                <br />- 타인의 정보 도용
                <br />- 회사가 게시한 정보의 변경
                <br />- 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
                <br />- 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
                <br />- 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                <br />- 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는
                행위
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조 (저작권의 귀속 및 이용제한)</h4>
              <p className="mb-4">
                1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
                <br />
                2. 회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이
                복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안
                됩니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조 (분쟁해결)</h4>
              <p className="mb-4">
                1. 회사는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여
                피해보상처리기구를 설치·운영합니다.
                <br />
                2. 회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가
                곤란한 경우에는 회원에게 그 사유와 처리일정을 즉시 통보해 드립니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조 (재판권 및 준거법)</h4>
              <p className="mb-4">
                1. 회사와 회원 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용합니다.
                <br />
                2. 회사와 회원 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.
              </p>

              <p className="mt-6 text-[#6B7280]">부칙: 본 약관은 2024년 1월 1일부터 시행합니다.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#111827]">개인정보처리방침</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-[#6B7280] hover:text-[#111827] text-[24px] leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto text-[14px] leading-[1.7] text-[#4B5563]">
              <p className="mb-4">
                주식회사 브릭업(이하 "회사"라 한다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와
                관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립,
                공개합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제1조(개인정보의 처리목적)</h4>
              <p className="mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
                조치를 이행할 예정입니다.
                <br />
                <br />
                1. 서비스 제공: 프랜차이즈 창업 컨설팅, 브랜드 매칭, 상권 분석 등의 서비스 제공
                <br />
                2. 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용
                방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
                <br />
                3. 마케팅 및 광고에 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회
                제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의
                서비스 이용에 대한 통계
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제2조(개인정보의 처리 및 보유기간)</h4>
              <p className="mb-4">
                1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
                <br />
                2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                <br />- 서비스 이용 계약 이행: 계약 종료 시까지
                <br />- 대금 결제 및 재화 등의 공급: 대금 결제 및 재화 등의 공급 완료 시까지
                <br />- 소비자 불만 또는 분쟁처리: 소비자의 불만 또는 분쟁처리 완료 시까지
                <br />- 관계 법령에 따른 보존: 전자상거래 등에서의 소비자보호에 관한 법률, 국세기본법 등 관계 법령의
                규정에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제3조(처리하는 개인정보의 항목)</h4>
              <p className="mb-4">
                회사는 다음의 개인정보 항목을 처리하고 있습니다:
                <br />
                1. 필수항목: 성명, 연락처(전화번호, 이메일 주소), 회사명, 브랜드명
                <br />
                2. 선택항목: 주소, 사업자등록번호, 창업 희망 지역, 예산 규모
                <br />
                3. 자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제4조(개인정보의 제3자 제공)</h4>
              <p className="mb-4">
                1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의
                동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
                제공합니다.
                <br />
                2. 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
                <br />- 제공받는 자: 프랜차이즈 본사
                <br />- 제공 목적: 브랜드 매칭 및 창업 상담
                <br />- 제공 항목: 성명, 연락처, 창업 희망 지역, 예산 규모
                <br />- 보유 및 이용 기간: 상담 완료 시까지
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제5조(개인정보처리의 위탁)</h4>
              <p className="mb-4">
                1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
                <br />- 위탁받는 자: 고객센터 운영 업체
                <br />- 위탁하는 업무의 내용: 고객 상담 및 문의 응대
                <br />
                2. 회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·
                관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에
                명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제6조(정보주체의 권리·의무 및 행사방법)</h4>
              <p className="mb-4">
                1. 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                <br />
                2. 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
                <br />
                3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제7조(개인정보의 파기)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
                개인정보를 파기합니다.
                <br />
                2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에
                따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나
                보관장소를 달리하여 보존합니다.
                <br />
                3. 개인정보 파기의 절차 및 방법은 다음과 같습니다:
                <br />- 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을
                받아 개인정보를 파기합니다.
                <br />- 파기방법: 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며,
                종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제8조(개인정보의 안전성 확보조치)</h4>
              <p className="mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                <br />
                1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
                <br />
                2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화,
                보안프로그램 설치
                <br />
                3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제9조(개인정보 보호책임자)</h4>
              <p className="mb-4">
                1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:
                <br />- 개인정보 보호책임자: 홍길동
                <br />- 연락처: 02-1234-5678, privacy@brickup.com
                <br />
                2. 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
                등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이
                답변 및 처리해드릴 것입니다.
              </p>

              <h4 className="font-bold text-[#111827] mb-2">제10조(개인정보 처리방침 변경)</h4>
              <p className="mb-4">
                이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이
                있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full h-[48px] rounded-lg bg-[#16469E] text-white font-semibold hover:brightness-110 transition-all"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
