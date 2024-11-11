// Load links dynamically from JSON
async function loadLinks() {
    const urlParams = new URLSearchParams(window.location.search);
const link = `${urlParams.get('menu')}.json`; // 'shoes'
    const response = await fetch(link); // Fetch the JSON file
    const data = await response.json(); // Parse the JSON file

    const quizList = document.getElementById("quiz-list"); // Get the container for the links
    data.forEach(item => {
        const link = document.createElement("a"); // Create a new <a> element
        link.classList.add("showthelink"); // Add the showthelink class
        link.href = item.url; // Set the href attribute to the URL from JSON
        link.target = "_blank"; // Open link in a new tab
        link.textContent = item.title; // Set the text to the title from JSON
        quizList.appendChild(link); // Append the link to the quiz list
    });
    filterQuizzes();
}

loadLinks();

// Initialize the search functionality


    