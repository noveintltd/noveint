import React from 'react';
import { Language } from '../App';
import ProjectStartSection from '../components/ProjectStartSection';

interface TermsConditionsProps {
  lang: Language;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ lang }) => {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 min-h-screen bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#39FF14] mb-12 uppercase tracking-tighter">
          {lang === 'EN' ? 'Terms and Conditions of Service' : '服務條款'}
        </h1>
        
        <div className="space-y-8 text-[#F5F5F5] font-light leading-relaxed">
          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '1. The Agreement' : '1. 合約協議'}
            </h2>
            <p>
              {lang === 'EN'
                ? 'These Terms and Conditions apply to all services provided by Nove International Limited (trading as noveint.com), a company registered in England and Wales (Company No: 16222266). By commissioning our services, you (the "Client") agree to be bound by these terms.'
                : '本服務條款適用於 Nove International Limited（以 noveint.com 名義營運，於英格蘭及威爾斯註冊，公司編號：16222266）所提供的所有服務。透過委託我們的服務，您（以下簡稱「客戶」）同意受本條款約束。'}
            </p>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '2. Quotations and Deposits' : '2. 報價與定金'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{lang === 'EN' ? 'All quotes are valid for 30 days from the date of issue.' : '所有報價自發佈之日起 30 天內有效。'}</li>
              <li>{lang === 'EN' ? 'A non-refundable deposit of 50% is required before any work commences.' : '在任何工作開始前，需支付 50% 的不可退還定金。'}</li>
              <li>{lang === 'EN' ? 'Nove International Limited reserves the right to adjust the final price if the project scope changes significantly after the initial brief.' : '若專案範圍在初步簡報後發生重大變更，Nove International Limited 保留調整最終價格的權利。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '3. Client Responsibilities' : '3. 客戶責任'}
            </h2>
            <p>
              {lang === 'EN'
                ? 'The Client must provide all necessary information, logos, copy, and media required to complete the project. We are not responsible for delays caused by the Client’s failure to provide these materials in a timely manner.'
                : '客戶必須提供完成專案所需的所有必要資訊、標誌、文案及媒體素材。對於因客戶未能及時提供這些材料而導致的延遲，我們概不負責。'}
            </p>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '4. Revisions and "Scope Creep"' : '4. 修改與「範圍蔓延」'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{lang === 'EN' ? 'Unless otherwise stated, our fee includes two rounds of minor revisions.' : '除非另有說明，我們的費用包含兩輪細微修改。'}</li>
              <li>{lang === 'EN' ? 'Any additional revisions or changes to the original brief will be charged at our standard hourly rate.' : '任何額外的修改或對原始簡報的變更將按我們的標準時薪收費。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '5. Payment Terms' : '5. 付款條款'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{lang === 'EN' ? 'Final payment is due 14 days from the date of the final invoice.' : '最終款項應在最終發票日期後 14 天內支付。'}</li>
              <li>{lang === 'EN' ? 'For web design, the website will not be "launched" or transferred to the Client\'s hosting until the final balance is paid in full.' : '對於網頁設計，在最終餘款全額支付前，網站將不會「上線」或移交至客戶的託管伺服器。'}</li>
              <li>{lang === 'EN' ? 'In accordance with the Late Payment of Commercial Debts (Interest) Act 1998, we reserve the right to charge interest on late payments.' : '根據《1998 年商業債務逾期支付（利息）法》，我們保留對逾期付款收取利息的權利。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '6. Intellectual Property (IP)' : '6. 智慧財產權 (IP)'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {lang === 'EN'
                  ? 'Ownership: All intellectual property rights in the work created remain the property of Nove International Limited until the final invoice is paid in full.'
                  : '所有權：在最終發票全額支付前，所創作作品的所有智慧財產權仍屬於 Nove International Limited。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Licence: Upon full payment, the Client is granted a non-exclusive, perpetual licence to use the work for its intended business purpose.'
                  : '授權：全額付款後，客戶將獲得非專屬且永久的授權，可將作品用於其預定的業務目的。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Portfolio Rights: We reserve the right to display any work created for the Client in our portfolio and marketing materials (unless a non-disclosure agreement is in place).'
                  : '作品集權利：我們保留在作品集和行銷材料中展示為客戶創作的任何作品的權利（除非已簽署保密協議）。'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '7. Liability and Indemnity' : '7. 責任與賠償'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{lang === 'EN' ? 'Warranties: We do not warrant that a website will be error-free or that its operation will be uninterrupted.' : '保證：我們不保證網站將無任何錯誤，或其運作將不會中斷。'}</li>
              <li>{lang === 'EN' ? 'Limit of Liability: To the maximum extent permitted by English law, our total liability for any claim shall not exceed the total amount paid by the Client for the project.' : '責任限制：在英格蘭法律允許的最大範圍內，我們對任何索賠的總責任不得超過客戶為該專案支付的總金額。'}</li>
              <li>{lang === 'EN' ? 'Third-Party Services: We are not liable for issues caused by third-party services (e.g., hosting providers, domain registrars, or CMS software updates).' : '第三方服務：對於由第三方服務（如託管提供商、網域註冊商或 CMS 軟體更新）引起的問題，我們概不負責。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '8. Cancellation' : '8. 取消政策'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{lang === 'EN' ? 'The Client may cancel the project at any time by giving written notice.' : '客戶可隨時透過書面通知取消專案。'}</li>
              <li>{lang === 'EN' ? 'Upon cancellation, the Client will be invoiced for all work completed up to the date of cancellation, minus any deposit already paid.' : '取消後，客戶將收到截至取消之日已完成所有工作的發票，並扣除已支付的任何定金。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '9. Governing Law' : '9. 準據法'}
            </h2>
            <p>
              {lang === 'EN'
                ? 'This agreement is governed by and construed in accordance with the laws of England and Wales, and the parties submit to the exclusive jurisdiction of the English courts.'
                : '本協議受英格蘭及威爾斯法律管轄並按其解釋，雙方同意接受英格蘭法院的專屬管轄權。'}
            </p>
          </section>
        </div>
      </div>
      <ProjectStartSection lang={lang} />
    </div>
  );
};

export default TermsConditions;
