// ============================================================
// 🧠 MAIN.JS - توابع عمومی سایت
// ============================================================

/**
 * نمایش پیام در کنسول با استایل
 */
function log(message, type = 'info') {
    const styles = {
        info: 'color: #667eea; font-weight: bold;',
        success: 'color: #48bb78; font-weight: bold;',
        warning: 'color: #ed8936; font-weight: bold;',
        error: 'color: #fc8181; font-weight: bold;'
    };
    console.log(`%c[GliomaHub] ${message}`, styles[type] || styles.info);
}

/**
 * کوتاه‌کردن متن طولانی
 */
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * نمایش تاریخ شمسی
 */
function toPersianDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('fa-IR');
}

/**
 * جستجو در آرایه (فیلتر)
 */
function filterItems(items, query, fields) {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    
    return items.filter(item => {
        return fields.some(field => {
            const value = String(item[field] || '').toLowerCase();
            return value.includes(q);
        });
    });
}

/**
 * ذخیره‌سازی در LocalStorage
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(`glioma_${key}`, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('خطا در ذخیره‌سازی:', error);
        return false;
    }
}

/**
 * خواندن از LocalStorage
 */
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(`glioma_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('خطا در خواندن:', error);
        return null;
    }
}

/**
 * کپی متن در کلیپ‌بورد
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => alert('✅ متن کپی شد!'))
            .catch(() => alert('❌ خطا در کپی متن'));
    } else {
        // روش جایگزین برای مرورگرهای قدیمی
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ متن کپی شد!');
    }
}

/**
 * نمایش مودال اطلاعات
 */
function showModal(title, content) {
    // ساخت مودال
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 24px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: #fff;
            max-width: 500px;
            width: 100%;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.3);
            animation: fadeInUp 0.3s ease;
        ">
            <h3 style="margin-bottom:12px;font-size:22px;">${title}</h3>
            <div style="color:#718096;line-height:1.8;">${content}</div>
            <button onclick="this.closest('div[style]').parentElement.remove()" style="
                margin-top:20px;
                background: #667eea;
                color: #fff;
                border: none;
                padding: 10px 32px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 15px;
                font-family: 'Vazir', sans-serif;
                font-weight: 600;
                transition: all 0.3s;
            " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-check"></i> متوجه شدم
            </button>
        </div>
    `;
    
    // کلیک روی پس‌زمینه برای بستن
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    document.body.appendChild(modal);
    
    // انیمیشن fadeIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// 🚀 توابع اولیه (پس از بارگذاری کامل)
// ============================================================

function initializeAI() {
    log('دستیار هوشمند آماده شد ✅', 'success');
}

function initializeDashboard() {
    log('داشبورد آماده شد ✅', 'success');
}

function initializeCentersMap() {
    log('مراکز سرطان آماده شد ✅', 'success');
}