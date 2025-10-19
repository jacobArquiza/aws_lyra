const GANTT_CONTAINER = "#schedule-display";

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

// NOTE: The function is now called with a JSON string as the argument, 
// which your main HTML page or embedding script must provide.
// Example usage (replace the ... with your actual AI-generated JSON string):
// renderSchedule('[]');