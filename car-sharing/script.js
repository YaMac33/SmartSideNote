document.addEventListener('DOMContentLoaded', function () {
    const marketData = {
        labels: ['2022年3月', '2023年3月', '2024年', '2025年6月'],
        datasets: [
            {
                label: '車両台数 (台)',
                data: [51745, 56178, 67000, 66059],
                backgroundColor: 'rgba(0, 128, 128, 0.6)',
                borderColor: 'rgba(0, 128, 128, 1)',
                borderWidth: 1,
                yAxisID: 'y'
            },
            {
                label: 'ステーション数 (箇所)',
                data: [20371, null, null, 30541],
                backgroundColor: 'rgba(173, 216, 230, 0.6)',
                borderColor: 'rgba(173, 216, 230, 1)',
                borderWidth: 1,
                yAxisID: 'y1'
            }
        ]
    };

    const marketGrowthCtx = document.getElementById('marketGrowthChart').getContext('2d');
    new Chart(marketGrowthCtx, {
        type: 'bar',
        data: marketData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '車両台数'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'ステーション数'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('ja-JP').format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    const segments = {
        personal: {
            title: '個人利用のシーン',
            details: '<ul><li class="mb-2"><strong>公共交通の補完:</strong> 最寄り駅から自宅までのラストワンマイル移動。</li><li class="mb-2"><strong>片道完結の移動:</strong> 荷物が多い日の買い物、飲み会後の帰宅（特に終電後）。</li><li><strong>柔軟な移動:</strong> 所有にこだわらず、合理的で自由な移動を求める若年層。</li></ul>'
        },
        corporate: {
            title: '法人利用のシーン',
            details: '<ul><li class="mb-2"><strong>営業・外回り:</strong> 訪問先への直行や、複数顧客を回った後の直帰で業務を効率化。</li><li class="mb-2"><strong>出張:</strong> 空港や新幹線駅から目的地へ、タクシーより経済的で柔軟な移動。</li><li><strong>コスト削減:</strong> 交通費と移動時間を削減し、生産性を向上。</li></ul>'
        },
        tourist: {
            title: '観光利用のシーン',
            details: '<ul><li class="mb-2"><strong>二次交通手段:</strong> 駅や空港から点在する観光スポットへの自由な移動。</li><li class="mb-2"><strong>行動範囲の拡大:</strong> 時間的制約を減らし、より充実した観光体験を実現。</li><li><strong>地域経済の活性化:</strong> 観光客の満足度向上と消費機会の創出に貢献。</li></ul>'
        }
    };

    const segmentBtns = document.querySelectorAll('.segment-btn');
    const detailsContainer = document.getElementById('segment-details');
    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            segmentBtns.forEach(b => b.classList.remove('bg-[#008080]', 'text-white', 'border-teal-500'));
            btn.classList.add('bg-[#008080]', 'text-white', 'border-teal-500');
            
            const segmentData = segments[btn.dataset.segment];
            detailsContainer.innerHTML = `<div class="text-left"><h4 class="font-bold text-lg mb-3">${segmentData.title}</h4><div class="text-gray-700">${segmentData.details}</div></div>`;
        });
    });

    const competitorRows = document.querySelectorAll('.competitor-row');
    competitorRows.forEach(row => {
        row.addEventListener('click', () => {
            document.querySelectorAll('.competitor-row').forEach(r => r.style.backgroundColor = '');
            const competitor = row.closest('tbody').querySelectorAll(`tr[data-competitor]`); // Simplified selector logic might need adjustment if structure is complex
            // A more robust way might be needed if competitors are not grouped.
            // Assuming for now all rows for one competitor are consecutive.
            // Let's refine this to select all rows with the same data-competitor attribute.
            const competitorName = row.dataset.competitor;
             document.querySelectorAll(`.competitor-row[data-competitor="${competitorName}"]`).forEach(r => {
                 r.style.backgroundColor = '#E0F2F1'; // A light teal color
             });
        });
    });

    const revenueTab = document.getElementById('revenue-tab');
    const opsTab = document.getElementById('ops-tab');
    const revenueContent = document.getElementById('revenue-content');
    const opsContent = document.getElementById('ops-content');

    revenueTab.addEventListener('click', () => {
        revenueTab.classList.add('active');
        opsTab.classList.remove('active');
        revenueContent.classList.remove('hidden');
        opsContent.classList.add('hidden');
    });

    opsTab.addEventListener('click', () => {
        opsTab.classList.add('active');
        revenueTab.classList.remove('active');
        opsContent.classList.remove('hidden');
        revenueContent.classList.add('hidden');
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 70) { // Adjusted offset for sticky header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
