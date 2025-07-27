// Efectos de partículas flotantes
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
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

// Efecto parallax en scroll
function parallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .producto');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Animación de aparición al hacer scroll
function scrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  const elements = document.querySelectorAll('.producto, .nosotros, .contacto');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
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
  customCursor();
  addRippleEffect();
  
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

function agregarCarrito(nombre) {
  // Buscar el producto en la lista
  const productos = {
    'Cedro Verbena 6×6': { precio: 32900, imagen: 'assets/productos/vela1.svg' },
    'Tilo Bamboo 6×6': { precio: 32900, imagen: 'assets/productos/vela2.svg' },
    'Cedro Verbena 6×10': { precio: 39900, imagen: 'assets/productos/vela3.svg' }
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
  
  // Mostrar notificación
  showNotification(`🛒 ¡"${nombre}" añadido al carrito!`);
  
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
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
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
  const numeroWhatsApp = '573008220389';
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
  
  // Abrir WhatsApp en nueva pestaña
  window.open(urlWhatsApp, '_blank');
  
  // Mostrar notificación
  showNotification('📱 ¡Redirigiendo a WhatsApp con tu pedido!');
  
  // Limpiar carrito después de un pequeño delay
  setTimeout(() => {
    cart = [];
    updateCart();
    toggleCart();
  }, 2000);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #4CAF50, #45a049);
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    font-weight: 600;
    font-size: 1.1rem;
  `;
  notification.innerHTML = message;
  
  document.body.appendChild(notification);
  
  // Animación de entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animación de salida
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
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