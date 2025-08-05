document.addEventListener('DOMContentLoaded', function() {
    // ページが読み込まれたら実行

    // 全てのプロジェクトカード要素を取得
    const projectCards = document.querySelectorAll('.project-card');

    // カードを一枚ずつ、少し遅らせて表示させる
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 150); // 0.15秒ずつ遅延させる
    });
});

