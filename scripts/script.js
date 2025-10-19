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

initial_response = true;

response_form = document.querySelector('#lyra-input-form');

const initial_response_stub = "This is an overview of my project. Please ask me any question that will help you get the context you need to create the key artifacts. ";
const conciseness_request = "Please ensure your return question is concise, at most two sentences. If it cannot be contained within two sentences, please ask the question in multiple parts accross multiple back-and-forths ."

response_form.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const textarea = response_form.querySelector("#input-text-area");
    const userInput = textarea.value.trim();
    let res;

    if(initial_response){
        res = chat(initial_response_stub + conciseness_request + userInput);
        initial_response = false;
    }
    else{
        res = chat(conciseness_request + userInput);
    }

    res.then((data)=>{
        if(!data.done){
            document.querySelector('#lyra-question').textContent = data.assistant;
        }
        else{
            document.querySelector('#lyra-question').textContent = "DONE";
            console.log(data.assistant);
        }
    })

})

/*

Initally what is presented to the user: Lyra wants to know about your project. Tell her everything about it!

/*

/*
{
    "assistant": "Hello! How can I assist you with your project management tasks today? If you have a specific request or need help with a project, please let me know.",
    "session_id": "default"
}
 
*/