const username = "YaMac33";
const repoName = "ai-comparison-test-site";

const projectDetails = {
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

const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/`;
const container = document.getElementById("project-list-container");
const searchBox = document.getElementById("search-box");
const themeToggle = document.getElementById("theme-toggle");

let allProjects = [];

// 初期化
init();

async function init() {
    showLoader();
    try {
        const data = await fetchData(apiUrl);
        allProjects = extractProjects(data);
        renderProjects(allProjects);
    } catch (err) {
        console.error(err);
        showError("エラーが発生しました。一覧を読み込めません。");
    }
}

// APIからデータ取得
async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("リポジトリ情報の取得に失敗しました。");
    return res.json();
}

// ディレクトリ情報からプロジェクト配列生成
function extractProjects(data) {
    const dirs = data.filter(item => item.type === "dir" && !item.name.startsWith("."));
    return dirs.map(dir => {
        const details = projectDetails[dir.name] || {
            title: dir.name,
            description: "説明文がまだ登録されていません。"
        };
        return { name: dir.name, ...details };
    });
}

// カード描画
function renderProjects(projects) {
    container.innerHTML = "";
    if (projects.length === 0) {
        showMessage("該当するページが見つかりません。");
        return;
    }
    projects.forEach((proj, index) => {
        const card = document.createElement("a");
        card.href = `./${proj.name}/`;
        card.className = "project-card fade-in";
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <h2>${proj.title}</h2>
            <p>${proj.description}</p>
        `;
        container.appendChild(card);
    });
}

// 検索機能
searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    const filtered = allProjects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );
    renderProjects(filtered);
});

// テーマ切替（アニメーション付き）
themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
    html.classList.add("theme-transition");
    setTimeout(() => html.classList.remove("theme-transition"), 300);
});

// 共通UI関数
function showLoader() {
    container.innerHTML = `<div class="loader"></div>`;
}
function showError(msg) {
    container.innerHTML = `<p style="text-align:center; color:red;">${msg}</p>`;
}
function showMessage(msg) {
    container.innerHTML = `<p style="text-align:center;">${msg}</p>`;
}
