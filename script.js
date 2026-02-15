// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar hide/show on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Feature card hover effects
const featureCards = document.querySelectorAll('.feature-v2-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Button glow effect
const buttons = document.querySelectorAll('.btn-primary, .btn-outline');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const glow = document.createElement('div');
        glow.classList.add('button-glow');
        button.appendChild(glow);

        setTimeout(() => {
            glow.remove();
        }, 1000);
    });
});

// FAQ toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked one if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for fade-in
    document.querySelectorAll('.features-v2, .showcase, .faq, .footer').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// --- Visitor tracking (Discord webhook) ---
(function () {
    // Bot detection
    const ua = navigator.userAgent || '';
    const botPatterns = /bot|crawl|spider|slurp|bingpreview|mediapartners|facebookexternalhit|twitterbot|linkedinbot|discordbot|telegrambot|whatsapp|pintrest|semrush|ahref|mj12bot|dotbot|petalbot|yandex|baidu|sogou|google|headless|phantom|selenium|puppeteer|playwright|wget|curl|httpie|python-requests|go-http|java\/|libwww|apache-http/i;

    if (botPatterns.test(ua)) return;
    if (navigator.webdriver) return;
    if (!window.chrome && /Chrome/.test(ua)) return; // headless Chrome

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const payload = {
        embeds: [{
            title: "🌐 New Site Visit",
            color: 3447003,
            fields: [
                { name: "⏰ Time", value: timestamp, inline: true },
                { name: "🌍 Timezone", value: timezone, inline: true },
                { name: "📄 Page", value: location.href, inline: false },
                { name: "📎 Referrer", value: document.referrer || "Direct", inline: true },
                { name: "🖥️ Screen", value: `${screen.width}x${screen.height}`, inline: true },
                { name: "📱 Platform", value: navigator.platform || "Unknown", inline: true },
                { name: "🌐 Language", value: navigator.language || "Unknown", inline: true },
                { name: "🔧 User Agent", value: ua.substring(0, 1024), inline: false }
            ],
            footer: { text: "Nyrox Visitor Tracker" },
            timestamp: now.toISOString()
        }]
    };

    fetch("https://discord.com/api/webhooks/1472743125385744495/-OS_88t2dMAzv4bIjAuuvYsly4Jj8UDxuWiboHSdB2WiLaCDbZFbjR98i_gLwHNxckyy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(() => {});
})();
