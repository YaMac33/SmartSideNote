document.addEventListener('DOMContentLoaded', () => {
    // Tabbed Interface for Interpretation Methods
    const interpretationMethods = [
        { id: 'literal', name: '文理解釈', description: '条文の言葉通りの意味を厳格に適用する手法。予測可能性を担保しますが、不合理な結論に至ることもあります。' },
        { id: 'purposive', name: '目的論的解釈', description: '法律が作られた目的や趣旨に立ち返って解釈する手法。社会の変化に柔軟に対応できますが、解釈者の価値判断が入りやすくなります。' },
        { id: 'analogical', name: '類推解釈', description: '法律に直接の規定がない事柄について、似たような事柄を規律する条文を適用する手法。法の欠けている部分を補います。' },
        { id: 'systematic', name: '体系的解釈', description: 'ある条文を、法全体の構造や他の条文との関連性の中で位置づけて解釈する手法。法の一貫性を保ちます。' },
    ];
    const tabsContainer = document.getElementById('tabs-container');
    const tabContentContainer = document.getElementById('tab-content-container');

    interpretationMethods.forEach((method, index) => {
        const button = document.createElement('button');
        button.className = `tab-button px-4 py-2 rounded-t-lg font-semibold ${index === 0 ? 'active' : ''}`;
        button.textContent = method.name;
        button.dataset.id = method.id;
        tabsContainer.appendChild(button);
    });

    const displayTabContent = (id) => {
        const method = interpretationMethods.find(m => m.id === id);
        tabContentContainer.innerHTML = `
            <div class="p-4">
                <h3 class="font-bold text-xl mb-2">${method.name}</h3>
                <p class="text-gray-600">${method.description}</p>
            </div>
        `;
    };

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            displayTabContent(e.target.dataset.id);
        }
    });
    // Display first tab initially
    if(interpretationMethods.length > 0) {
        displayTabContent(interpretationMethods[0].id); 
    }

    // Accordion for Case Studies
    const caseStudies = [
        { 
            title: '憲法第9条（戦争の放棄）', 
            content: '当初は一切の戦力を放棄したと解釈されていましたが、冷戦下の国際情勢の変化を受け、「自衛のための必要最小限度の実力」は保持できると解釈が変更されました。さらに2014年には、集団的自衛権の限定的な行使を容認する再解釈がなされるなど、時代背景に応じて解釈が大きく変遷しています。'
        },
        { 
            title: '同性婚を巡る解釈（憲法13条、14条、24条）', 
            content: '憲法24条が婚姻を「両性の合意」と規定するため、同性婚は認められないという解釈が主流でした。しかし近年、個人の尊厳や法の下の平等を保障する他の条文（13条、14条）を根拠に、同性カップルに法的保護を与えない現状を「違憲」または「違憲状態」とする司法判断が相次いでいます。これは社会の価値観の変化を司法が反映した結果です。'
        },
        { 
            title: '忘れられる権利（プライバシー権の拡大解釈）', 
            content: 'インターネットの普及により、過去の逮捕歴などが半永久的に閲覧可能になるという新たな問題が生じました。「忘れられる権利」を明記した法律はありませんが、最高裁はプライバシー権を拡大解釈し、「公表されない法的利益が明らかに上回る場合」には検索結果の削除を認めるとの判断基準を示しました。これは技術の進化に法解釈が適応した典型例です。'
        }
    ];
    const accordionContainer = document.getElementById('accordion-container');
    caseStudies.forEach(study => {
        const item = document.createElement('div');
        item.className = 'bg-white rounded-lg shadow-md transition-all duration-300 case-study-card';
        item.innerHTML = `
            <button class="accordion-header w-full text-left p-5 font-bold text-lg flex justify-between items-center">
                <span>${study.title}</span>
                <span class="transform transition-transform duration-300 text-blue-500">＋</span>
            </button>
            <div class="accordion-content px-5 pb-5 text-gray-600">
                <p>${study.content}</p>
            </div>
        `;
        accordionContainer.appendChild(item);
    });

    accordionContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const content = header.nextElementSibling;
        const icon = header.querySelector('span:last-child');
        
        const isOpening = !content.style.maxHeight;

        // Close all other accordions in this container
        header.closest('#accordion-container').querySelectorAll('.accordion-content').forEach(el => {
            el.style.maxHeight = null;
        });
        header.closest('#accordion-container').querySelectorAll('.accordion-header span:last-child').forEach(el => {
            el.textContent = '＋';
            el.style.transform = 'rotate(0deg)';
        });
        
        // Open the clicked one if it was closed
        if (isOpening) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '−';
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
