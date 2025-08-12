document.addEventListener('DOMContentLoaded', function () {
    const useCaseData = [
        { category: '市民サービス', title: '24時間AIチャットボット', description: 'ごみ分別、子育て支援等の問い合わせに24時間365日対応。多言語対応も進む。', example: '沖縄市, 京都市', icon: '💬' },
        { category: '市民サービス', title: 'AIオンデマンド交通', description: '利用者の予約に応じてAIが最適な相乗りルートを計算し、交通弱者の足を確保。', example: '茨城県高萩市', icon: '🚌' },
        { category: '市民サービス', title: '個別健康アドバイス', description: '健康診断データをAIが分析し、個々の健康状態に応じた予防アドバイスを提供。', example: '兵庫県神戸市', icon: '❤️' },
        { category: '内部業務', title: '会議録の自動作成', description: '議会の音声データをAIが自動でテキスト化・要約し、職員の作業時間を大幅に削減。', example: '茨城県つくば市', icon: '🎤' },
        { category: '内部業務', title: '保育所入所選考の自動化', description: '申込書に基づきAIがポイント計算や順位付けを行い、膨大な書類処理を効率化。', example: '埼玉県さいたま市', icon: '👶' },
        { category: '内部業務', title: '専門文献のAI検索', description: '複雑な戸籍事務等で、関連文献を学習したAIが調査時間を大幅に短縮。', example: '東京都品川区', icon: '📚' },
        { category: 'インフラ・福祉', title: '道路損傷の自動検知', description: '車載カメラの路面画像をAIが分析し、ひび割れ等を自動で判定。予防保全を促進。', example: '千葉県千葉市', icon: '🛣️' },
        { category: 'インフラ・福祉', title: '衛星画像による漏水検知', description: '衛星画像をAIで解析し、広範囲の漏水箇所を効率的に発見。調査コストを削減。', example: '愛知県豊田市', icon: '💧' },
        { category: 'インフラ・福祉', title: 'ケアプラン作成支援', description: '要介護認定データからAIがケアプランを自動作成し、ケアマネージャーの業務を支援。', example: '愛知県豊橋市', icon: '👵' },
    ];

    const challengeData = {
        'セキュリティ': {
            title: 'セキュリティとプライバシー',
            icon: '🔒',
            content: `<p>行政が扱う個人情報や機密情報を外部のAIサービスに入力することへの強い懸念が、活用の最大の障壁となっています。</p>
                      <p>情報漏洩リスクから、多くの自治体は活用を内部の定型業務に限定せざるを得ません。このジレンマを解決するため、インターネットから分離されたLGWAN内でのAI利用や、データが学習に使われない設定（オプトアウト）などが進められています。</p>`
        },
        '公平性': {
            title: '公平性とアルゴリズムバイアス',
            icon: '⚖️',
            content: `<p>AIが学習するデータに社会的な偏見が含まれていると、AIが特定の集団に不利益な判断を下す「アルゴリズムバイアス」が生じる危険があります。</p>
                      <p>例えば、保育所の入所選考や税の滞納者への催告などで、意図せず不公平な結果を生む可能性があります。対策として、データ監査、人間による最終確認（Human-in-the-Loop）、判断プロセスへの透明性確保が求められます。</p>`
        },
        '人材・スキル': {
            title: '人材とリテラシー不足',
            icon: '🧑‍🏫',
            content: `<p>AIプロジェクトを企画・推進できる専門人材と、一般職員のAIリテラシーの両方が不足しています。</p>
                      <p>「どんな業務に使えるかわからない」「効果的な指示（プロンプト）を出せない」といった課題が、導入したツールの形骸化を招いています。全職員向けの基礎教育から専門家育成まで、体系的なリスキリングが急務です。</p>`
        },
        '正確性': {
            title: '正確性とハルシネーション',
            icon: '🎯',
            content: `<p>生成AIが事実に基づかない情報を生成する「ハルシネーション」は、情報の正確性が絶対的に求められる行政業務において深刻なリスクです。</p>
                      <p>市民への誤った案内は行政への信頼を損なうため、現状では「職員によるファクトチェック」が必須となり、完全な自動化を妨げています。信頼できる内部データを参照させるRAG技術などが対策として期待されます。</p>`
        },
        '組織・運用': {
            title: '組織・運用とBPRの遅れ',
            icon: '🏢',
            content: `<p>AIを既存の業務フローにただ追加するだけでは、真の変革は生まれません。AIの能力を最大限に引き出すには、業務プロセスそのものの再設計（BPR）が不可欠です。</p>
                      <p>しかし、紙文化や縦割り組織を前提とした長年の慣行を変えることは容易ではありません。また、導入効果を測る明確な指標（KPI）の設定が難しく、予算確保に苦慮するケースも多く見られます。</p>`
        }
    };
    
    const strategyData = {
        governance: {
            title: 'ガバナンス：信頼と責任の制度設計',
            points: [
                'リスクレベルに応じた要件を定める標準「AIガバナンス・フレームワーク」を導入する。',
                '各組織のAI統括責任者（CAIO）の役割を強化し、全国的なネットワークを構築する。',
                '仕様固定型ではない、柔軟な「アジャイル調達」を導入し、ベンダーと共創する。',
            ]
        },
        data: {
            title: 'データと技術：AI活用のためのデジタル基盤整備',
            points: [
                '自治体情報システムの標準化を加速させ、「行政データ品質管理基準」を策定する。',
                'ハルシネーション対策として、行政の公式知識を構造化した「行政ナレッジグラフ」を構築する。',
                'プライバシー保護技術（PETs）の研究開発と社会実装を推進し、データ活用のジレンマを解消する。',
            ]
        },
        talent: {
            title: '人材：AI時代に対応する公務員の育成',
            points: [
                '全職員がAIの基礎を学ぶ「AIパスポート」制度を導入し、組織全体のAIリテラシーを底上げする。',
                '福祉、土木など職種別の「AI活用スキルマップ」を全国展開し、専門分野に特化した研修を開発する。',
                '専門家を中小自治体に派遣する「デジタル人材レンタル移籍」制度を創設する。',
            ]
        },
        citizen: {
            title: '市民エンゲージメント：共創による社会受容性の確保',
            points: [
                'AIの重要分野への導入前に、無作為抽出された市民による「市民会議」を開催し、倫理的課題を議論する。',
                'AIが判断に関与する場合、その事実と根拠の概要を平易な言葉で説明することを義務付ける。',
                '行政のAI活用に関する情報を一元的に公開し、市民が意見を表明できる対話プラットフォームを常設する。',
            ]
        }
    };

    const internationalData = {
        labels: ['日本', '米国', '英国', 'シンガポール', 'EU'],
        datasets: [{
            label: '戦略の重点分野',
            data: [3, 4, 4, 5, 3], 
            backgroundColor: [
                'rgba(239, 68, 68, 0.6)',
                'rgba(59, 130, 246, 0.6)',
                'rgba(234, 179, 8, 0.6)',
                'rgba(34, 197, 94, 0.6)',
                'rgba(139, 92, 246, 0.6)'
            ],
            borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(234, 179, 8, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(139, 92, 246, 1)'
            ],
            borderWidth: 1
        }],
        details: [
            'ソフトローによるリスク管理と産業競争力の両立を目指す。デジタル庁主導でセキュアな利用環境を整備。',
            '各省庁の自主性を尊重しつつ、AIユースケースの目録化や影響評価を義務付け、リスク管理を徹底。',
            'AIを国家戦略と位置づけ、経済成長と公共サービス改革を推進。国内の計算資源インフラへの大規模投資を計画。',
            '国内AI技術者の数を3倍にする目標を掲げるなど人材育成に注力。実践的なガバナンス検証ツール「AI Verify」を開発。',
            '法的拘束力のある「AI法」でリスクベースの階層的規制を導入。基本的人権の保護を最優先し、グローバルスタンダードを目指す。'
        ]
    };

    // --- Render Functions ---

    function renderUseCaseGallery(filter = 'all') {
        const gallery = document.getElementById('use-case-gallery');
        gallery.innerHTML = '';
        const filteredData = filter === 'all' ? useCaseData : useCaseData.filter(item => item.category === filter);
        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'use-case-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col';
            card.innerHTML = `
                <div class="flex-shrink-0 text-4xl mb-4">${item.icon}</div>
                <h5 class="font-bold text-lg mb-2 text-gray-800">${item.title}</h5>
                <p class="text-gray-600 text-sm flex-grow">${item.description}</p>
                <p class="text-xs text-gray-400 mt-4">導入例: ${item.example}</p>
            `;
            gallery.appendChild(card);
        });
    }

    function renderStrategyContent(tabKey) {
        const data = strategyData[tabKey];
        const strategyContent = document.getElementById('strategy-content');
        strategyContent.innerHTML = `
            <h4 class="text-xl font-bold mb-4 text-gray-800">${data.title}</h4>
            <ul class="space-y-3 list-disc list-inside text-gray-700">
                ${data.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
        document.querySelectorAll('.strategy-tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabKey;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('bg-white', isActive);
            btn.classList.toggle('shadow-sm', isActive);
            btn.classList.toggle('bg-gray-200', !isActive);
        });
    }

    // --- Chart Initializations ---

    const aiTypeCtx = document.getElementById('aiTypeChart').getContext('2d');
    new Chart(aiTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['定型業務自動化 (RPA)', '文字認識 (AI-OCR)', '音声認識', '生成AI (実験的)', 'その他'],
            datasets: [{
                label: '導入技術の内訳',
                data: [40, 25, 15, 15, 5],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}%`
                    }
                }
            }
        }
    });

    const internationalCtx = document.getElementById('internationalComparisonChart').getContext('2d');
    new Chart(internationalCtx, {
        type: 'bar',
        data: internationalData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false, beginAtZero: true },
                y: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => internationalData.details[context.dataIndex]
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    alert(internationalData.details[index]);
                }
            }
        }
    });

    // --- Dynamic Elements & Event Listeners ---

    // Challenge Nodes
    const challengeNodesContainer = document.getElementById('challenge-nodes-container');
    const challenges = Object.keys(challengeData);
    const angleStep = (2 * Math.PI) / challenges.length;
    const radius = window.innerWidth < 768 ? 150 : 200;
    challenges.forEach((key, index) => {
        const angle = angleStep * index - (Math.PI / 2); // Start from top
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const node = document.createElement('div');
        node.className = 'challenge-node absolute bg-white p-4 rounded-lg shadow-lg text-center w-32';
        node.style.transform = `translate(${x}px, ${y}px)`;
        node.dataset.key = key;
        node.innerHTML = `<div class="text-3xl mb-2">${challengeData[key].icon}</div><span class="font-semibold text-sm">${challengeData[key].title}</span>`;
        challengeNodesContainer.appendChild(node);
    });
    
    // Modal Logic
    const modal = document.getElementById('challenge-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function openModal(key) {
        const data = challengeData[key];
        modalTitle.innerText = data.title;
        modalContent.innerHTML = data.content;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('div > div').classList.remove('scale-95');
    }

    function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('div > div').classList.add('scale-95');
    }

    challengeNodesContainer.addEventListener('click', (e) => {
        const node = e.target.closest('.challenge-node');
        if (node) openModal(node.dataset.key);
    });
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            renderUseCaseGallery(button.dataset.filter);
        });
    });

    // Strategy Tabs
    document.querySelectorAll('.strategy-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => renderStrategyContent(btn.dataset.tab));
    });

    // Nav-link Scroll Spy
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // Offset for sticky header
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });

    // --- Initial Renders ---
    renderUseCaseGallery('all');
    renderStrategyContent('governance');
});
