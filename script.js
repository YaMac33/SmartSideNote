const username = "YaMac33";
const repoName = "ai-comparison-test-site";

const projectDetails = {
    "car-sharing": { title: "カーシェアリング料金比較", description: "複数のカーシェアリングサービスの料金をシミュレーション・比較するサイトです。" },
    "owarai": { title: "日本漫才の「ウケる」構造分析", description: "日本漫才の「ウケる」構造を分析したページです。" },
    "administration": { title: "AI駆動型ガバナンス", description: "日本の行政セクターにおけるAI活用の現状と未来戦略。" }
};

const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/`;
const container = document.getElementById("project-list-container");
const searchBox = document.getElementById("search-box");
const themeToggle = document.getElementById("theme-toggle");

let allProjects = [];

init();

async function init() {
    showLoader();
    try {
        const data = await fetchData(apiUrl);
        allProjects = extractProjects(data);
        renderProjects(allProjects);
    } catch (err) {
        console.error("API取得失敗:", err);
        // フォールバック表示
        allProjects = Object.keys(projectDetails).map(name => ({ name, ...projectDetails[name] }));
        renderProjects(allProjects);
    }
}

async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("GitHub APIエラー");
    return res.json();
}

function extractProjects(data) {
    return data
        .filter(item => item.type === "dir" && !item.name.startsWith("."))
        .map(dir => ({
            name: dir.name,
            ...(projectDetails[dir.name] || { title: dir.name, description: "説明文未登録" })
        }));
}

function renderProjects(projects) {
    container.innerHTML = "";
    if (projects.length === 0) return showMessage("該当するページが見つかりません。");

    projects.forEach((proj, index) => {
        const card = document.createElement("a");
        card.href = `./${proj.name}/`;
        card.className = "project-card fade-in";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `<h2>${proj.title}</h2><p>${proj.description}</p>`;
        container.appendChild(card);
    });
}

searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    renderProjects(allProjects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    ));
});

themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    html.setAttribute("data-theme", html.getAttribute("data-theme") === "light" ? "dark" : "light");
    html.classList.add("theme-transition");
    setTimeout(() => html.classList.remove("theme-transition"), 300);
});

function showLoader() {
    container.innerHTML = `<div class="loader"></div>`;
}
function showMessage(msg) {
    container.innerHTML = `<p style="text-align:center;">${msg}</p>`;
}
