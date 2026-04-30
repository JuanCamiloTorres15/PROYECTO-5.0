async function sendMessage() {
  const input = document.getElementById("chat-input");
  const box = document.getElementById("chat-box");

  const msg = input.value.trim();
  if (!msg) return;

  box.innerHTML += `<div class="user"><b>Tú:</b> ${msg}</div>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    box.innerHTML += `<div class="bot"><b>Bot:</b> ${data.response}</div>`;
    box.scrollTop = box.scrollHeight;

  } catch (e) {
    box.innerHTML += `<div class="bot">Error de conexión</div>`;
  }
}
