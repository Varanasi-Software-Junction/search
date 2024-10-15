// Initialize the RiveScript bot
const bot = new RiveScript();

// Function to load brain files and handle setup
async function loadBot() {
    try {
        await bot.loadFile("brain.rive"); // Load the brain file asynchronously
        bot.sortReplies(); // Sort replies after loading the brain file
        console.log("RiveScript is ready and sorted!");
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
        appendMessage('You', userInput); // Display user message
        bot.reply("local-user", userInput).then(function(reply) { // Get bot's reply
            appendMessage('Bot', reply);
        }).catch(function(err) {
            appendMessage('Bot', "Sorry, I couldn't understand that.");
        });
        document.getElementById('userInput').value = ''; // Clear input field
    }
}

// Function to append a message to the chat container
function appendMessage(sender, message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-box');
    messageDiv.textContent = `${sender}: ${message}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}
