// ---------------------------------------------------------------
// Language toggle
//
// The choice is remembered in localStorage so it survives navigation.
// Without this the policy pages would always open in English even for a
// reader who had switched to Hebrew - a privacy notice nobody can read in
// their own language does not do its job.
// localStorage is wrapped in try/catch: private windows and blocked site
// data make it throw, and a failure there must not break the page.
// ---------------------------------------------------------------
const LANG_KEY = 'wrh-lang';

function readStoredLang() {
    try {
        const v = localStorage.getItem(LANG_KEY);
        return (v === 'he' || v === 'en') ? v : null;
    } catch (e) { return null; }
}

function storeLang(v) {
    try { localStorage.setItem(LANG_KEY, v); } catch (e) { /* not fatal */ }
}

let currentLang = readStoredLang() || 'en';

// Some translations carry a <br> for line breaks. Rather than assigning
// innerHTML (which would execute any markup an attribute happened to hold),
// split on <br> and build real text nodes with <br> elements between them.
// Same visual result, no HTML parsing of attribute content.
function setTranslatedText(el, text) {
    while (el.firstChild) el.removeChild(el.firstChild);
    const parts = text.split(/<br\s*\/?>/i);
    parts.forEach((part, i) => {
        if (i > 0) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(part));
    });
}

function applyLanguage() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'he' ? 'rtl' : 'ltr';

    const label = document.getElementById('langLabel');
    if (label) label.textContent = currentLang === 'he' ? 'HE' : 'EN';

    const btn = document.getElementById('langToggle');
    if (btn) {
        // Announce the action, not the current state, and say it in the
        // language the button will switch TO.
        btn.setAttribute('aria-label', currentLang === 'he' ? 'Switch to English' : 'עבור לעברית');
    }

    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute('data-' + currentLang);
        if (!text) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            setTranslatedText(el, text);
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'he' : 'en';
    storeLang(currentLang);
    applyLanguage();
}

        // Scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

// Wired here instead of an inline onclick= attribute, so the page can run
// under a strict Content-Security-Policy (script-src 'self').
document.addEventListener('DOMContentLoaded', function () {
    var t = document.getElementById('langToggle');
    if (t) t.addEventListener('click', toggleLanguage);
    // Restore the reader's previous choice before first paint of the text.
    if (currentLang !== 'en') applyLanguage();
});
