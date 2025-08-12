const username = "YaMac33";
const repoName = "ai-comparison-test-site";

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
