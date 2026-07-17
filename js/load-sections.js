// ============================================================
// 📦 بارگذاری تمام بخش‌های سایت با iframe (بدون نیاز به سرور)
// ============================================================

const sections = [
    { id: 'header-container', file: 'sections/header.html' },
    { id: 'hero-container', file: 'sections/hero.html' },
    { id: 'ai-assistant-container', file: 'sections/ai-assistant.html' },
    { id: 'knowledge-base-container', file: 'sections/knowledge-base.html' },
    { id: 'contribution-container', file: 'sections/contribution.html' },
    { id: 'cancer-centers-container', file: 'sections/cancer-centers.html' },
    { id: 'dashboard-container', file: 'sections/dashboard.html' },
    { id: 'research-tools-container', file: 'sections/research-tools.html' },
    { id: 'news-container', file: 'sections/news.html' },
    { id: 'footer-container', file: 'sections/footer.html' }
];

/**
 * بارگذاری یک بخش با استفاده از iframe
 */
function loadSectionWithIframe(containerId, filePath) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.warn(`⚠️ المان با id=${containerId} یافت نشد`);
        return;
    }

    // ایجاد iframe
    const iframe = document.createElement('iframe');
    iframe.src = filePath;
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.minHeight = '50px';
    iframe.scrolling = 'no';
    
    // تنظیم ارتفاع خودکار
    iframe.onload = function() {
        try {
            const height = iframe.contentWindow.document.documentElement.scrollHeight;
            iframe.style.height = (height + 10) + 'px';
            console.log(`✅ بارگذاری شد: ${filePath}`);
        } catch(e) {
            // خطاهای CORS را نادیده بگیر
            iframe.style.height = '200px';
            console.log(`⚠️ بارگذاری با ارتفاع پیش‌فرض: ${filePath}`);
        }
    };
    
    // نمایش placeholder در حین بارگذاری
    container.innerHTML = `
        <div style="text-align:center;padding:20px;color:#a0aec0;">
            <i class="fas fa-spinner fa-spin" style="font-size:24px;display:block;margin-bottom:8px;"></i>
            در حال بارگذاری...
        </div>
    `;
    
    // جایگزینی با iframe
    container.innerHTML = '';
    container.appendChild(iframe);
}

/**
 * بارگذاری تمام بخش‌ها
 */
function loadAllSections() {
    console.log('🚀 شروع بارگذاری بخش‌های سایت با iframe...');
    
    sections.forEach(section => {
        loadSectionWithIframe(section.id, section.file);
    });
    
    console.log('✅ تمام بخش‌ها بارگذاری شدند!');
}

// ============================================================
// 🚀 اجرا پس از بارگذاری کامل DOM
// ============================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
} else {
    loadAllSections();
}