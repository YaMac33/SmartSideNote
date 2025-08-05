document.addEventListener('DOMContentLoaded', () => {
    const pillars = [
        {
            id: 'business',
            name: 'ビジネスへの実装',
            icon: '🏢',
            summary: '熱狂から現実へ。企業はROIとリスク管理を重視し、AIを中核的な競争優位の源泉として活用し始めています。',
            content: `
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-2xl font-bold mb-4">実験から事業価値創造へ</h3>
                        <p class="text-gray-600 mb-4">多くの企業は、ROI達成に1年以上かかると認識しており、パイロットプロジェクトから利益を生むソリューションへの移行に苦戦しています。成功の鍵は、AI導入に伴う「ワークフローの根本的な再設計」にあります。</p>
                        <h4 class="font-bold mt-6 mb-2">新たな脅威：シャドーAI</h4>
                        <p class="text-gray-600">従業員がIT部門の許可なく利用する「シャドーAI」が蔓延し、データ漏洩のリスクが急増しています。これにより、企業のAI導入における最大の障壁は「人材不足」から「規制とリスク」へと変化しました。</p>
                    </div>
                    <div>
                        <div class="chart-container" style="height:300px;">
                            <canvas id="useCaseChart"></canvas>
                        </div>
                        <p class="text-sm text-center text-gray-500 mt-2">主要なAIユースケース（機能別）</p>
                    </div>
                </div>
            `
        },
        {
            id: 'tech',
            name: 'テクノロジーの飛躍',
            icon: '🚀',
            summary: 'AIは「生成」から「実行」へ。テキスト、画像、音声を統合するマルチモーダルAIが標準となり、自律的にタスクをこなすエージェントAIが次の主戦場です。',
            content: `
                <h3 class="text-2xl font-bold mb-6 text-center">言語から世界認識へ：次世代AIの萌芽</h3>
                <div class="grid grid-cols-1 md:grid-cols-5 items-center gap-4 text-center font-bold text-gray-700">
                    <div class="p-4 bg-slate-100 rounded-lg">LLM<br><span class="text-sm font-normal">(言語モデル)</span></div>
                    <div class="text-2xl text-blue-500">→</div>
                    <div class="p-4 bg-blue-100 rounded-lg">マルチモーダルAI<br><span class="text-sm font-normal">(テキスト+画像+音声)</span></div>
                    <div class="text-2xl text-blue-500">→</div>
                    <div class="p-4 bg-blue-200 rounded-lg">エージェントAI<br><span class="text-sm font-normal">(自律的タスク実行)</span></div>
                </div>
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold">マルチモーダルAI (LMM)</h4>
                        <p class="text-gray-600 text-sm mt-1">GPT-4oやGeminiのように、多様なデータを統合処理し、より人間らしい対話を実現。複雑な文書の分析や自律システムの訓練に応用されています。</p>
                    </div>
                    <div>
                        <h4 class="font-bold">経済性のパラダイムシフト</h4>
                        <p class="text-gray-600 text-sm mt-1">AIのコストは「学習」から「推論（実行）」へ移行。これにより、より小型で効率的なモデルや、タスクを実行するエージェントAIの開発が加速しています。</p>
                    </div>
                </div>
            `
        },
        {
            id: 'governance',
            name: 'グローバル・ガバナンス',
            icon: '🌍',
            summary: 'ルール形成を巡る地政学。イノベーション重視の米国、リスクベースのEU、国家統制の中国。三極のアプローチが、世界の技術標準を形成します。',
            content: `
                <h3 class="text-2xl font-bold mb-6">AI覇権と規制の地政学：米・EU・中のアプローチ比較</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100">
                                <th class="p-3 font-bold">地域</th>
                                <th class="p-3 font-bold">中核的哲学</th>
                                <th class="p-3 font-bold">ビジネスへの影響</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-3 font-semibold text-blue-700">欧州連合 (EU)</td>
                                <td class="p-3">リスクベース、倫理、人権中心</td>
                                <td class="p-3">高いコンプライアンス負担。信頼性向上による市場優位性の可能性。「ブリュッセル効果」による事実上のグローバル標準化。</td>
                            </tr>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-3 font-semibold text-green-700">米国</td>
                                <td class="p-3">イノベーション主導、競争力重視</td>
                                <td class="p-3">イノベーションの自由度が高い。州ごとの規制のばらつき。同盟国への輸出促進、競合国への規制。</td>
                            </tr>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-3 font-semibold text-red-700">中国</td>
                                <td class="p-3">国家統制、社会の安定</td>
                                <td class="p-3">厳格な国内コンテンツ管理。AI生成コンテンツのラベリング義務。グローバルサウスへの影響力拡大の可能性。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-slate-50 p-3 rounded-md">
                        <h4 class="font-bold">深刻な脅威</h4>
                        <p>ディープフェイクによる偽情報拡散や、自律型致死兵器（LAWS）の開発が、デジタル社会の安全保障を揺るがす喫緊の課題となっています。</p>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-md">
                        <h4 class="font-bold">新たなリスク管理</h4>
                        <p>AIの「幻覚」による損害を補償する「AI幻覚保険」のような新しいリスク管理手法や、企業内での倫理委員会の設置が標準化しつつあります。</p>
                    </div>
                </div>
            `
        }
    ];

    const selectorContainer = document.getElementById('pillar-selector');
    const displayContainer = document.getElementById('content-display');
    let currentChart = null;

    pillars.forEach(pillar => {
        const card = document.createElement('div');
        card.className = 'pillar-card bg-white p-6 rounded-xl shadow-md cursor-pointer';
        card.dataset.id = pillar.id;
        card.innerHTML = `
            <div class="text-4xl mb-3">${pillar.icon}</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">${pillar.name}</h3>
            <p class="text-gray-600 text-sm">${pillar.summary}</p>
        `;
        card.addEventListener('click', () => displayPillar(pillar));
        selectorContainer.appendChild(card);
    });

    function displayPillar(pillar) {
        document.querySelectorAll('.pillar-card').forEach(card => {
            card.classList.toggle('active', card.dataset.id === pillar.id);
        });

        displayContainer.innerHTML = '';
        displayContainer.classList.remove('content-fade-in');
        void displayContainer.offsetWidth; // Trigger reflow
        displayContainer.classList.add('content-fade-in');
        
        displayContainer.innerHTML = pillar.content;

        if (pillar.id === 'business') {
            createUseCaseChart();
        }
    }

    function createUseCaseChart() {
        if (currentChart) {
            currentChart.destroy();
        }
        const ctx = document.getElementById('useCaseChart')?.getContext('2d');
        if (!ctx) return;

        currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['IT運用', '業務', 'マーケティング', '顧客サービス'],
                datasets: [{
                    label: '先進的なAIの取り組みが見られる割合 (%)',
                    data: [28, 11, 10, 8],
                    backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
                    borderColor: '#1e3a8a',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItems) {
                                const item = tooltipItems[0];
                                let label = item.chart.data.labels[item.dataIndex];
                                if (Array.isArray(label)) {
                                    return label.join(' ');
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Smooth scrolling and active state for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = 'trends'; // Default to the first section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) { // 80px offset for sticky header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href contains the current section's id
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
