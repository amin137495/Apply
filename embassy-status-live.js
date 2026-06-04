/**
 * EMBASSY STATUS — static version
 * Last updated: June 2026
 * To update: edit the CONTENT object below and re-upload this file to GitHub.
 */

function renderLiveEmbassyStatus(containerEl, targetCountry, lang) {

  // ── EDIT THIS SECTION TO UPDATE CONTENT ───────────────────────────────
  const CONTENT = {

    en: {
      italy: `
        <h3>🇮🇹 Italian Embassy in Tehran</h3>
        <p><span class="status-closed">⛔ Suspended</span> — As of February 2026, the Italian Embassy in Tehran has suspended all regular consular services until further notice. All previously scheduled appointments have been cancelled.</p>

        <h3>✈️ Recommended Route: Apply via Yerevan, Armenia</h3>
        <ul>
          <li>Iranians can enter Armenia <strong>visa-free for 90 days</strong> — no pre-approval needed</li>
          <li>The Italian Embassy in Yerevan is <span class="status-open">fully operational</span></li>
          <li>Contact: <strong>amb.jerevan@cert.esteri.it</strong> | ambjerevan.esteri.it</li>
          <li>Book appointment via the TLS Contact centre in Yerevan</li>
        </ul>

        <h3>🚦 Getting to Yerevan from Iran</h3>
        <ul>
          <li><strong>By Air (~1.5 hrs):</strong> Mahan Air, Flyone Armenia — Tehran (IKA) or Tabriz → Yerevan (EVN). ~$80–200</li>
          <li><strong>By Bus (~18–22 hrs):</strong> Two daily buses Tehran → Yerevan via Tabriz. ~$30–60</li>
          <li><strong>By Land via Norduz–Agarak crossing:</strong> Shared taxi to border, then onward taxi to Yerevan</li>
        </ul>
      `,

      germany: `
        <h3>🇩🇪 German Embassy in Tehran</h3>
        <p><span class="status-limited">⚠️ Very Limited</span> — As of May 2026, TLScontact has partially reopened but only for applicants who were on the waiting list before January 18, or those with a pre-approved employment visa (§81a AufenthG).</p>

        <h3>✈️ Recommended Route: Apply via Yerevan, Armenia</h3>
        <ul>
          <li>Germany has officially rerouted all Iranian visa processing to the <strong>German Embassy in Yerevan</strong></li>
          <li>The usual "apply from country of residence" requirement has been <strong>waived</strong> for Iranians</li>
          <li>Appointment booking: <strong>service2.diplo.de</strong> (select Yerevan → National Visa D)</li>
          <li>TLScontact VAC Yerevan: <strong>visas-de.tlscontact.com/en-us/country/am/vac/amEVN2de</strong></li>
          <li>Allow at least <strong>8 weeks</strong> for processing after biometrics</li>
        </ul>

        <h3>🚦 Getting to Yerevan from Iran</h3>
        <ul>
          <li><strong>By Air (~1.5 hrs):</strong> Mahan Air, Flyone Armenia — Tehran (IKA) or Tabriz → Yerevan (EVN). ~$80–200</li>
          <li><strong>By Bus (~18–22 hrs):</strong> Two daily buses Tehran → Yerevan via Tabriz. ~$30–60</li>
          <li><strong>By Land via Norduz–Agarak crossing:</strong> Shared taxi to border, then onward taxi to Yerevan</li>
        </ul>
      `,

      both: `
        <h3>🇮🇹 Italian Embassy in Tehran</h3>
        <p><span class="status-closed">⛔ Suspended</span> — All regular consular services suspended since February 2026 until further notice.</p>

        <h3>🇩🇪 German Embassy in Tehran</h3>
        <p><span class="status-limited">⚠️ Very Limited</span> — Partially reopened May 2026 only for pre-listed or pre-approved employment visa applicants.</p>

        <h3>✈️ Recommended Route for Both: Apply via Yerevan, Armenia</h3>
        <ul>
          <li>Iranians enter Armenia <strong>visa-free for 90 days</strong> — no pre-approval needed, just your passport</li>
          <li>Both the German Embassy and Italian Embassy in Yerevan are <span class="status-open">fully operational</span></li>
          <li>German Embassy Yerevan appointment: <strong>service2.diplo.de</strong> (select Yerevan → National Visa D)</li>
          <li>Italian Embassy Yerevan: <strong>amb.jerevan@cert.esteri.it</strong> | ambjerevan.esteri.it</li>
          <li>TLScontact VAC Yerevan (German): <strong>visas-de.tlscontact.com/en-us/country/am/vac/amEVN2de</strong></li>
        </ul>

        <h3>🚦 Getting to Yerevan from Iran</h3>
        <ul>
          <li><strong>By Air (~1.5 hrs):</strong> Mahan Air, Flyone Armenia — Tehran (IKA) or Tabriz → Yerevan (EVN). ~$80–200</li>
          <li><strong>By Bus (~18–22 hrs):</strong> Two daily buses Tehran → Yerevan via Tabriz. ~$30–60</li>
          <li><strong>By Land via Norduz–Agarak crossing:</strong> Shared taxi to border, then onward taxi to Yerevan</li>
        </ul>
      `
    },

    fa: {
      italy: `
        <h3>🇮🇹 سفارت ایتالیا در تهران</h3>
        <p><span class="status-closed">⛔ تعلیق</span> — از فوریه ۲۰۲۶، سفارت ایتالیا در تهران تمام خدمات کنسولی عادی را تا اطلاع ثانوی تعلیق کرده است. تمام وقت‌های قبلی لغو شده‌اند.</p>

        <h3>✈️ مسیر پیشنهادی: درخواست از طریق ایروان، ارمنستان</h3>
        <ul>
          <li>ایرانی‌ها می‌توانند <strong>بدون ویزا تا ۹۰ روز</strong> وارد ارمنستان شوند</li>
          <li>سفارت ایتالیا در ایروان <span class="status-open">کاملاً فعال</span> است</li>
          <li>تماس: <strong>amb.jerevan@cert.esteri.it</strong> | ambjerevan.esteri.it</li>
          <li>رزرو وقت از طریق مرکز TLS Contact در ایروان</li>
        </ul>

        <h3>🚦 رفتن از ایران به ایروان</h3>
        <ul>
          <li><strong>هوایی (~۱.۵ ساعت):</strong> ماهان ایر، Flyone Armenia — تهران یا تبریز به ایروان. ~۸۰–۲۰۰ دلار</li>
          <li><strong>اتوبوس (~۱۸–۲۲ ساعت):</strong> دو اتوبوس روزانه تهران → ایروان از طریق تبریز. ~۳۰–۶۰ دلار</li>
          <li><strong>زمینی از گذرگاه نوردوز-آگاراک:</strong> تاکسی مشترک تا مرز، سپس تاکسی به ایروان</li>
        </ul>
      `,

      germany: `
        <h3>🇩🇪 سفارت آلمان در تهران</h3>
        <p><span class="status-limited">⚠️ بسیار محدود</span> — از مه ۲۰۲۶، TLScontact با ظرفیت محدود بازگشایی جزئی داشته — فقط برای متقاضیانی که قبل از ۱۸ ژانویه در لیست انتظار بودند یا ویزای کار با پیش‌تأییدیه دارند.</p>

        <h3>✈️ مسیر پیشنهادی: درخواست از طریق ایروان، ارمنستان</h3>
        <ul>
          <li>آلمان رسماً پردازش ویزای ایرانیان را به <strong>سفارت آلمان در ایروان</strong> منتقل کرده</li>
          <li>شرط معمول «درخواست از کشور محل اقامت» برای ایرانیان <strong>برداشته شده</strong></li>
          <li>رزرو وقت: <strong>service2.diplo.de</strong> (گزینه Yerevan → National Visa D را انتخاب کنید)</li>
          <li>TLScontact ایروان: <strong>visas-de.tlscontact.com/en-us/country/am/vac/amEVN2de</strong></li>
          <li>حداقل <strong>۸ هفته</strong> برای پردازش بعد از ثبت اثر انگشت در نظر بگیرید</li>
        </ul>

        <h3>🚦 رفتن از ایران به ایروان</h3>
        <ul>
          <li><strong>هوایی (~۱.۵ ساعت):</strong> ماهان ایر، Flyone Armenia — تهران یا تبریز به ایروان. ~۸۰–۲۰۰ دلار</li>
          <li><strong>اتوبوس (~۱۸–۲۲ ساعت):</strong> دو اتوبوس روزانه تهران → ایروان از طریق تبریز. ~۳۰–۶۰ دلار</li>
          <li><strong>زمینی از گذرگاه نوردوز-آگاراک:</strong> تاکسی مشترک تا مرز، سپس تاکسی به ایروان</li>
        </ul>
      `,

      both: `
        <h3>🇮🇹 سفارت ایتالیا در تهران</h3>
        <p><span class="status-closed">⛔ تعلیق</span> — تمام خدمات کنسولی از فوریه ۲۰۲۶ تا اطلاع ثانوی تعلیق شده‌اند.</p>

        <h3>🇩🇪 سفارت آلمان در تهران</h3>
        <p><span class="status-limited">⚠️ بسیار محدود</span> — از مه ۲۰۲۶ بازگشایی جزئی — فقط برای متقاضیان از پیش ثبت‌نام‌شده یا دارای پیش‌تأییدیه ویزای کار.</p>

        <h3>✈️ مسیر پیشنهادی برای هر دو: درخواست از طریق ایروان، ارمنستان</h3>
        <ul>
          <li>ایرانی‌ها <strong>بدون ویزا تا ۹۰ روز</strong> می‌توانند وارد ارمنستان شوند</li>
          <li>هر دو سفارت آلمان و ایتالیا در ایروان <span class="status-open">کاملاً فعال</span> هستند</li>
          <li>وقت سفارت آلمان ایروان: <strong>service2.diplo.de</strong> (Yerevan → National Visa D)</li>
          <li>سفارت ایتالیا ایروان: <strong>amb.jerevan@cert.esteri.it</strong> | ambjerevan.esteri.it</li>
          <li>TLScontact ایروان (آلمان): <strong>visas-de.tlscontact.com/en-us/country/am/vac/amEVN2de</strong></li>
        </ul>

        <h3>🚦 رفتن از ایران به ایروان</h3>
        <ul>
          <li><strong>هوایی (~۱.۵ ساعت):</strong> ماهان ایر، Flyone Armenia — تهران یا تبریز به ایروان. ~۸۰–۲۰۰ دلار</li>
          <li><strong>اتوبوس (~۱۸–۲۲ ساعت):</strong> دو اتوبوس روزانه تهران → ایروان از طریق تبریز. ~۳۰–۶۰ دلار</li>
          <li><strong>زمینی از گذرگاه نوردوز-آگاراک:</strong> تاکسی مشترک تا مرز، سپس تاکسی به ایروان</li>
        </ul>
      `
    }
  };
  // ── END OF EDITABLE CONTENT ────────────────────────────────────────────

  const l = (lang === 'fa') ? 'fa' : 'en';
  const c = ['italy', 'germany', 'both'].includes(targetCountry) ? targetCountry : 'both';
  const html = CONTENT[l][c];
  const updatedLabel = l === 'fa' ? 'آخرین به‌روزرسانی' : 'Last updated';

  containerEl.innerHTML = `
    <div class="embassy-live-wrap">
      <div class="embassy-live-body">${html}</div>
      <div class="embassy-live-footer">
        <span class="live-timestamp">⚠️ ${updatedLabel}: June 2026</span>
      </div>
    </div>
    <style>
      .embassy-live-wrap { font-family: inherit; }
      .embassy-live-body { line-height: 1.75; font-size: .95rem; }
      .embassy-live-body h3 { font-size: 1rem; font-weight: 700; margin: 1rem 0 .4rem; }
      .embassy-live-body ul { padding-left: 1.25rem; margin: .3rem 0; }
      .embassy-live-body li { margin: .25rem 0; }
      .status-open   { color: #276749; font-weight: 600; }
      .status-closed { color: #c53030; font-weight: 600; }
      .status-limited{ color: #c05621; font-weight: 600; }
      .embassy-live-footer { margin-top: 1rem; font-size: .75rem; color: #a0aec0; text-align: right; }
    </style>
  `;
}
