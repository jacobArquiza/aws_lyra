BASE_URL = `http://localhost:8080`

async function chat(message, sessionId = "default") {
    const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: message})
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    let a = await res.json(); // { assistant, session_id, thinking?, tools?, warning? }
    console.log(a)
    return a
}

res = chat("Hello AI!");
print(res)
 