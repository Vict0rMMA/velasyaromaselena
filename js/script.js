// Efectos de partículas doradas sutiles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Efecto de escritura para el título
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Animación de scroll suave
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Efecto parallax en scroll (solo para hero)
function parallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElement = document.querySelector('.hero');
    
    if (heroElement) {
      const speed = 0.3; // Reducido para ser más sutil
      heroElement.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
}

// Animación de aparición al hacer scroll
function scrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Una vez que aparece, ya no necesitamos observar
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Se activa un poco antes
  });

  const elements = document.querySelectorAll('.producto, .nosotros, .contacto');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)'; // Reducido de 50px a 30px
    el.style.transition = 'all 0.5s ease'; // Reducido de 0.6s a 0.5s
    observer.observe(el);
  });
}

// Efecto de cursor personalizado
function customCursor() {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  // Efecto al hacer hover en elementos interactivos
  const interactiveElements = document.querySelectorAll('a, button, .producto');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}



// Efecto de ondas en los botones
function addRippleEffect() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Inicializar todos los efectos
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  smoothScroll();
  parallaxEffect();
  scrollAnimation();
  // customCursor(); // Desactivado temporalmente para mejor performance
  addRippleEffect();
  initHamburgerMenu();
  loadCartFromStorage();
  
  // Efecto de escritura en el título principal
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }
  
  // Efecto de contador en los precios
  const prices = document.querySelectorAll('.precio');
  prices.forEach(price => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(price);
  });
});

// Función para el menú hamburguesa
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburgerMenu');
  const nav = document.getElementById('navMenu');
  
  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  }
  
  hamburger.addEventListener('click', toggleMenu);
  
  // Soporte para teclado
  hamburger.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
  
  // Cerrar menú al hacer clic en un enlace
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
  
  // Cerrar menú con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// Animación de contador para precios
function animateCounter(element) {
  const text = element.textContent;
  const number = text.match(/\$[\d,]+/);
  
  if (number) {
    const targetNumber = parseInt(number[0].replace(/[$,]/g, ''));
    let currentNumber = 0;
    const increment = targetNumber / 50;
    
    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(timer);
      }
      element.textContent = text.replace(number[0], `$${Math.floor(currentNumber).toLocaleString()}`);
    }, 30);
  }
}

// Variables globales para el carrito
let cart = [];
let cartTotal = 0;

// Funciones para localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem('velasElenaCart', JSON.stringify(cart));
  } catch (e) {
    console.log('Error al guardar carrito:', e);
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
    console.log('Error al cargar carrito:', e);
    cart = [];
  }
}

// Función para scroll a secciones
function scrollToSection(sectionId) {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}



// Funciones del carrito
function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const overlay = document.querySelector('.cart-overlay');
  
  if (cartSidebar.classList.contains('open')) {
    cartSidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  } else {
    cartSidebar.classList.add('open');
    if (!overlay) {
      const newOverlay = document.createElement('div');
      newOverlay.className = 'cart-overlay';
      newOverlay.onclick = toggleCart;
      document.body.appendChild(newOverlay);
      setTimeout(() => newOverlay.classList.add('active'), 10);
    } else {
      overlay.classList.add('active');
    }
  }
}

// Agregar soporte para teclado en el carrito
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar && cartSidebar.classList.contains('open')) {
      toggleCart();
    }
  }
});

