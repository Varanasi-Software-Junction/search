// Array of predefined responses
const responses = {
    "hello": "Hi! How can I assist you today?",
    "how are you": "I'm a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
    "default": "Sorry, I don't understand that. Can you rephrase?"
};

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    if (userInput) {
        appendMessage('You', userInput); // Display user message
        generateResponse(userInput);      // Generate bot response
        document.getElementById('userInput').value = ''; // Clear input field
    }
}

// Function to generate a bot response
function generateResponse(userInput) {
    const botResponse = responses[userInput] || responses['default'];
    appendMessage('Bot', botResponse); // Display bot message
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
