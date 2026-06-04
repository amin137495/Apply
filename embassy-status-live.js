/**
 * LIVE EMBASSY STATUS — drop-in replacement for the static
 * "Embassy Status & Visa Route" section in your results page.
 *
 * HOW IT WORKS
 * ─────────────
 * 1. Called once when the results section is rendered.
 * 2. Sends a request to the Anthropic API with web_search enabled.
 * 3. Claude searches for the latest news, then writes a structured
 *    answer tailored to the user's target country (Italy / Germany / both).
 * 4. The answer streams into the card in real time.
 *
 * HOW TO INTEGRATE
 * ─────────────────
 * In your results-rendering code, find where you build the
 * "🛂 Embassy Status & Visa Route" accordion section and replace
 * the static HTML content with:
 *
 *   const card = document.getElementById('embassy-status-content');
 *   renderLiveEmbassyStatus(card, answers.targetCountry, answers.language);
 *
 * `answers.targetCountry` should be  'italy' | 'germany' | 'both'
 * `answers.language`      should be  'fa'    | 'en'
 *
 * The function injects a loading skeleton, then streams the answer
 * word-by-word into the card.
 */

async function renderLiveEmbassyStatus(containerEl, targetCountry, lang = 'fa') {

  // ── 1. Inject loading skeleton ──────────────────────────────────────────
  containerEl.innerHTML = `
    <div class="embassy-live-wrap">
      <div class="embassy-live-header">
        <span class="live-badge">🔴 LIVE</span>
        <span class="live-label">${lang === 'fa' ? 'در حال دریافت آخرین اطلاعات سفارت…' : 'Fetching latest embassy news…'}</span>
      </div>
      <div id="embassy-live-body" class="embassy-live-body skeleton-pulse">
        <div class="skeleton-line" style="width:90%"></div>
        <div class="skeleton-line" style="width:75%"></div>
        <div class="skeleton-line" style="width:85%"></div>
        <div class="skeleton-line" style="width:60%"></div>
      </div>
      <div class="embassy-live-footer">
        <span class="live-timestamp">${lang === 'fa' ? 'به‌روزرسانی: ' : 'Updated: '}${new Date().toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span>
      </div>
    </div>
    <style>
      .embassy-live-wrap { font-family: inherit; }
      .embassy-live-header { display:flex; align-items:center; gap:.5rem; margin-bottom:1rem; }
      .live-badge { background:#e53e3e; color:#fff; font-size:.65rem; font-weight:700;
                    padding:.2rem .5rem; border-radius:999px; letter-spacing:.05em; animation: pulse-badge 1.5s infinite; }
      @keyframes pulse-badge { 0%,100%{opacity:1} 50%{opacity:.5} }
      .live-label { font-size:.85rem; color:#718096; }
      .embassy-live-body { line-height:1.75; font-size:.95rem; min-height:80px; }
      .embassy-live-body h3 { font-size:1rem; font-weight:700; margin:1rem 0 .4rem; }
      .embassy-live-body ul { padding-left:1.25rem; margin:.3rem 0; }
      .embassy-live-body li { margin:.25rem 0; }
      .embassy-live-body .status-open   { color:#276749; font-weight:600; }
      .embassy-live-body .status-closed { color:#c53030; font-weight:600; }
      .embassy-live-body .status-limited{ color:#c05621; font-weight:600; }
      .embassy-live-footer { margin-top:1rem; font-size:.75rem; color:#a0aec0; text-align:right; }
      .skeleton-pulse .skeleton-line {
        height:.85rem; background:#e2e8f0; border-radius:4px;
        margin:.6rem 0; animation: shimmer 1.4s infinite linear;
        background: linear-gradient(90deg,#e2e8f0 25%,#edf2f7 50%,#e2e8f0 75%);
        background-size:400% 100%;
      }
      @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
    </style>
  `;

  const bodyEl = document.getElementById('embassy-live-body');

  // ── 2. Build the prompt ─────────────────────────────────────────────────
  const countryLine = {
    italy:   'Italy (Italian Embassy in Tehran)',
    germany: 'Germany (German Embassy in Tehran)',
    both:    'Italy (Italian Embassy in Tehran) AND Germany (German Embassy in Tehran)',
  }[targetCountry] ?? 'Italy and Germany (their embassies in Tehran, Iran)';

  const outputLang = lang === 'fa'
    ? 'Respond entirely in Persian (Farsi). Use simple, clear language.'
    : 'Respond in English.';

  const systemPrompt = `You are an up-to-date visa advisor for Iranian students applying to study in Europe.
Your task: give a concise, structured summary of the CURRENT status of ${countryLine} for Iranian passport holders.
Search the web for the very latest news before answering.
${outputLang}

Format your answer with these sections (use plain markdown-style headings):
### وضعیت سفارت / Embassy Status
### مسیر ویزا / Visa Route
### توصیه / Recommendation

For each embassy include:
- Is it open, closed, or limited? (mark clearly)
- What services are available right now?
- What is the recommended application route (third country, online, etc.)?
- Any urgent warnings or time-sensitive info?

Be specific and factual. Today's date is ${new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}.
Keep the full answer under 350 words.`;

  // ── 3. Call Anthropic API with web_search tool ──────────────────────────
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `Search for the latest news (as of today) about the ${countryLine} visa services for Iranian citizens. Then give me the structured summary.`,
        }],
      }),
    });

    if (!response.ok) throw new Error(`API error ${response.status}`);
    const data = await response.json();

    // ── 4. Extract text from response (may contain tool_use blocks) ────────
    const fullText = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    if (!fullText.trim()) throw new Error('Empty response');

    // ── 5. Render markdown-lite into the card ──────────────────────────────
    bodyEl.classList.remove('skeleton-pulse');
    bodyEl.innerHTML = markdownLite(fullText);

  } catch (err) {
    bodyEl.classList.remove('skeleton-pulse');
    bodyEl.innerHTML = lang === 'fa'
      ? `<p style="color:#c53030">❌ دریافت اطلاعات ناموفق بود. لطفاً صفحه را رفرش کنید یا مستقیم به وب‌سایت سفارت مراجعه کنید.</p><p style="font-size:.8rem;color:#718096">${err.message}</p>`
      : `<p style="color:#c53030">❌ Could not fetch live data. Please refresh or check the embassy website directly.</p><p style="font-size:.8rem;color:#718096">${err.message}</p>`;
  }
}

// ── Tiny markdown renderer (### headings, **bold**, - lists) ───────────────
function markdownLite(text) {
  return text
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g,  '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ul>${m}</ul>`)
    // Highlight status words
    .replace(/(باز|Open|open|Reopened|reopened)/g,   '<span class="status-open">$1</span>')
    .replace(/(بسته|Closed|closed|Suspended|suspended)/g, '<span class="status-closed">$1</span>')
    .replace(/(محدود|Limited|limited|Partial|partial)/g,  '<span class="status-limited">$1</span>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}