function agregarCarrito(nombre) {
  // Buscar el producto en la lista
  const productos = {
    'Cedro Verbena 6×6': { precio: 32900, imagen: 'assets/productos/vela1.svg' },
    'Tilo Bamboo 6×6': { precio: 32900, imagen: 'assets/productos/vela2.svg' },
    'Cedro Verbena 6×10': { precio: 39900, imagen: 'assets/productos/vela3.svg' },
    'Lavanda Relajante 6×6': { precio: 35900, imagen: 'assets/productos/vela4.svg' },
    'Rosa Silvestre 6×6': { precio: 38900, imagen: 'assets/productos/vela5.svg' },
    'Menta Eucalipto 6×6': { precio: 33900, imagen: 'assets/productos/vela6.svg' },
    'Lavanda Relajante 6×10': { precio: 42900, imagen: 'assets/productos/vela7.svg' },
    'Rosa Silvestre 6×10': { precio: 45900, imagen: 'assets/productos/vela8.svg' },
    'Set 3 Velas 6×6': { precio: 89900, imagen: 'assets/productos/vela9.svg' }
  };
  
  const producto = productos[nombre];
  if (!producto) return;
  
  // Verificar si ya existe en el carrito
  const existingItem = cart.find(item => item.nombre === nombre);
  
  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    cart.push({
      nombre: nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  // Actualizar carrito
  updateCart();
  saveCartToStorage();
  
  // Mostrar notificación
  showNotification(`¡"${nombre}" añadido!`);
  
  // Efecto de vibración en el botón
  const button = event.target;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotalElement = document.getElementById('cartTotal');
  
  // Actualizar contador
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalItems;
  
  // Actualizar total
  cartTotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  cartTotalElement.textContent = `$${cartTotal.toLocaleString()} COP`;
  
  // Actualizar items
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="color: #888; text-align: center; margin-top: 50px;">Tu carrito está vacío</p>';
    return;
  }
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">$${item.precio.toLocaleString()} COP</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
          <span class="quantity-display">${item.cantidad}</span>
          <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
          <button class="remove-item" onclick="removeItem(${index})">Eliminar</button>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
}

function changeQuantity(index, change) {
  const item = cart[index];
  const newQuantity = item.cantidad + change;
  
  if (newQuantity <= 0) {
    removeItem(index);
  } else {
    item.cantidad = newQuantity;
    updateCart();
    saveCartToStorage();
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  saveCartToStorage();
}

function checkout() {
  if (cart.length === 0) {
    showNotification('❌ Tu carrito está vacío');
    return;
  }
  
  // Crear mensaje para WhatsApp
  let mensaje = `🕯️ *PEDIDO - ELENA VELAS Y AROMAS* 🕯️\n\n`;
  mensaje += `*Hola! Quiero hacer el siguiente pedido:*\n\n`;
  
  cart.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    mensaje += `*${index + 1}. ${item.nombre}*\n`;
    mensaje += `   Cantidad: ${item.cantidad}\n`;
    mensaje += `   Precio: $${item.precio.toLocaleString()} COP\n`;
    mensaje += `   Subtotal: $${subtotal.toLocaleString()} COP\n\n`;
  });
  
  mensaje += `*TOTAL DEL PEDIDO: $${cartTotal.toLocaleString()} COP*\n\n`;
  mensaje += `📱 *Información de contacto:*\n`;
  mensaje += `   Nombre: _________________\n`;
  mensaje += `   Dirección: _________________\n`;
  mensaje += `   Teléfono: _________________\n\n`;
  mensaje += `✨ *¡Gracias por elegir nuestras velas artesanales!* ✨`;
  
  // Codificar el mensaje para WhatsApp
  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroWhatsApp = '573008220389'; // WhatsApp principal
  const urlWhatsApp = `https://api.whatsapp.com/send/?phone=${numeroWhatsApp}&text=${mensajeCodificado}&type=phone_number&app_absent=0`;
  
  // Abrir WhatsApp en nueva pestaña
  window.open(urlWhatsApp, '_blank');
  
  // Mostrar notificación
  showNotification('📱 ¡Redirigiendo a WhatsApp con tu pedido!');
  
  // Limpiar carrito después de un pequeño delay
  setTimeout(() => {
    cart = [];
    updateCart();
    saveCartToStorage();
    toggleCart();
  }, 2000);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #25D366, #128C7E);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.15s ease;
    font-weight: 600;
    font-size: 0.9rem;
    max-width: 280px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  `;
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message} <i class="fas fa-times" style="margin-left: auto; opacity: 0.7;"></i>`;
  
  // Permitir cerrar la notificación haciendo clic
  notification.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 150);
  });
  
  document.body.appendChild(notification);
  
  // Animación de entrada instantánea
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });
  
  // Animación de salida más rápida (0.8 segundos)
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 150);
  }, 800);
}

// Agregar animación de ripple al CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style); 