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

const intial_response_stub = "This is an overview of my project. Please ask me any question that will help you get the context you need to create the key artifacts. ";

response_form.addEventListener('submit', (event)=>{


    event.preventDefault();
    
    const textarea = form.querySelector("#input-text-area");
    const userInput = textarea.value.trim();
    let res;

    if(initial_response){
        res = chat(initial_response_stub + userInput);
        initial_response = false;
    }
    else{
        res = chat(userInput);
    }

    res.then((data)=>{
        console.log(JSON.stringify(data));
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