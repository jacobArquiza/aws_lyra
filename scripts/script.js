BASE_URL = `http://localhost:8080`

async function chat(message, sessionId = "default") {
    const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: message})
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        return chat(message, sessionId)
    }
    let a = await res.json(); 
    console.log(a)
    return a
}

async function start(){
    await fetch(`${BASE_URL}/start`, {
        method: "POST",
    });
}

start();

let initial_response = true;

const response_form = document.querySelector('#lyra-input-form');
const loading = document.querySelector("#loading")


const contextData = sessionStorage.getItem('lyraFormData');
let context_stub = "This is some context into my project: ";

if (contextData) {
    context_stub += contextData;
} else {
    context_stub += "";
}

const initial_response_stub = "This is an overview of my project. Please ask me any question that will help you get the context you need to create the key artifacts. ";
const conciseness_request = "Please ensure your return question is concise, at most two sentences. If it cannot be contained within two sentences, please ask the question in multiple parts accross multiple back-and-forths ."

let questionCount = 1;

response_form.addEventListener('submit', (event)=>{
    event.preventDefault();

    loading.classList.remove('hidden')
    
    const textarea = response_form.querySelector("#input-text-area");
    const userInput = textarea.value.trim();
    let res;

    if(userInput.includes('Admin')){
        document.querySelector('#lyra-question').textContent = "QUESTIONING COMPLETE";
        console.log(data.assistant);
        loading.classList.add("hidden");
        
        const targetPage = './lyra-done.html';
        window.location.href = targetPage;
    }

    if(initial_response){
        res = chat(context_stub + initial_response_stub + conciseness_request + userInput);
        initial_response = false;
    }
    else{
        res = chat(conciseness_request + userInput);
    }

    res.then((data)=>{
        if(!data.done){
            text = data.assistant.replace('*', '');
            questionCount += 1;
            document.querySelector('#lyra-question').textContent = text;
            document.querySelector('#lyra-question-count').textContent = questionCount;
            loading.classList.add("hidden");
        }
        else{
            document.querySelector('#lyra-question').textContent = "QUESTIONING COMPLETE";
            console.log(data.assistant);
            loading.classList.add("hidden");
            
            const targetPage = './lyra-done.html';
            window.location.href = targetPage;
        }
    })

})