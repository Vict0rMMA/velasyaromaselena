// Variables globales
let cart = [];
let cartTotal = 0;

// Chatbot responses mejoradas
const chatbotResponses = {
  greetings: [
    "¡Hola! Soy Elena, tu asistente virtual. ¿Te gustaría conocer nuestros productos, hacer un pedido o tienes alguna pregunta específica?",
    "¡Bienvenido a Velas y Aromas Elena! ¿Qué aroma te gustaría explorar hoy? Tenemos opciones relajantes, energizantes y románticas.",
    "¡Hola! Soy tu guía personal de aromaterapia. ¿Buscas velas para relajarte, como regalo o para crear un ambiente especial?"
  ],
      products: [
      "🔥 *Nuestras velas más populares:*\n• Vela Cedro Verbena 6×6 - $32.900 (Más vendida)\n• Vela Tilo Bamboo 6×6 - $32.900 (Nueva)\n• Vela Lavanda Relajante 6×6 - $35.900\n• Matera Vela Mariposa Mini - $5.900 (Especial)\n\n¿Cuál te interesa más?",
      "✨ *Por aroma:*\n• Relajantes: Cedro Verbena, Lavanda, Tilo Bamboo\n• Energizantes: Cítricos, Menta\n• Románticas: Rosa Silvestre, Vainilla\n• Decorativas: Matera Mariposa Mini\n\n¿Qué tipo de ambiente buscas crear?",
      "🕯️ *Por tamaño:*\n• 6×6: Perfectas para espacios pequeños\n• 6×10: Mayor duración, ideal para salas\n• Mini: Matera Mariposa (6.5×6cm) - Decorativa\n\n¿Para qué espacio la necesitas?",
      "💕 *Catálogo Amor y Amistad:*\n• Vela Corazón - $15.900 (unitario) / $42.000 (pack 3)\n• Vela Rosa Aromática 6×6 - $38.900\n• Vela Vainilla Acariciante 6×6 - $35.900\n• Vela Chocolate Tentador 6×6 - $36.900\n• Vela Fresa Dulce 6×6 - $34.900\n• Vela Canela Cálida 6×6 - $33.900\n\n¡Perfectas para regalos románticos!",
      "🎄 *Catálogo de Navidad:*\n• Vela Pino Navideño 6×6 - $42.900\n• Vela Canela Navideña 6×6 - $39.900\n• Vela Vainilla Navideña 6×6 - $41.900\n• Vela Chocolate Navideño 6×6 - $43.900\n• Vela Manzana Canela 6×6 - $40.900\n• Vela Especias Navideñas 6×6 - $44.900\n\n¡Ilumina tus fiestas con magia!",
      "✝️ *Catálogo Primera Comunión:*\n• Vela Blanca Sagrada 6×6 - $45.900\n• Vela Incienso Sagrado 6×6 - $47.900\n• Vela Sándalo Sagrado 6×6 - $49.900\n• Vela Rosa Sagrada 6×6 - $46.900\n• Vela Lavanda Sagrada 6×6 - $44.900\n• Vela Mirra Sagrada 6×6 - $48.900\n\n¡Velas especiales para momentos sagrados!"
    ],
  prices: [
    "💰 *Precios actuales:*\n• Velas 6×6: $32.900 - $38.900 COP\n• Velas 6×10: $39.900 - $45.900 COP\n• Matera Mariposa Mini: $5.900 (bolsa) / $7.000 (caja)\n• Envío Bogotá: Gratis en compras > $100.000\n• Otras ciudades: $15.000 - $20.000",
    "💎 *Ofertas especiales:*\n• Cedro Verbena 6×10: $39.900 (antes $44.900)\n• Combo 2 velas 6×6: $60.000\n• Matera Mariposa Mini mayorista: $5.200 (bolsa)\n• Envío gratis en Bogotá para compras grandes",
    "🎁 *Descuentos:*\n• Primera compra: 10% descuento\n• Compras > $150.000: Envío gratis\n• Clientes recurrentes: 5% descuento\n• Precios mayoristas disponibles"
  ],
  shipping: [
    "🚚 *Envíos a todo Colombia:*\n• Bogotá: 1-2 días hábiles (Gratis > $100.000)\n• Ciudades principales: 3-5 días ($15.000)\n• Resto del país: 5-7 días ($20.000)\n\n¿De qué ciudad eres?",
    "📦 *Opciones de entrega:*\n• Contra entrega (pago al recibir)\n• Transferencia bancaria\n• Nequi/Daviplata\n\n¿Cuál prefieres?",
    "⏰ *Tiempos de envío:*\n• Bogotá: 1-2 días\n• Medellín, Cali, Barranquilla: 3-5 días\n• Otras ciudades: 5-7 días\n\n¿Necesitas envío urgente?"
  ],
  contact: [
    "📱 *Contacto directo:*\n• WhatsApp Principal: +57 300 822 0389\n• WhatsApp Secundario: +57 324 644 5897\n• Instagram: @velasyaromaselena\n• Facebook: @velasyaromascautiva",
    "🕐 *Horarios de atención:*\n• Lunes a Sábado: 9AM - 6PM\n• Respuesta WhatsApp: Inmediata\n• Respuesta redes: En minutos\n\n¿En qué horario prefieres contactarnos?",
    "💬 *Canales de contacto:*\n• WhatsApp: Respuesta inmediata\n• Instagram: Nuevos productos y ofertas\n• Facebook: Comunidad y eventos\n\n¿Por cuál canal te sientes más cómodo?"
  ],
  recommendations: [
    "🌟 *Recomendaciones según uso:*\n• Para dormir: Cedro Verbena, Lavanda\n• Para meditar: Tilo Bamboo, Sándalo\n• Para romance: Rosa Silvestre, Vainilla\n• Para decoración: Matera Mariposa Mini\n• Para energía: Cítricos, Menta\n\n¿Para qué momento la necesitas?",
    "🏠 *Por ambiente:*\n• Sala: Cedro Verbena 6×10 (mayor duración)\n• Dormitorio: Lavanda Relajante 6×6\n• Baño: Cítricos Energizantes 6×6\n• Cocina: Vainilla Acogedora 6×6\n• Decoración: Matera Mariposa Mini\n\n¿En qué habitación la usarás?",
    "🎯 *Por ocasión:*\n• Regalo: Rosa Silvestre (romántica)\n• Autocuidado: Lavanda (relajante)\n• Decoración: Matera Mariposa Mini (especial)\n• Terapia: Sándalo (meditación)\n\n¿Es para alguna ocasión especial?",
    "💝 *Para Amor y Amistad:*\n• San Valentín: Vela Corazón (especial)\n• Aniversario: Vela Rosa Aromática\n• Cena romántica: Vela Vainilla Acariciante\n• Regalo dulce: Vela Chocolate Tentador\n• Amistad: Vela Fresa Dulce\n• Acogedor: Vela Canela Cálida\n\n¡Cada vela cuenta una historia de amor!"
  ],
  order: [
    "🛒 *Para hacer tu pedido:*\n1. Elige tus productos\n2. Añádelos al carrito\n3. Completa tus datos\n4. Te contactamos por WhatsApp\n\n¿Quieres que te ayude a elegir?",
    "📋 *Proceso de compra:*\n• Selecciona tus velas\n• Confirma tu dirección\n• Elige método de pago\n• Recibe confirmación\n\n¿Tienes alguna pregunta sobre el proceso?",
    "✅ *Garantía:*\n• 100% satisfacción garantizada\n• Cambios sin problema\n• Atención personalizada\n\n¿Te gustaría hacer tu pedido ahora?"
  ],
  default: [
    "🤔 Entiendo tu pregunta. ¿Te gustaría que te ayude con:\n• Información de productos\n• Precios y ofertas\n• Envíos y tiempos\n• Recomendaciones personalizadas\n• Hacer un pedido",
    "💡 Puedo ayudarte con:\n• Catálogo completo de velas\n• Precios actualizados\n• Información de envíos\n• Recomendaciones según tu necesidad\n• Proceso de compra\n\n¿Qué te interesa más?",
    "🎯 Soy tu asistente personal. Puedo:\n• Mostrarte nuestros productos\n• Explicarte precios y ofertas\n• Ayudarte con envíos\n• Darte recomendaciones\n• Guiarte en tu compra\n\n¿En qué puedo ayudarte?"
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

// Chatbot functionality mejorada
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
    
    // Convert markdown-like formatting to HTML
    const formattedMessage = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `<p class="text-sm">${formattedMessage}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas') || lowerMessage.includes('hey')) {
      return getRandomResponse('greetings');
    }
    
    // Productos
    if (lowerMessage.includes('producto') || lowerMessage.includes('vela') || lowerMessage.includes('velas') || lowerMessage.includes('catalogo') || lowerMessage.includes('que tienen')) {
      return getRandomResponse('products');
    }
    
    // Precios
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto') || lowerMessage.includes('vale') || lowerMessage.includes('oferta') || lowerMessage.includes('descuento')) {
      return getRandomResponse('prices');
    }
    
    // Envíos
    if (lowerMessage.includes('envío') || lowerMessage.includes('entrega') || lowerMessage.includes('llegar') || lowerMessage.includes('tiempo') || lowerMessage.includes('cuando llega') || lowerMessage.includes('envian')) {
      return getRandomResponse('shipping');
    }
    
    // Contacto
    if (lowerMessage.includes('contacto') || lowerMessage.includes('whatsapp') || lowerMessage.includes('teléfono') || lowerMessage.includes('numero') || lowerMessage.includes('hablar') || lowerMessage.includes('contactar')) {
      return getRandomResponse('contact');
    }
    
    // Recomendaciones
    if (lowerMessage.includes('recomienda') || lowerMessage.includes('mejor') || lowerMessage.includes('cual') || lowerMessage.includes('sugerencia') || lowerMessage.includes('ayuda') || lowerMessage.includes('busco')) {
      return getRandomResponse('recommendations');
    }
    
    // Pedidos
    if (lowerMessage.includes('pedido') || lowerMessage.includes('comprar') || lowerMessage.includes('orden') || lowerMessage.includes('quiero comprar') || lowerMessage.includes('como compro')) {
      return getRandomResponse('order');
    }
    
    // Respuestas específicas
    if (lowerMessage.includes('cedro') || lowerMessage.includes('verbena')) {
      return "🔥 *Cedro Verbena* es nuestra vela más vendida:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $32.900 y $39.900\n• Precio mayorista: $28.000 y $35.000\n• Aroma: Relajante y natural\n• Duración: 40-60 horas\n\n¿Te gustaría añadirla al carrito?";
    }
    
    if (lowerMessage.includes('tilo') || lowerMessage.includes('bamboo')) {
      return "✨ *Tilo Bamboo* es nuestra nueva estrella:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $32.900 y $39.900\n• Precio mayorista: $28.000 y $35.000\n• Aroma: Suave y refrescante\n• Perfecta para: Meditación y relajación\n\n¿Quieres conocer más detalles?";
    }
    
    if (lowerMessage.includes('lavanda')) {
      return "💜 *Lavanda Relajante*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $35.900 y $42.900\n• Precio mayorista: $31.000 y $38.000\n• Aroma: Calmante y floral\n• Ideal para: Dormir y reducir estrés\n\n¿Te interesa esta opción?";
    }
    
    if (lowerMessage.includes('mariposa') || lowerMessage.includes('matera')) {
      return "🦋 *Matera Vela Mariposa Mini*:\n• Diseño: Mariposa roja sobre base rosa trenzada\n• Medidas: 6.5cm altura × 6cm ancho\n• Peso: 62gr\n• Duración: 8-12 horas\n• Precio detalle: $5.900 (bolsa) / $7.000 (caja)\n• Precio mayorista: $5.200 (bolsa) / $6.500 (caja)\n• Perfecta para: Decoración, regalos y Amor y Amistad\n\n¡Una vela única y especial!";
    }
    
    if (lowerMessage.includes('rosa') || lowerMessage.includes('silvestre')) {
      return "💕 *Rosa Silvestre* - Nuestra vela romántica:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $38.900 y $45.900\n• Precio mayorista: $34.000 y $41.000\n• Aroma: Romántico y floral\n• Ideal para: Regalos y momentos especiales\n\n¿Es para una ocasión romántica?";
    }
    
    if (lowerMessage.includes('citricos') || lowerMessage.includes('energizante')) {
      return "⚡ *Cítricos Energizantes*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $32.900 y $39.900\n• Precio mayorista: $28.000 y $35.000\n• Aroma: Refrescante de limón y naranja\n• Perfecta para: Energía y vitalidad\n\n¿Necesitas un boost de energía?";
    }
    
    // Productos de Amor y Amistad
    if (lowerMessage.includes('corazon') || lowerMessage.includes('corazón') || lowerMessage.includes('corazones')) {
      return "❤️ *Vela Corazón* - Perfecta para San Valentín:\n• Medidas: 8cm altura × 6cm ancho\n• Peso: 120gr\n• Duración: 15-20 horas\n• Precio detalle: $15.900 (unitario) / $42.000 (pack 3)\n• Precio mayorista: $13.500 (unitario) / $36.000 (pack 3)\n• Aroma: Romántico y especial\n\n¡Ideal para expresar amor!";
    }
    
    if (lowerMessage.includes('vainilla') || lowerMessage.includes('acariciante')) {
      return "🍯 *Vela Vainilla Acariciante*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $35.900 y $42.900\n• Precio mayorista: $31.000 y $38.000\n• Aroma: Dulce y acogedor\n• Perfecta para: Cenas románticas y momentos íntimos\n\n¿Te gusta el aroma dulce?";
    }
    
    if (lowerMessage.includes('chocolate') || lowerMessage.includes('tentador')) {
      return "🍫 *Vela Chocolate Tentador*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $36.900 y $43.900\n• Precio mayorista: $32.000 y $39.000\n• Aroma: Irresistible de chocolate\n• Ideal para: Regalos dulces y momentos especiales\n\n¿Te gusta el chocolate?";
    }
    
    if (lowerMessage.includes('fresa') || lowerMessage.includes('dulce')) {
      return "🍓 *Vela Fresa Dulce*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $34.900 y $41.900\n• Precio mayorista: $30.000 y $37.000\n• Aroma: Fresco y dulce de fresa\n• Perfecta para: Amistad y momentos alegres\n\n¿Te gusta el aroma frutal?";
    }
    
    if (lowerMessage.includes('canela') || lowerMessage.includes('calida') || lowerMessage.includes('cálida')) {
      return "🧡 *Vela Canela Cálida*:\n• Tamaño: 6×6 y 6×10\n• Precio detalle: $33.900 y $40.900\n• Precio mayorista: $29.000 y $36.000\n• Aroma: Cálido y especiado\n• Ideal para: Momentos acogedores y románticos\n\n¿Te gusta el aroma especiado?";
    }
    
    if (lowerMessage.includes('amor') || lowerMessage.includes('amistad') || lowerMessage.includes('san valentin') || lowerMessage.includes('valentín') || lowerMessage.includes('romantico') || lowerMessage.includes('romántico')) {
      return "💕 *Catálogo Amor y Amistad*:\n• Vela Corazón - $15.900 (especial San Valentín)\n• Vela Rosa Aromática - $38.900 (romántica)\n• Vela Vainilla Acariciante - $35.900 (dulce)\n• Vela Chocolate Tentador - $36.900 (tentadora)\n• Vela Fresa Dulce - $34.900 (amistad)\n• Vela Canela Cálida - $33.900 (acogedora)\n\n¡Cada vela cuenta una historia de amor!";
    }
    
    // Productos de Navidad
    if (lowerMessage.includes('navidad') || lowerMessage.includes('navideño') || lowerMessage.includes('navideña') || lowerMessage.includes('pino') || lowerMessage.includes('especias navideñas')) {
      return "🎄 *Catálogo de Navidad*:\n• Vela Pino Navideño 6×6 - $42.900 (fresco)\n• Vela Canela Navideña 6×6 - $39.900 (cálida)\n• Vela Vainilla Navideña 6×6 - $41.900 (dulce)\n• Vela Chocolate Navideño 6×6 - $43.900 (tentador)\n• Vela Manzana Canela 6×6 - $40.900 (festiva)\n• Vela Especias Navideñas 6×6 - $44.900 (mágica)\n\n¡Ilumina tus fiestas con aromas mágicos!";
    }
    
    // Productos de Primera Comunión
    if (lowerMessage.includes('primera comunion') || lowerMessage.includes('comunión') || lowerMessage.includes('sagrado') || lowerMessage.includes('sagrada') || lowerMessage.includes('incienso') || lowerMessage.includes('mirra') || lowerMessage.includes('sándalo') || lowerMessage.includes('sandalo')) {
      return "✝️ *Catálogo Primera Comunión*:\n• Vela Blanca Sagrada 6×6 - $45.900 (ceremonial)\n• Vela Incienso Sagrado 6×6 - $47.900 (espiritual)\n• Vela Sándalo Sagrado 6×6 - $49.900 (divina)\n• Vela Rosa Sagrada 6×6 - $46.900 (pura)\n• Vela Lavanda Sagrada 6×6 - $44.900 (serena)\n• Vela Mirra Sagrada 6×6 - $48.900 (ceremonial)\n\n¡Velas especiales para momentos sagrados!";
    }
    
    if (lowerMessage.includes('bogota') || lowerMessage.includes('bogotá')) {
      return "🏙️ *Envíos en Bogotá:*\n• Tiempo: 1-2 días hábiles\n• Costo: Gratis en compras > $100.000\n• Opciones: Contra entrega o transferencia\n\n¿Quieres hacer tu pedido?";
    }
    
    // Default response
    return getRandomResponse('default');
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