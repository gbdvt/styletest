// My Chat Widget Script
(function() {
    // Create and inject styles
    const styles = `
      .my-chat-widget {
        --chat--color-primary: var(--my-chat-primary-color,rgb(84, 84, 253));
        --chat--color-secondary: var(--my-chat-secondary-color,rgb(124, 157, 255));
        --chat--color-background: var(--my-chat-background-color, #ffffff);
        --chat--color-font: var(--my-chat-font-color, #333333);
        font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
  
      .my-chat-widget .chat-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
        width: 380px;
        height: 600px;
        background: var(--chat--color-background);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(79, 97, 255, 0.15);
        border: 1px solid rgba(85, 79, 255, 0.2);
        overflow: hidden;
        font-family: inherit;
      }

      .my-chat-widget .talk-human-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px 24px;
        background: #25D366; /* WhatsApp green */
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: transform 0.3s;
        font-weight: 500;
        font-family: inherit;
        text-decoration: none;
        margin-bottom: 12px;
      }

      .my-chat-widget .whatsapp-btn {
        background: #25D366;
        color: white;
        border: none;
      }

      .my-chat-widget .talk-human-btn:hover {
        transform: scale(1.02);
      }

      .my-chat-widget .whatsapp-logo {
        width: 20px;
        height: 20px;
      }

      
      .my-chat-widget .chat-container.position-left {
        right: auto;
        left: 20px;
      }
  
      .my-chat-widget .chat-container.open {
        display: flex;
        flex-direction: column;
      }
  
      .my-chat-widget .brand-header {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(133, 79, 255, 0.1);
        position: relative;
        background-color: var(--chat--color-background);
      }
  
      .my-chat-widget .close-button {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--chat--color-font);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
        font-size: 20px;
        opacity: 0.6;
      }
  
      .my-chat-widget .close-button:hover {
        opacity: 1;
      }
  
      .my-chat-widget .brand-header img {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }
  
      .my-chat-widget .brand-header span {
        font-size: 18px;
        font-weight: 500;
        color: var(--chat--color-font);
      }
  
      .my-chat-widget .new-conversation {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        text-align: center;
        width: 100%;
        max-width: 300px;
      }
  
      .my-chat-widget .welcome-text {
        font-size: 24px;
        font-weight: 600;
        color: var(--chat--color-font);
        margin-bottom: 24px;
        line-height: 1.3;
      }
      
      .my-chat-widget .button-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
      }

      .my-chat-widget .chat-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 16px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: transform 0.3s;
        font-weight: 500;
        font-family: inherit;
      }
  
      .my-chat-widget .new-chat-btn {
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
      }
  
      .my-chat-widget .new-chat-btn:hover {
        transform: scale(1.02);
      }
  
      .my-chat-widget .message-icon {
        width: 20px;
        height: 20px;
      }
  
      .my-chat-widget .response-text {
        font-size: 14px;
        color: var(--chat--color-font);
        opacity: 0.7;
        margin: 0;
      }
  
      .my-chat-widget .chat-interface {
        display: none;
        flex-direction: column;
        height: 100%;
        background: var(--chat--color-background);
      }
  
      .my-chat-widget .chat-interface.active {
        display: flex;
      }
  
      .my-chat-widget .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: var(--chat--color-background);
        display: flex;
        flex-direction: column;
      }
  
      .my-chat-widget .chat-message {
        padding: 12px 16px;
        margin: 8px 0;
        border-radius: 12px;
        max-width: 80%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.5;
      }
  
      .my-chat-widget .chat-message.user {
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        align-self: flex-end;
        box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
        border: none;
      }
  
      .my-chat-widget .chat-message.bot {
        background: var(--chat--color-background);
        border: 1px solid rgba(133, 79, 255, 0.2);
        color: var(--chat--color-font);
        align-self: flex-start;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
  
      .my-chat-widget .chat-input {
        padding: 16px;
        background: var(--chat--color-background);
        border-top: 1px solid rgba(133, 79, 255, 0.1);
        display: flex;
        gap: 8px;
      }
  
      .my-chat-widget .chat-input textarea {
        flex: 1;
        padding: 12px;
        border: 1px solid rgba(133, 79, 255, 0.2);
        border-radius: 8px;
        background: var(--chat--color-background);
        color: var(--chat--color-font);
        resize: none;
        font-family: inherit;
        font-size: 14px;
      }
  
      .my-chat-widget .chat-input textarea::placeholder {
        color: var(--chat--color-font);
        opacity: 0.6;
      }
  
      .my-chat-widget .chat-input button {
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0 20px;
        cursor: pointer;
        transition: transform 0.2s;
        font-family: inherit;
        font-weight: 500;
      }
  
      .my-chat-widget .chat-input button:hover {
        transform: scale(1.05);
      }
  
      .my-chat-widget .chat-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        z-index: 999;
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .my-chat-widget .chat-toggle.position-left {
        right: auto;
        left: 20px;
      }
  
      .my-chat-widget .chat-toggle:hover {
        transform: scale(1.05);
      }
  
      .my-chat-widget .chat-toggle svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
  
      /* Footer removed entirely (no "Powered by..." link) */
    `;
  
    // Load Geist font (optional)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist-font@1.0.0/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);
  
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  
    // Default configuration
    const defaultConfig = {
      webhook: {
        url: '',
        route: ''
      },
      branding: {
        logo: '',
        name: '',
        welcomeText: '',
        responseTimeText: ''
      },
      style: {
        primaryColor: '#854fff',
        secondaryColor: '#6b3fd4',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#333333'
      }
    };
  
    // Merge user config with defaults
    const config = window.ChatWidgetConfig
      ? {
          webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
          branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
          style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        }
      : defaultConfig;
  
    // Prevent multiple initializations
    if (window.MyChatWidgetInitialized) return;
    window.MyChatWidgetInitialized = true;
  
    let currentSessionId = '';
  
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'my-chat-widget';
  
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--my-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--my-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--my-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--my-chat-font-color', config.style.fontColor);
  
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
  
    // New Conversation Screen
    const newConversationHTML = `
      <div class="brand-header">
        <img src="${config.branding.logo}" alt="${config.branding.name}">
        <span>${config.branding.name}</span>
        <button class="close-button">×</button>
      </div>
      <div class="new-conversation">
        <h2 class="welcome-text">${config.branding.welcomeText}</h2>
        <div class="button-container">
          <button class="chat-button new-chat-btn">
            <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
            </svg>
            Talk to AI Agent
          </button>
          <button class="chat-button whatsapp-btn">
            <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Talk to Human
          </button>
        </div>
        <p class="response-text">${config.branding.responseTimeText}</p>
      </div>
    `;
  
    // Actual Chat Interface
    const chatInterfaceHTML = `
      <div class="chat-interface">
        <div class="brand-header">
          <img src="${config.branding.logo}" alt="${config.branding.name}">
          <span>${config.branding.name}</span>
          <button class="close-button">×</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
          <textarea placeholder="Type your message here..." rows="1"></textarea>
          <button type="submit">Send</button>
        </div>
      </div>
    `;
  
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
  
    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
    `;
  
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);
  
    // References
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');
    const closeButtons = chatContainer.querySelectorAll('.close-button');
  
    // Generate a random session ID (UUID)
    function generateUUID() {
      // If your environment supports crypto.randomUUID (modern browsers), you can do:
      if (window.crypto && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Otherwise fallback to a simpler unique generator:
      return 'xxxxxxxy-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  
    // Start new conversation
    async function startNewConversation() {
      currentSessionId = generateUUID();
      const data = [
        {
          action: 'loadPreviousSession',
          sessionId: currentSessionId,
          route: config.webhook.route,
          metadata: {
            userId: ''
          }
        }
      ];
  
      try {
        const response = await fetch(config.webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
  
        // Switch UI
        chatContainer.querySelector('.brand-header').style.display = 'none';
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        chatInterface.classList.add('active');
  
        // Handle response
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
  
        // If the webhook returns an array, handle that (some setups do)
        botMessageDiv.textContent = Array.isArray(responseData)
          ? responseData[0].output
          : responseData.output;
  
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
        console.error('Error starting new conversation:', error);
      }
    }
  
    // Send a message
    async function sendMessage(message) {
      const messageData = {
        action: 'sendMessage',
        sessionId: currentSessionId,
        route: config.webhook.route,
        chatInput: message,
        metadata: {
          userId: ''
        }
      };
  
      // Append the user's message to the chat
      const userMessageDiv = document.createElement('div');
      userMessageDiv.className = 'chat-message user';
      userMessageDiv.textContent = message;
      messagesContainer.appendChild(userMessageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
      // Send to webhook
      try {
        const response = await fetch(config.webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageData)
        });
  
        const data = await response.json();
  
        // Append bot response
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
    // Event listeners
    newChatBtn.addEventListener('click', startNewConversation);
  
    sendButton.addEventListener('click', () => {
      const message = textarea.value.trim();
      if (message) {
        sendMessage(message);
        textarea.value = '';
      }
    });
  
    textarea.addEventListener('keypress', (e) => {
      // Send on Enter (without shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = textarea.value.trim();
        if (message) {
          sendMessage(message);
          textarea.value = '';
        }
      }
    });
  
    toggleButton.addEventListener('click', () => {
      chatContainer.classList.toggle('open');
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        chatContainer.classList.remove('open');
      });
    });
  })();
  