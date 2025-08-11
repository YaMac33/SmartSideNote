// 先ほどのnewsTicker.jsの内容をコピペしてください
(function() {
    const feeds = [
        { title: "国内総合（NHK）", icon: "📰", url: "https://www3.nhk.or.jp/rss/news/cat0.xml", genreUrl: "https://www3.nhk.or.jp/news/cat0.html" },
        { title: "政治（NHK）", icon: "🏛", url: "https://www3.nhk.or.jp/rss/news/cat4.xml", genreUrl: "https://www3.nhk.or.jp/news/cat4.html" },
        { title: "経済（日経）", icon: "💹", url: "https://www.nikkei.com/rss/headline", genreUrl: "https://www.nikkei.com/" },
        { title: "国際（BBC日本語）", icon: "🌍", url: "https://feeds.bbci.co.uk/japanese/rss.xml", genreUrl: "https://www.bbc.com/japanese" },
        { title: "スポーツ（NHK）", icon: "🏅", url: "https://www3.nhk.or.jp/rss/news/cat7.xml", genreUrl: "https://www3.nhk.or.jp/news/cat7.html" },
        { title: "テクノロジー（ITmedia）", icon: "💻", url: "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml", genreUrl: "https://www.itmedia.co.jp/news/" }
    ];

    const css = `
        .ticker-wrap {
            background: #0078d4;
            color: white;
            overflow: hidden;
            box-sizing: border-box;
            padding: 5px 0;
        }
        .ticker {
            display: flex;
            animation: ticker 30s linear infinite;
        }
        .ticker a.news-item {
            color: white;
            text-decoration: none;
            margin: 0 20px;
            padding: 2px 6px;
            border-radius: 4px;
            white-space: nowrap;
        }
        .ticker a.news-item:hover { text-decoration: underline; }
        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        .new {
            background: #ffcc00;
            color: black;
            font-weight: bold;
        }
        .genre-link {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 2px 8px;
            margin-left: 8px;
            border-radius: 4px;
            font-size: 0.8em;
            text-decoration: none;
        }
        .genre-link:hover {
            background: rgba(255,255,255,0.4);
        }
        @media (max-width: 768px) {
            .ticker {
                animation: none;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
            }
            .ticker a.news-item {
                flex: 0 0 auto;
                margin: 0 10px;
                scroll-snap-align: start;
            }
        }
    `;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    const wrap = document.createElement("div");
    wrap.className = "ticker-wrap";
    wrap.innerHTML = `<div class="ticker" id="news-ticker"></div>`;
    document.body.insertBefore(wrap, document.body.firstChild);

    async function loadRSS(feed) {
        const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
        try {
            const res = await fetch(api);
            const data = await res.json();
            const now = new Date();
            let html = "";
            data.items.slice(0, 3).forEach(item => {
                const pubDate = new Date(item.pubDate);
                const diffHours = (now - pubDate) / (1000 * 60 * 60);
                const isNew = diffHours <= 6;
                html += `<a href="${item.link}" target="_blank" class="news-item ${isNew ? 'new' : ''}">
                            ${feed.icon} [${feed.title}] ${item.title}
                         </a>
                         <a href="${feed.genreUrl}" target="_blank" class="genre-link">もっと見る</a>`;
            });
            document.getElementById("news-ticker").innerHTML += html;
        } catch (e) {
            console.error(e);
        }
    }

    feeds.forEach(loadRSS);
})();
