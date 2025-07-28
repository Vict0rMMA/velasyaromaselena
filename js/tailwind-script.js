// Variables globales
let cart = [];
let cartTotal = 0;

// Chatbot responses
const chatbotResponses = {
  greetings: [
    "¡Hola! Soy tu asistente virtual de Velas y Aromas Elena. ¿En qué puedo ayudarte?",
    "¡Bienvenido! ¿Te gustaría conocer nuestros productos o tienes alguna pregunta específica?",
    "¡Hola! ¿Buscas velas para relajarte, energizarte o como regalo?"
  ],
  products: [
    "Tenemos velas de cedro verbena (relajante), tilo bamboo (suave), lavanda (calmante) y muchas más. ¿Qué aroma te interesa?",
    "Nuestras velas vienen en tamaños 6×6 y 6×10. Los precios van desde $32.900 hasta $45.900 COP. ¿Te gustaría ver alguna en particular?",
    "¡Perfecto! Nuestras velas más populares son: Cedro Verbena (más vendida), Lavanda Relajante y Rosa Silvestre. ¿Cuál te llama más la atención?"
  ],
  shipping: [
    "Hacemos envíos a todo Colombia. Los tiempos varían según tu ciudad: Bogotá 1-2 días, otras ciudades 3-5 días.",
    "El costo de envío depende de tu ubicación. En Bogotá es gratis en compras superiores a $100.000 COP.",
    "¡Sí! Enviamos a todo el país. Puedes pagar contra entrega o por transferencia bancaria."
  ],
  contact: [
    "Puedes contactarnos por WhatsApp: +57 300 822 0389 (principal) o +57 324 644 5897 (secundario).",
    "También estamos en Instagram @velasyaromaselena y Facebook @velasyaromascautiva",
    "Nuestros horarios son de lunes a sábado de 9AM a 6PM. ¡Respondemos muy rápido!"
  ],
  default: [
    "Entiendo tu pregunta. ¿Te gustaría que te conecte directamente con Elena por WhatsApp?",
    "Esa es una excelente pregunta. Te recomiendo contactarnos por WhatsApp para darte una respuesta más personalizada.",
    "¡Gracias por tu interés! Para información más específica, escríbenos por WhatsApp y te responderemos inmediatamente."
  ]
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCart();
  initializeMobileMenu();
  initializeChatbot();
  loadCartFromStorage();
  initializeSmoothScroll();
  initializeAnimations();
});

// Cart functionality
function initializeCart() {
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const checkoutBtn = document.getElementById('checkoutBtn');

  cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
  });

  checkoutBtn.addEventListener('click', checkout);
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
  showNotification(`¡"${name}" añadido!`);
  
  // Add animation to button
  const button = event.target;
  button.classList.add('scale-95');
  setTimeout(() => button.classList.remove('scale-95'), 150);
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotalElement = document.getElementById('cartTotal');
  
  // Update count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Update total
  cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElement.textContent = `$${cartTotal.toLocaleString()} COP`;
  
  // Update items
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-gray-400 text-center">Tu carrito está vacío</p>';
    return;
  }
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'bg-white/5 rounded-lg p-4 border border-primary/20';
    cartItem.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-bold text-primary">${item.name}</h4>
        <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-sm">-</button>
          <span class="font-bold">${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center text-sm">+</button>
        </div>
        <span class="font-bold">$${(item.price * item.quantity).toLocaleString()} COP</span>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
}

function changeQuantity(index, change) {
  const item = cart[index];
  const newQuantity = item.quantity + change;
  
  if (newQuantity <= 0) {
    removeFromCart(index);
  } else {
    item.quantity = newQuantity;
    updateCart();
    saveCartToStorage();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCartToStorage();
}

function checkout() {
  if (cart.length === 0) {
    showNotification('❌ Tu carrito está vacío');
    return;
  }
  
  let message = `🕯️ *PEDIDO - ELENA VELAS Y AROMAS* 🕯️\n\n`;
  message += `*Hola! Quiero hacer el siguiente pedido:*\n\n`;
  
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    message += `*${index + 1}. ${item.name}*\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio: $${item.price.toLocaleString()} COP\n`;
    message += `   Subtotal: $${subtotal.toLocaleString()} COP\n\n`;
  });
  
  message += `*TOTAL DEL PEDIDO: $${cartTotal.toLocaleString()} COP*\n\n`;
  message += `📱 *Información de contacto:*\n`;
  message += `   Nombre: _________________\n`;
  message += `   Dirección: _________________\n`;
  message += `   Teléfono: _________________\n\n`;
  message += `✨ *¡Gracias por elegir nuestras velas artesanales!* ✨`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=573008220389&text=${encodedMessage}&type=phone_number&app_absent=0`;
  
  window.open(whatsappUrl, '_blank');
  
  // Clear cart after delay
  setTimeout(() => {
    cart = [];
    updateCart();
    saveCartToStorage();
    document.getElementById('cartSidebar').classList.add('translate-x-full');
  }, 2000);
}

// Storage functions
function saveCartToStorage() {
  try {
    localStorage.setItem('velasElenaCart', JSON.stringify(cart));
  } catch (e) {
    console.log('Error saving cart:', e);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('velasElenaCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
    }
  } catch (e) {
    console.log('Error loading cart:', e);
    cart = [];
  }
}

// Mobile menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Chatbot functionality
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
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
      const response = generateChatbotResponse(message);
      addChatMessage(response, 'bot');
    }, 1000);
  }
  
  function addChatMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `rounded-lg p-3 ${sender === 'user' ? 'bg-primary/20 ml-8' : 'bg-white/10 mr-8'}`;
    messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      return getRandomResponse('greetings');
    } else if (lowerMessage.includes('producto') || lowerMessage.includes('vela') || lowerMessage.includes('precio') || lowerMessage.includes('costo')) {
      return getRandomResponse('products');
    } else if (lowerMessage.includes('envío') || lowerMessage.includes('entrega') || lowerMessage.includes('llegar')) {
      return getRandomResponse('shipping');
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('whatsapp') || lowerMessage.includes('teléfono')) {
      return getRandomResponse('contact');
    } else {
      return getRandomResponse('default');
    }
  }
  
  function getRandomResponse(category) {
    const responses = chatbotResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Utility functions
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-6 right-6 bg-primary text-black px-4 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
  notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.classList.remove('translate-x-full');
  });
  
  // Animate out
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      scrollToSection(targetId);
    });
  });
}

function initializeAnimations() {
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    observer.observe(card);
  });
}

// Global functions for onclick handlers
window.addToCart = addToCart;
window.scrollToSection = scrollToSection; 