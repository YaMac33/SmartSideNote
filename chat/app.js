// WebSocketサーバーに接続
// 'localhost:8765'の部分はサーバーのアドレスに合わせて変更してください
const socket = new WebSocket('ws://localhost:8765');

// DOM要素の取得
const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('chat-message-input');
const messageSubmit = document.getElementById('chat-message-submit');

// サーバーからメッセージを受信したときの処理
socket.onmessage = function(event) {
    // 受信したメッセージを画面に表示
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = event.data;
    chatLog.prepend(messageDiv); // 新しいメッセージをログの先頭（下部）に追加
};

// 送信ボタンがクリックされたときの処理
messageSubmit.addEventListener('click', function() {
    sendMessage();
});

// Enterキーが押されたときの処理
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// メッセージを送信する関数
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        // WebSocketサーバーにメッセージを送信
        socket.send(message);
        // 入力欄を空にする
        messageInput.value = '';
    }
}

// 接続が開いたときの処理
socket.onopen = function() {
    console.log('サーバーに接続しました。');
};

// 接続が閉じたときの処理
socket.onclose = function() {
    console.log('サーバーから切断されました。');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'サーバーとの接続が切れました。';
    chatLog.prepend(messageDiv);
};

// エラーが発生したときの処理
socket.onerror = function(error) {
    console.error('WebSocketエラー: ', error);
};
