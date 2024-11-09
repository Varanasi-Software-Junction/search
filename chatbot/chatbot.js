// Initialize the RiveScript bot
const bot = new RiveScript();

// Function to load brain files and handle setup
async function loadBot() {
    try {
        await bot.loadFile("new.rive"); // Load the brain file asynchronously
        bot.sortReplies(); // Sort replies after loading
        console.log("RiveScript is ready and sorted!");
        loadChatHistory(); // Load saved chat history on startup
    } catch (err) {
        console.error("Error loading RiveScript files:", err);
    }
}

// Call the loadBot function to load and initialize the bot
loadBot();

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        appendMessage('You', userInput); // Display and save user message
        bot.reply("local-user", userInput).then(function (reply) { // Get bot's reply
            appendMessage('Bot', reply);
        }).catch(function (err) {
            appendMessage('Bot', "Sorry, I couldn't understand that.");
        });
        document.getElementById('userInput').value = ''; // Clear input field
    }
}

// Function to append a message to the chat container and save it
function appendMessage(sender, message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-box');
    messageDiv.textContent = `${sender}: ${message}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom

    // Save the message to localStorage
    saveMessage(sender, message);
}

// Save a message in localStorage
function saveMessage(sender, message) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ sender, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Load chat history from localStorage on startup
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(entry => {
        appendMessage(entry.sender, entry.message);
    });
}

// Clear chat history from localStorage and chat container
function clearChatHistory() {
    localStorage.removeItem('chatHistory'); // Remove chat history from localStorage
    document.getElementById('chatContainer').innerHTML = ''; // Clear the chat display
}

// Allow pressing Enter to send messages
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
