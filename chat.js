class Chat {
  constructor() {
    this.messages = [];
    this.chatBox = document.createElement('div');
    this.chatBox.style.position = 'absolute';
    this.chatBox.style.bottom = '10px';
    this.chatBox.style.right = '10px';
    this.chatBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.chatBox.style.color = 'white';
    this.chatBox.style.padding = '10px';
    this.chatBox.style.maxHeight = '200px';
    this.chatBox.style.overflowY = 'auto';
    document.body.appendChild(this.chatBox);

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Type a message...';
    this.input.style.position = 'absolute';
    this.input.style.bottom = '10px';
    this.input.style.right = '10px';
    document.body.appendChild(this.input);

    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage(this.input.value);
        this.input.value = '';
      }
    });
  }

  sendMessage(message) {
    this.messages.push(message);
    this.updateChatBox();
    // Here you would also send the message to other players via the multiplayer system
  }

  updateChatBox() {
    this.chatBox.innerHTML = this.messages.map(msg => `<div>${msg}</div>`).join('');
  }
}

// Initialize chat
const chat = new Chat();
