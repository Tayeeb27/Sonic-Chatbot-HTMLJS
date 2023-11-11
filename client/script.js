const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-message');

const addMessageToChat = (sender, message, className) => {
    const newMessage = document.createElement('div');
    newMessage.className = className;
    newMessage.innerHTML = `<strong>${sender}: </strong> ${message}`;
    chatBox.appendChild(newMessage);
};

const displayThinkingMessage = () => {
    const thinkingMessage = document.createElement('div');
    thinkingMessage.className = 'chat-text-s';
    thinkingMessage.innerHTML = `<strong>Sonic is thinking...</strong>`;
    chatBox.appendChild(thinkingMessage);

    setTimeout(() => {
        chatBox.removeChild(thinkingMessage);
    }, 3000);
};

const answer = async (question) => {
    displayThinkingMessage();

    const response = await fetch('http://localhost:3000/getChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: question })
    });

    const data = await response.json();
    addMessageToChat('Sonic', data.message, 'chat-text-s');
};

chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    addMessageToChat('You', message, 'chat-text-u');
    chatInput.value = "";
    await answer(message);
});
