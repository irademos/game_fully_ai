class ChatFeature {
  constructor(multiplayer) {
    this.multiplayer = multiplayer;
    this.messages = [];
    this.chatBox = document.createElement('div');
    this.chatBox.id = 'chat-box';
    document.body.appendChild(this.chatBox);
    this.setupChatInput();
  }

  setupChatInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    document.body.appendChild(input);

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value) {
        this.sendMessage(input.value);
        input.value = '';
      }
    });
  }

  sendMessage(message) {
    this.messages.push(message);
    this.updateChatBox();
    this.multiplayer.send({ type: 'chat', message });
  }

  updateChatBox() {
    this.chatBox.innerHTML = this.messages.map(msg => `<div>${msg}</div>`).join('');
  }

  receiveMessage(data) {
    if (data.type === 'chat') {
      this.messages.push(data.message);
      this.updateChatBox();
    }
  }
}

export default ChatFeature;
