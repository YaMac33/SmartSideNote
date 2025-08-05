document.addEventListener('DOMContentLoaded', function() {
    // パフォーマンス最適化: IntersectionObserverを使用
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 全てのプロジェクトカードを監視
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // キーボードナビゲーション
    projectCards.forEach((card, index) => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && projectCards[index + 1]) {
                projectCards[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && projectCards[index - 1]) {
                projectCards[index - 1].focus();
            }
        });
    });

    // パララックス効果（パフォーマンスを考慮した軽量版）
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.background-animation');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ローディングアニメーション完了後にコンテンツを表示
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// サービスワーカー（オフライン対応）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
