document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionData = [
        { title: '利害関係の排除', content: '許認可権限を持つ職員が関連企業で複業する等の利益相反を防ぐため、第三者を含む審査委員会を設置し、申請内容を客観的に審査する仕組みが不可欠です。' },
        { title: '労働時間の管理', content: '本業に支障が出ないよう、週8時間・月30時間などの明確な上限を設定し、上長の許可と定期的な活動報告を義務付けることで、適切な労務管理を行います。' },
        { title: '情報管理の徹底', content: '職務上知り得た秘密情報を漏洩させないため、複業開始前に守秘義務に関する誓約書の提出を義務付け、違反時の罰則を明確化します。' }
    ];

    const accordionContainer = document.getElementById('accordion-container');
    accordionData.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'border rounded-lg';
        accordionItem.innerHTML = `
            <button class="accordion-header w-full text-left p-4 font-bold flex justify-between items-center">
                <span>${item.title}</span>
                <span class="transform transition-transform duration-300">▼</span>
            </button>
            <div class="accordion-content px-4 pb-4 text-gray-600">
                ${item.content}
            </div>
        `;
        accordionContainer.appendChild(accordionItem);
    });

    accordionContainer.addEventListener('click', (event) => {
        const header = event.target.closest('.accordion-header');
        if (!header) return;

        const content = header.nextElementSibling;
        const icon = header.querySelector('span:last-child');
        
        const isOpening = !content.style.maxHeight;

        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(el => {
            el.style.maxHeight = null;
        });
        document.querySelectorAll('.accordion-header span:last-child').forEach(el => {
            el.style.transform = 'rotate(0deg)';
        });
        
        // Open the clicked one if it was closed
        if (isOpening) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = 'rotate(180deg)';
        }
    });

    // Nav Link Active State on Scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // 80px offset for header height
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
