BASE_URL = `https:/0e8240d126c3.ngrok-free.app/`

async function chat(message, sessionId = "default") {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json(); // { assistant, session_id, thinking?, tools?, warning? }
}

res = chat("Hello AI!");
console.log(JSON.stringify(res));
 