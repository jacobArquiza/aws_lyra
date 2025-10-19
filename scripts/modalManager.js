start = document.querySelector('#start-planning-with-lyra')
getStartedModal = document.querySelector('#get_started_modal')
submit = document.querySelector('#start-modal-submit')
const form = document.querySelector('#start-form');

start.addEventListener('click', ()=>{
    getStartedModal.showModal()
});

console.log(start)
console.log(getStartedModal)
console.log(submit)
console.log(form)

submit.addEventListener('click', function(event) {
    console.log("POOOO")
    event.preventDefault();

    const formData = new FormData(form);
    
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (key.endsWith('[]')) {
            const cleanKey = key.slice(0, -2); 
            if (!data[cleanKey]) {
                data[cleanKey] = [];
            }
            data[cleanKey].push(value);
        } else {
            data[key] = value;
        }
    }
    try {
        // Convert the JavaScript object into a JSON string
        const jsonContext = JSON.stringify(data);
        
        // Store the string in sessionStorage
        sessionStorage.setItem('lyraFormData', jsonContext);
        
        console.log('--- Context Saved to sessionStorage ---');
        console.log(data); // Also log for immediate confirmation
        const targetPage = 'html/lyra-build.html';
            window.location.href = targetPage;
    } catch (e) {
        console.error("Failed to save data to sessionStorage:", e);
    }
});


