// Variables globales
let cart = [];
let currentPage = 'inicio';

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initializeMobileApp();
  loadCartFromStorage();
});

// Función principal de inicialización
function initializeMobileApp() {
  initializeCart();
  initializeTabNavigation();
  initializeChatbot();
  initializeSmoothScroll();
}

// Navegación por pestañas
function initializeTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetPage = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      showPage(targetPage);
    });
  });
}

// Mostrar página específica
function showPage(pageId) {
  // Ocultar todas las páginas
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Mostrar página seleccionada
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
  }
  
  // Actualizar botones de navegación
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('onclick').includes(pageId)) {
      button.classList.add('active');
    }
  });
  
  // Scroll al top
  window.scrollTo(0, 0);
}

// Funcionalidad del carrito
function initializeCart() {
  const cartBtn = document.getElementById('cartBtn');
  cartBtn.addEventListener('click', toggleCart);
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('translate-x-full');
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }
  
  updateCart();
  saveCartToStorage();
  showNotification(`${name} agregado al carrito`);
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  
  // Actualizar contador
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Actualizar lista de items
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-warmGray">Tu carrito está vacío</p>';
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex items-center justify-between p-3 bg-white/5 rounded-lg';
      itemDiv.innerHTML = `
        <div class="flex-1">
          <h4 class="font-semibold text-sm">${item.name}</h4>
          <p class="text-xs text-warmGray">$${item.price.toLocaleString()}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="changeQuantity(${index}, -1)" class="bg-primary/20 text-primary px-2 py-1 rounded text-sm">-</button>
          <span class="text-sm">${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)" class="bg-primary/20 text-primary px-2 py-1 rounded text-sm">+</button>
          <button onclick="removeFromCart(${index})" class="text-red-400 ml-2">
            <i class="fas fa-trash text-sm"></i>
          </button>
        </div>
      `;
      cartItems.appendChild(itemDiv);
    });
  }
  
  // Actualizar total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
}

function changeQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    
    updateCart();
    saveCartToStorage();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    saveCartToStorage();
    showNotification(`${itemName} removido del carrito`);
  }
}

function checkout() {
  if (cart.length === 0) {
    showNotification('Tu carrito está vacío');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const items = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
  
  const message = `¡Hola! Quiero hacer un pedido:\n\n${items}\n\nTotal: $${total.toLocaleString()}`;
  const encodedMessage = encodeURIComponent(message);
  
  window.open(`https://api.whatsapp.com/send/?phone=573008220389&text=${encodedMessage}`, '_blank');
}

// Persistencia del carrito
function saveCartToStorage() {
  try {
    localStorage.setItem('velasCart', JSON.stringify(cart));
  } catch (e) {
    console.log('Error saving cart:', e);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('velasCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
    }
  } catch (e) {
    console.log('Error loading cart:', e);
    cart = [];
  }
}

// Chatbot
function initializeChatbot() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const sendMessage = document.getElementById('sendMessage');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  chatbotToggle.addEventListener('click', () => {
    chatbotPanel.classList.toggle('hidden');
  });
  
  closeChatbot.addEventListener('click', () => {
    chatbotPanel.classList.add('hidden');
  });
  
  sendMessage.addEventListener('click', () => {
    sendChatMessage();
  });
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });
  
  function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    setTimeout(() => {
      const response = generateChatbotResponse(message);
      addChatMessage(response, 'bot');
    }, 1000);
  }
  
  function addChatMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `rounded-lg p-2 ${sender === 'user' ? 'bg-primary/20 ml-8' : 'bg-white/10 mr-8'}`;
    
    const formattedMessage = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `<p class="text-xs">${formattedMessage}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      return '¡Hola! Soy Elena, tu asistente virtual. ¿En qué puedo ayudarte? Puedes preguntarme sobre nuestros productos, precios o hacer un pedido.';
    }
    
    // Productos
    if (lowerMessage.includes('producto') || lowerMessage.includes('vela') || lowerMessage.includes('catalogo')) {
      return 'Tenemos varios catálogos:\n• **Productos principales** (Cedro, Tilo, Lavanda)\n• **Amor y Amistad** (Corazón, Rosa, Vainilla)\n• **Navidad** (Pino, Canela, Especias)\n• **Primera Comunión** (Blanca, Incienso, Sándalo)\n\n¿Cuál te interesa?';
    }
    
    // Precios
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) {
      return 'Nuestros precios varían según el producto:\n• **Detalle:** $15.900 - $49.900\n• **Mayorista:** $12.000 - $45.000\n\n¿Te interesa algún producto específico?';
    }
    
    // Envíos
    if (lowerMessage.includes('envio') || lowerMessage.includes('envío') || lowerMessage.includes('llegar')) {
      return '🚚 **Envíos:**\n• Bogotá: 1-2 días hábiles\n• Resto del país: 3-5 días hábiles\n• Gratis en compras > $100.000\n\n¿De dónde eres?';
    }
    
    // Contacto
    if (lowerMessage.includes('contacto') || lowerMessage.includes('whatsapp') || lowerMessage.includes('hablar')) {
      return '📞 **Contacto:**\n• WhatsApp Principal: +57 300 822 0389\n• WhatsApp Secundario: +57 324 644 5897\n• Facebook: Velas y Aromas Cautiva\n\n¡Estamos aquí para ayudarte!';
    }
    
    // Default
    return 'No entiendo tu pregunta. ¿Puedes ser más específico? Puedo ayudarte con productos, precios, envíos o contactos.';
  }
}

// Scroll suave
function initializeSmoothScroll() {
  html.style.scrollBehavior = 'smooth';
}

// Notificaciones
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 left-4 right-4 bg-primary text-black px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300';
  notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
  
  document.body.appendChild(notification);
  
  requestAnimationFrame(() => {
    notification.classList.remove('translate-y-full');
  });
  
  setTimeout(() => {
    notification.classList.add('translate-y-full');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

// Funciones globales
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.toggleCart = toggleCart;
window.showPage = showPage; 