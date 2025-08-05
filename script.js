function generate() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("output");

  if (!prompt.trim()) {
    output.innerHTML = "<p>入力が空です。</p>";
    return;
  }

  // 仮のダミー応答
  const chatgptResponse = `ChatGPTの回答: ${prompt} に対するサンプル応答`;
  const geminiResponse = `Geminiの回答: ${prompt} に対するサンプル応答`;

  output.innerHTML = `
    <p><strong>${chatgptResponse}</strong></p>
    <p><strong>${geminiResponse}</strong></p>
  `;
}
