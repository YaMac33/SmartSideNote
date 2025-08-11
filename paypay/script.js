// script.js - シンプルなインタラクション（デモ用）
// 保存後、index.htmlと同じフォルダに置いてください。

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('simulatePay');
  const result = document.getElementById('payResult');
  const sources = document.getElementById('sourceList');

  // デモ用の「決済シミュレーション」
  btn.addEventListener('click', () => {
    result.textContent = '支払いを処理しています…';
    btn.disabled = true;
    setTimeout(() => {
      result.textContent = '決済完了！（デモ）';
      btn.disabled = false;
    }, 900);
  });

  // 参考ソースを動的に表示（web.runで取得した参照IDとタイトル）
  const sourceItems = [
    { title: 'PayPay 公式サイト（サービス紹介・はじめる）', ref: '公式' },
    { title: 'PayPay ヘルプ（加盟店向け：QR/支払い方式の説明）', ref: 'ヘルプ' },
    { title: 'PayPay - Wikipedia（企業概要・歴史）', ref: 'Wikipedia' }
  ];

  sourceItems.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s.title + ' — 最新情報は公式サイトを確認してください。';
    sources.appendChild(li);
  });
});
