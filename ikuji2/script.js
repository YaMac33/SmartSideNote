// 折りたたみ（card のタイトルクリックで開閉）
document.querySelectorAll('.foldable .card-title').forEach(title => {
  title.addEventListener('click', () => {
    const card = title.closest('.foldable');
    card.classList.toggle('open');
  });
});

// トップへスムーズスクロール（目次リンク）
document.querySelectorAll('.toc a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// ダークモード切替（永続化はローカルストレージに保存）
const themeBtn = document.getElementById('toggleTheme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('prefers-dark', document.body.classList.contains('dark'));
  });
  // 初期化
  if (localStorage.getItem('prefers-dark') === 'true') document.body.classList.add('dark');
}
