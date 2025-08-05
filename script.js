document.addEventListener('DOMContentLoaded', () => {
    const archetypes = [
        {
            id: 'loop',
            name: '反復ループ型',
            icon: '🔄',
            color: 'blue',
            title: '反復の美学：喜劇的エンジンとしてのループと定型',
            description: '厳格な定型構造を反復し、その予測可能性と裏切りで笑いを生むスタイル。観客はネタの「ルール」を学習し、ゲームに参加するような感覚で楽しむ。',
            case_studies: [
                { name: 'ミルクボーイ', detail: '「肯定→否定」の厳格な4段階ループ。駒場が提示する情報に対し、内海が断定と否定を繰り返す。観客は次にどんな情報が出るかを予測し、内海の偏見に満ちた理由付けに笑う。' },
                { name: 'ナイツ', detail: '「ヤホー漫才」に代表される言い間違いの定型。塙が時事ネタの中で意図的に単語を言い間違え、土屋が淡々と訂正し続ける。構造の単純さが、高度な言葉遊びの面白さを際立たせる。' }
            ],
            chart_data: {
                labels: ['構造の予測性', 'キャラクター依存度', '展開の意外性', '観客との共感', 'ジョークの密度'],
                data: [5, 2, 3, 4, 4]
            }
        },
        {
            id: 'character',
            name: 'キャラクター・メタ型',
            icon: '🎭',
            color: 'purple',
            title: '「自己」の物語：キャラクター主導型とメタ喜劇',
            description: '演者自身のパブリックイメージや、漫才という行為そのものを笑いの源泉とするスタイル。キャラクターの「ズレ」や「ネガティブさ」が物語を駆動する。',
            case_studies: [
                { name: 'オードリー', detail: '若林が振るテーマに対し、春日が常に「ズレた」反応を返す。若林のツッコミは、その不適切さ自体を攻撃する。二人の関係性や、漫才が成立しないこと自体が笑いになるメタ構造。' },
                { name: 'ブラックマヨネーズ', detail: '吉田の根深いネガティブさと被害妄想が、日常的な話題を異常な持論へと展開させる。小杉のツッコミは、観客を「現実」に引き戻す錨として機能し、吉田の特異性を安全な笑いに変える。' }
            ],
            chart_data: {
                labels: ['構造の予測性', 'キャラクター依存度', '展開の意外性', '観客との共感', 'ジョークの密度'],
                data: [2, 5, 4, 5, 3]
            }
        },
        {
            id: 'escalation',
            name: '不条理エスカレーション型',
            icon: '📈',
            color: 'red',
            title: 'エスカレーションの力学：日常から非日常へ',
            description: 'ごく普通の日常的な設定から始まり、ボケの無能さや妄想によって状況が徐々に、しかし確実に破壊され、混沌がエスカレートしていくコント漫才。',
            case_studies: [
                { name: 'サンドウィッチマン', detail: 'ピザの注文など、ありふれた状況で富澤が理解不能なボケを連発。伊達の「ちょっと何言ってるかわかんない」というツッコミは、観客の困惑を代弁し、強い共感を生む。' },
                { name: 'チュートリアル', detail: '徳井が日常的な題材から壮大で不適切な妄想を繰り広げ、福田が必死に現実に引き戻そうと抵抗する。観客は徳井の妄想の共犯者となり、背徳的な笑いを楽しむ。' }
            ],
            chart_data: {
                labels: ['構造の予測性', 'キャラクター依存度', '展開の意外性', '観客との共感', 'ジョークの密度'],
                data: [3, 4, 5, 5, 3]
            }
        },
        {
            id: 'density',
            name: '高密度弾幕型',
            icon: '💥',
            color: 'orange',
            title: 'ペースという力：高密度・高速漫才',
            description: '物語の複雑さよりも、圧倒的なスピードとジョークの量で観客を制圧するスタイル。観客は考える暇なく、パフォーマンスのエネルギーに飲み込まれる。',
            case_studies: [
                { name: 'NON STYLE', detail: '単純な設定の中で、ボケの石田が息つく暇も与えずボケを連射する。井上の高速ツッコミがそのリズムを支え、パフォーマンス全体が 하나의見世物となる。' }
            ],
            chart_data: {
                labels: ['構造の予測性', 'キャラクター依存度', '展開の意外性', '観客との共感', 'ジョークの密度'],
                data: [2, 3, 4, 3, 5]
            }
        }
    ];

    const selectorContainer = document.getElementById('archetype-selector');
    const displayContainer = document.getElementById('content-display');
    let currentChart = null;

    // Create archetype selector cards
    archetypes.forEach(archetype => {
        const card = document.createElement('div');
        card.className = `archetype-card bg-white p-4 rounded-lg shadow-md cursor-pointer border-4 border-transparent text-center`;
        card.dataset.id = archetype.id;
        card.innerHTML = `
            <div class="text-4xl mb-2">${archetype.icon}</div>
            <h3 class="font-bold text-gray-800">${archetype.name}</h3>
        `;
        card.addEventListener('click', () => displayArchetype(archetype));
        selectorContainer.appendChild(card);
    });

    function displayArchetype(archetype) {
        // Update active card style
        document.querySelectorAll('.archetype-card').forEach(card => {
            card.classList.toggle('active', card.dataset.id === archetype.id);
        });

        displayContainer.innerHTML = ''; // Clear previous content
        displayContainer.classList.remove('content-fade-in');
        void displayContainer.offsetWidth; // Trigger reflow
        displayContainer.classList.add('content-fade-in');

        const content = `
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div class="lg:col-span-3">
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">${archetype.title}</h2>
                    <p class="text-gray-600 mb-6">${archetype.description}</p>
                    <h3 class="text-xl font-bold text-gray-700 mt-8 mb-4">ケーススタディ</h3>
                    <div class="space-y-4">
                        ${archetype.case_studies.map(cs => `
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-bold text-lg text-gray-800">${cs.name}</h4>
                                <p class="text-gray-600 mt-1">${cs.detail}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="lg:col-span-2">
                    <div class="chart-container">
                        <canvas id="archetypeChart"></canvas>
                    </div>
                </div>
            </div>
        `;
        displayContainer.innerHTML = content;
        createRadarChart(archetype.chart_data);
    }

    function createRadarChart(chartData) {
        if (currentChart) {
            currentChart.destroy();
        }
        const ctx = document.getElementById('archetypeChart').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: '特性分析',
                    data: chartData.data,
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                         ticks: {
                            stepSize: 1
                        }
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
});
