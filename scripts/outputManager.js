const GANTT_CONTAINER = "#sprint-schedule-container"

regenerate = document.querySelector('#regenerate')
pmSpecButton = document.querySelector('#pm-spec-open')
sprintScheduleButton= document.querySelector('#sprint-schedule-open')

console.log(regenerate)
console.log(pmSpecButton)
console.log(sprintScheduleButton)

pmSpecModal = document.querySelector('#pm-spec-modal')
sprintScheduleModal= document.querySelector('#sprint-schedule-modal')

pmSpecButton.addEventListener('click', ()=>{
    pmSpecModal.showModal();
});
sprintScheduleButton.addEventListener('click', ()=>{
    renderSchedule(test);
    sprintScheduleModal.showModal();
});
regenerate.addEventListener('click', ()=>{
    const targetPage = './lyra-build.html';
    window.location.href = targetPage;
})

const copyButton = document.querySelector('#copy');
const documentContainer = document.querySelector("#document-container")

sessionStorage.setItem('pmSpecHTML', `
    <h1 style="color: #232f3e; border-bottom: 2px solid #febd69; padding-bottom: 5px;">
                    &#10024; Project Specification: AI-Powered E-Commerce API
                </h1>

                <h2>1. Executive Summary & Project Goal</h2>
                <p>This project aims to deliver a complete, secure, and scalable **serverless REST API** backend for a modern e-commerce platform. The system will be deployed entirely on AWS using **CodeCatalyst** for continuous delivery.</p>

                <p><b>Target Audience:</b> Frontend Development Team, Product Manager, and DevOps Engineers.</p>

                <hr style="border: 0; border-top: 1px solid #ccc;">

                <h2>2. Sprint Plan Summary (4 Sprints)</h2>
                <p>The project is divided into four two-week sprints. The total estimated effort is 122 points.</p>

                <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse;">
                    <thead style="background-color: #f2f2f2;">
                        <tr>
                            <th>Sprint Name</th>
                            <th>Primary Goal</th>
                            <th>Total Estimated Effort (Points)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Sprint 1: Foundation</b></td>
                            <td>Deploy infrastructure, set up authentication, and design database schema.</td>
                            <td>34 Points</td>
                        </tr>
                        <tr>
                            <td><b>Sprint 2: Core Features</b></td>
                            <td>Implement product catalog endpoints and basic search functionality.</td>
                            <td>45 Points</td>
                        </tr>
                        <tr>
                            <td><b>Sprint 3: Polish & Testing</b></td>
                            <td>Add advanced filtering, resolve bugs, and conduct security testing.</td>
                            <td>28 Points</td>
                        </tr>
                        <tr>
                            <td><b>Sprint 4: Beta Launch Prep</b></td>
                            <td>Final deployment, documentation, and handover to the QA team.</td>
                            <td>15 Points</td>
                        </tr>
                    </tbody>
                </table>

                <hr style="border: 0; border-top: 1px solid #ccc;">

                <h2>3. Detailed Issue Breakdown (Sample)</h2>
                <p>Below is a sample of the **40 issues** that have been automatically loaded into the CodeCatalyst backlog.</p>

                <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse;">
                    <thead style="background-color: #e6f7ff;">
                        <tr>
                            <th>Summary</th>
                            <th>Type</th>
                            <th>Effort</th>
                            <th>Assigned Sprint</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Setup AWS CDK project and base pipeline</td>
                            <td>Task</td>
                            <td>5</td>
                            <td>Sprint 1: Foundation</td>
                        </tr>
                        <tr>
                            <td>Implement secure user registration endpoint (POST /users)</td>
                            <td>Story</td>
                            <td>8</td>
                            <td>Sprint 2: Core Features</td>
                        </tr>
                        <tr>
                            <td>Design DynamoDB table for Product Inventory</td>
                            <td>Task</td>
                            <td>3</td>
                            <td>Sprint 1: Foundation</td>
                        </tr>
                        <tr>
                            <td>Fix high-priority security vulnerability in Cognito setup</td>
                            <td>Bug</td>
                            <td>5</td>
                            <td>Sprint 3: Polish & Testing</td>
                        </tr>
                        <tr>
                            <td>Draft final deployment runbook for production environment</td>
                            <td>Task</td>
                            <td>8</td>
                            <td>Sprint 4: Beta Launch Prep</td>
                        </tr>
                    </tbody>
                </table>
                
                <p style="margin-top: 30px; font-size: 0.8em; color: #666;">Generated by Lyra AI at [Date/Time Placeholder].</p>
    `)

