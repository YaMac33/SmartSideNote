var username = "YaMac33";
var repoName = "ai-comparison-test-site";

var projectDetails = {
    "car-sharing": { title: "カーシェアリング料金比較", description: "複数のカーシェアリングサービスの料金をシミュレーション・比較するサイトです。" },
    "owarai": { title: "日本漫才の「ウケる」構造分析", description: "日本漫才の「ウケる」構造を分析したページです。" },
    "administration": { title: "AI駆動型ガバナンス", description: "日本の行政セクターにおけるAI活用の現状、課題、そして未来への戦略的青写真を探るページです。" },
    "AI": { title: "人工知能の未来", description: "産業、社会、ガバナンスの変革について調査したページです。" },
    "civil-servant": { title: "「副業」から、地域を支える『複業』へ。", description: "公務員の「副業」について調査したページです。" },
    "law": { title: "生ける法：解釈の探求", description: "なぜ同じ法律で、解釈が分かれるのかについて調査したページです。" },
    "national-and-local": { title: "司法が描く国と地方の境界線", description: "国と地方が対立する時、誰が最終判断を下すのかについて調査したページです。" },
    "autonomous-enterprise": { title: "自律的企業(Autonomous Enterprise)", description: "次世代のビジネスモデルと組織構造について解説します。" },
    "document": { title: "AI活用ドキュメント解説", description: "メール送信フォームをWebサイトに設置する方法" },
    "RSS": { title: "RSS取得からのGAS自動化", description: "Google One AI Premiumを活用したGoogle Apps Script自動化について解説します。" },
    "law-and-AI": { title: "アルゴリズムの天秤", description: "AIは法曹界の仕事をどう変え、司法の未来をどう描くか？" },
    "CloudStorage": { title: "iCloud+ と Google One AI Pro 活用", description: "iCloud+ と Google One AI Pro の最適な使い分け戦略" }
};

var apiUrl = 'https://api.github.com/repos/' + username + '/' + repoName + '/contents/';
var container = document.getElementById('project-list-container');
var searchBox = document.getElementById('search-box');

let allProjects = [];

fetch(apiUrl)
    .then(response => {
        if (!response.ok) throw new Error('リポジトリ情報の取得に失敗しました。');
        return response.json();
    })
    .then(data => {
        container.innerHTML = ''; 
        var dirs = data.filter(item => item.type === 'dir' && !item.name.startsWith('.'));
        if (dirs.length === 0) {
            container.innerHTML = '<p>プロジェクトが見つかりませんでした。</p>';
            return;
        }

        allProjects = dirs.map(dir => {
            var details = projectDetails[dir.name] || {
                title: dir.name,
                description: "説明文がまだ登録されていません。"
            };
            return {
                name: dir.name,
                title: details.title,
                description: details.description
            };
        });

        renderProjects(allProjects);
    })
    .catch(error => {
        console.error('エラー:', error);
        container.innerHTML = '<p style="text-align: center; color: red;">エラーが発生しました。一覧を読み込めません。</p>';
    });

function renderProjects(projects) {
    container.innerHTML = '';
    if (projects.length === 0) {
        container.innerHTML = '<p>該当するページが見つかりません。</p>';
        return;
    }
    projects.forEach(proj => {
        var card = document.createElement('a');
        card.href = './' + proj.name + '/';
        card.className = 'project-card';

        var title = document.createElement('h2');
        title.textContent = proj.title;

        var description = document.createElement('p');
        description.textContent = proj.description;

        card.appendChild(title);
        card.appendChild(description);
        container.appendChild(card);
    });
}

// 検索機能
searchBox.addEventListener('input', () => {
    var query = searchBox.value.toLowerCase();
    var filtered = allProjects.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );
    renderProjects(filtered);
});

// ダークモード切替
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
