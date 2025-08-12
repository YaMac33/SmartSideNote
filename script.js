var username = "YaMac33";
var repoName = "ai-comparison-test-site";

var projectDetails = {
    "car-sharing": { title: "カーシェアリング料金比較" },
    "owarai": { title: "日本漫才の「ウケる」分析" },
    "ai-tools": { title: "AIツール比較" }
};

document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("project-list-container");

    for (var folder in projectDetails) {
        var project = projectDetails[folder];
        var projectLink = document.createElement("a");
        projectLink.href = `https://${username}.github.io/${repoName}/${folder}/`;
        projectLink.className = "project-card";

        var title = document.createElement("h3");
        title.textContent = project.title;

        projectLink.appendChild(title);
        container.appendChild(projectLink);
    }
});