contentToCopy = sessionStorage.getItem('pmSpecHTML')
documentContainer.innerHTML = contentToCopy;

if (copyButton && contentToCopy) {
    copyButton.addEventListener('click', async () => {
        const htmlContent = contentToCopy;; 
        
        const richData = new ClipboardItem({
            "text/html": new Blob([htmlContent], { type: "text/html" }),
            
            "text/plain": new Blob([contentToCopy.innerText], { type: "text/plain" })
        });

        try {
            await navigator.clipboard.write([richData]);
            
            copyButton.textContent = "Copied!";
            copyButton.classList.add('btn-success');
            
            setTimeout(() => {
                copyButton.textContent = "Copy";
                copyButton.classList.remove('btn-success');
            }, 2000);

            console.log("Rich HTML content copied successfully!");

        } catch (err) {
            console.error("Failed to copy rich content:", err);
            alert("Copy failed. Please try manually selecting the text.");
        }
    });
}


const test = `[
  {
    "id": "T-001",
    "name": "Infra: Setup CDK & Initial Stack",
    "group": "Sprint 1: Foundation",
    "start": "2025-10-20",
    "end": "2025-10-24",
    "progress": 0,
    "custom_class": "gantt-sprint-1"
  },
  {
    "id": "T-002",
    "name": "DB: Design User Schema",
    "group": "Sprint 1: Foundation",
    "start": "2025-10-27",
    "end": "2025-10-29",
    "progress": 0,
    "custom_class": "gantt-sprint-1"
  },
  {
    "id": "T-003",
    "name": "FE: Create Dashboard Placeholder",
    "group": "Sprint 2: Core Features",
    "start": "2025-11-03",
    "end": "2025-11-07",
    "progress": 0,
    "custom_class": "gantt-sprint-2"
  },
  {
    "id": "T-004",
    "name": "BE: Implement Login Endpoint",
    "group": "Sprint 2: Core Features",
    "start": "2025-11-03",
    "end": "2025-11-10",
    "progress": 0,
    "custom_class": "gantt-sprint-2"
  },
  {
    "id": "T-005",
    "name": "BUG: Fix Mobile Nav Overflow",
    "group": "Sprint 3: Polish",
    "start": "2025-11-17",
    "end": "2025-11-19",
    "progress": 0,
    "custom_class": "gantt-sprint-3"
  }
]`



async function renderSchedule(jsonStringData) {
    let tasks = [];
    
    // --- 1. Parse the JSON string data ---
    try {
        // The core change: Parse the input string into a JavaScript object (array of tasks)
        tasks = JSON.parse(jsonStringData); 
    } catch (e) {
        console.error("Error parsing JSON data:", e);
        document.querySelector(GANTT_CONTAINER).innerHTML = 
            "<p>Error: The sprint schedule data format is invalid (not valid JSON).</p>";
        return; // Stop execution if data is invalid
    }

    // --- 2. Initialize and render the Gantt chart ---
    try {
        // Ensure the container exists before attempting to draw
        const container = document.querySelector(GANTT_CONTAINER);
        if (!container) {
            console.error(`Gantt container ID ${GANTT_CONTAINER} not found.`);
            return;
        }

        // Initialize the Gantt chart using the parsed 'tasks' array
        const ganttChart = new Gantt(GANTT_CONTAINER, tasks, {
            // Configuration options
            header_height: 50,
            column_width: 30,
            step: 24, // Display time in hours
            
            // Set the default view mode for the schedule
            view_modes: ['Day', 'Week', 'Month', 'Year'],
            view_mode: 'Month', 
            
            // Optional: Define what happens when a task is clicked
            on_click: (task) => {
                alert(`Task: ${task.name} is part of ${task.custom_class}`);
            },
            
            // Optional: Customize the tooltip that appears on hover
            custom_popup_html: function(task) {
                return `<div><b>Sprint:</b> ${task.custom_class}</div><div><b>Ends:</b> ${task.end}</div>`;
            }
        });
        
        // Example: Switch the view after initialization
        ganttChart.change_view_mode('Week');

    } catch (e) {
        // Catch errors specific to the Gantt library initialization or data processing
        console.error("Error displaying Gantt chart:", e);
        document.querySelector(GANTT_CONTAINER).innerHTML = 
            `<p>Could not initialize or render the Gantt chart: ${e.message}</p>`;
    }
}

