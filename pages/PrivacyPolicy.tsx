import React from 'react';
import { Language } from '../App';
import ProjectStartSection from '../components/ProjectStartSection';

interface PrivacyPolicyProps {
  lang: Language;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang }) => {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 min-h-screen bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#39FF14] mb-12 uppercase tracking-tighter">
          {lang === 'EN' ? 'Privacy Policy' : '隱私政策'}
        </h1>
        
        <div className="space-y-8 text-[#F5F5F5] font-light leading-relaxed">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">
            {lang === 'EN' ? 'Last Updated: February 2026' : '最後更新日期：2026年2月'}
          </p>
          
          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '1. Introduction' : '1. 前言'}
            </h2>
            <p>
              {lang === 'EN' 
                ? 'Nove International Limited ("we," "us," or "our") is committed to protecting your privacy. This policy explains how we collect and use your personal data through your use of noveint.com.'
                : 'Nove International Limited（以下簡稱「我們」或「本公司」）致力於保護您的隱私。本政策說明我們如何透過您使用 noveint.com 收集並使用您的個人資料。'}
            </p>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '2. The Data We Collect' : '2. 我們收集的資料'}
            </h2>
            <p>{lang === 'EN' ? 'We may collect and process the following data about you:' : '我們可能會收集並處理關於您的以下資料：'}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                {lang === 'EN' 
                  ? 'Identity & Contact Data: Name, email address, and phone number (typically provided via our contact form).'
                  : '身份與聯絡資料：姓名、電子郵件地址及電話號碼（通常透過我們的聯絡表單提供）。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Technical Data: IP address, browser type, and location data (collected via cookies).'
                  : '技術資料：IP 地址、瀏覽器類型及位置資料（透過 Cookie 收集）。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Project Data: Information provided by you relating to design or media commissions.'
                  : '專案資料：您提供的與設計或媒體委託相關的資訊。'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '3. How We Use Your Data' : '3. 我們如何使用您的資料'}
            </h2>
            <p>{lang === 'EN' ? 'We only use your data when the law allows us to. Most commonly, we use it to:' : '我們僅在法律允許的情況下使用您的資料。最常見的用途包括：'}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                {lang === 'EN'
                  ? 'Perform a Contract: To provide the design services you have requested.'
                  : '履行合約：提供您所要求的設計服務。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Legitimate Interests: To respond to enquiries, improve our website, and protect our business.'
                  : '正當利益：回覆查詢、改進我們的網站並保護我們的業務。'}
              </li>
              <li>
                {lang === 'EN'
                  ? 'Consent: Where you have opted-in to receive our newsletter or marketing.'
                  : '同意：在您選擇接收我們的電子報或行銷資訊的情況下。'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '4. Data Retention' : '4. 資料保留'}
            </h2>
            <p>
              {lang === 'EN'
                ? 'We only keep your personal data for as long as necessary to fulfil the purposes we collected it for, including any legal, accounting, or reporting requirements. Standard project data is typically held for 6 years following the end of a contract for tax and legal purposes.'
                : '我們僅在實現收集目的所需的期限內保留您的個人資料，包括任何法律、會計或報告要求。出於稅務和法律目的，標準專案資料通常在合約結束後保留 6 年。'}
            </p>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '5. Your Rights' : '5. 您的權利'}
            </h2>
            <p>{lang === 'EN' ? 'Under the UK GDPR, you have the following rights:' : '根據英國 GDPR，您擁有以下權利：'}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{lang === 'EN' ? 'Access: Request a copy of the data we hold about you.' : '查閱權：要求提供我們持有的關於您的資料副本。'}</li>
              <li>{lang === 'EN' ? 'Correction: Ask us to fix inaccurate data.' : '更正權：要求我們修正不準確的資料。'}</li>
              <li>{lang === 'EN' ? 'Erasure: Ask us to delete your data (the "Right to be Forgotten").' : '刪除權：要求我們刪除您的資料（即「被遺忘權」）。'}</li>
              <li>{lang === 'EN' ? 'Object: Withdraw your consent for marketing at any time.' : '反對權：隨時撤回您對行銷資訊的同意。'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '6. Cookies' : '6. Cookie 政策'}
            </h2>
            <p>{lang === 'EN' ? 'Our website uses cookies to distinguish you from other users.' : '我們的網站使用 Cookie 來區分您與其他使用者。'}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{lang === 'EN' ? 'Strictly Necessary Cookies: Required for the operation of the site.' : '絕對必要 Cookie：網站運作所必需。'}</li>
              <li>{lang === 'EN' ? 'Analytical/Performance Cookies: Allow us to recognise and count the number of visitors.' : '分析/效能 Cookie：讓我們能夠識別並統計訪客數量。'}</li>
            </ul>
            <p className="mt-4 italic">
              {lang === 'EN'
                ? 'Note: Under the 2025/26 DUAA updates, "low-risk" analytical cookies no longer require a pop-up in all cases, but we provide a clear opt-out for your transparency.'
                : '註：根據 2025/26 DUAA 更新，「低風險」分析型 Cookie 在某些情況下不再需要彈出視窗，但為了透明度，我們仍提供明確的退出選項。'}
            </p>
          </section>

          <section>
            <h2 className="text-[#39FF14] text-xl font-bold mb-4 uppercase">
              {lang === 'EN' ? '7. Contact Us & Complaints' : '7. 聯絡我們與申訴'}
            </h2>
            <p>
              {lang === 'EN'
                ? 'If you have questions or wish to exercise your rights, please contact us at: Nove International Limited [Insert Email Address] [Insert Registered Office Address]'
                : '如果您有任何疑問或希望行使您的權利，請透過以下方式聯絡我們：Nove International Limited [插入電子郵件地址] [插入註冊辦事處地址]'}
            </p>
            <p className="mt-4">
              {lang === 'EN'
                ? 'You also have the right to make a complaint at any time to the Information Commissioner’s Office (ICO) (www.ico.org.uk).'
                : '您也有權隨時向資訊專員辦公室 (ICO) 提出申訴 (www.ico.org.uk)。'}
            </p>
          </section>
        </div>
      </div>
      <ProjectStartSection lang={lang} />
    </div>
  );
};

export default PrivacyPolicy;
