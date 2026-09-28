// FUNCIONES DE MODALES EN EL ÁMBITO GLOBAL (Para que funcionen con los onclick="..." del HTML)
window.openModal = (id) => {
  const m = document.getElementById(id);
  if (m) {
    m.classList.remove('hidden-section');
  }
};

window.closeModal = (id, event) => {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const m = document.getElementById(id);
  if (m) {
    m.classList.add('hidden-section');
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // 1. INICIALIZACIÓN ÚNICA DE ICONOS LUCIDE
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. MENÚ MOBILE
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // 3. EFECTO PARALLAX EN EL HERO BANNER
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (heroBg && scrollPosition < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
  });

  // 4. EFECTO SPOTLIGHT PARA MOUSE Y TOUCH (LUZ REVELADORA)
  const globalReveal = document.getElementById('global-reveal');
  const spotlightOverlay = document.querySelector('.spotlight-overlay');

  const updateSpotlight = (x, y) => {
    if (globalReveal) {
      globalReveal.style.setProperty('--x', `${x}px`);
      globalReveal.style.setProperty('--y', `${y}px`);
    }
    if (spotlightOverlay) {
      spotlightOverlay.style.setProperty('--x', `${x}px`);
      spotlightOverlay.style.setProperty('--y', `${y}px`);
    }
  };

  updateSpotlight(window.innerWidth / 2, window.innerHeight / 2);

 window.addEventListener('mousemove', (e) => {
  // 1. Si es un celular o tablet (< 768px), cancela la ejecución
  if (window.innerWidth <= 768) return;

  // 2. Solo actualiza el spotlight en computadoras/escritorio
  updateSpotlight(e.clientX, e.clientY);
});

// IMPORTANTE: NO agregues listener para 'touchmove' ni 'touchstart'

 

  // 5. FILTRADO DE LA GALERÍA POR CATEGORÍA
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 6. MODAL PARA AMPLIAR IMAGEN EN PANTALLA COMPLETA
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeImageModal = document.querySelector('.close-modal');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      if (fullSrc && modal && modalImg) {
        modalImg.src = fullSrc;
        modal.classList.add('active');
      }
    });
  });

  const cerrarModal = () => {
    if (modal) modal.classList.remove('active');
  };

  if (closeImageModal) closeImageModal.addEventListener('click', cerrarModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) cerrarModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });

  // 7. LÓGICA DE ACORDEÓN PARA PREGUNTAS FRECUENTES (FAQ ESTÁTICO DENTRO DEL MODAL)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // CIERRE DE MODALES HACIENDO CLIC FUERA DEL CONTENIDO
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden-section');
      }
    });
  });

  // 8. BOT CON PROCESAMIENTO DE TEXTO E INTERACCIÓN INTELIGENTE
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const typingIndicator = document.getElementById('typing-indicator');

  const showTyping = (show) => {
    if (typingIndicator) {
      typingIndicator.classList.toggle('hidden', !show);
    }
  };

  const addBotMsg = (text, delay = 500) => {
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      const msg = document.createElement('div');
      msg.className = 'msg-bot';
      msg.innerHTML = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, delay);
  };

  const addUserMsg = (text) => {
    const msg = document.createElement('div');
    msg.className = 'msg-user';
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // ANALIZADOR INTELIGENTE DE TEXTO CON RESPUESTAS NATURALES
  const processUserQuery = (query) => {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 1. SALUDOS
    if (/^(hola|buenas|buen dia|buenas tardes|buenas noches|que tal|ey|holaa+)/.test(q)) {
      addBotMsg("¡Hola! 👋 ¿Cómo estás? Contame en qué te puedo ayudar hoy o qué tipo de tatuaje tenés en mente.");
      return;
    }

    // 2. AGRADECIMIENTOS
    if (/(gracias|muchas gracias|genial|buenísimo|buenisimo|joya|espectacular|mil gracias|de diez|ok genial)/.test(q)) {
      addBotMsg("¡De nada! 😊 Si te surge cualquier otra duda o querés armar tu presupuesto, acá voy a estar.");
      return;
    }

    // 3. DESPEDIDAS
    if (/(chau|adios|nos vemos|hasta luego|chao)/.test(q)) {
      addBotMsg("¡Nos vemos! Que tengas un excelente día. 🎨");
      return;
    }

    // horarios
    if (/(horario|horarios|abren|abierto|cierran|cierre)/.test(q)) {
      addBotMsg("Nuestro horario de atención es de lunes a viernes de 10:00 a 20:00 y sábados de 10:00 a 18:00. ¡Te esperamos! ");
      return;
    }

    // dirección
    if (/(direccion|ubicacion|ubicación|donde|dónde|localizacion|localización)/.test(q)) {
      addBotMsg("Estamos ubicados en Av. Siempre Viva 742, Springfield. ¡Venite a conocernos! ");
      return;
    }

    // 4. PRECIOS / COTIZACIÓN
    if (/(cuanto|precio|cotiz|sale|costo|presupuesto|valor|hola quiero hacerme un tatuaje)/.test(q)) {
      addBotMsg("Para armar la solicitud de tu tatuaje según tamaño, zona y estilo, te abro el formulario. Te conectará directo con el artista por WhatsApp. 🚀");
      setTimeout(() => window.openModal('quote-modal'), 1200);
      return;
    }

    // 5. PREGUNTAS FRECUENTES (Tarjetas, Pagos, Turnos, Cuidados)
    if (/(tarjeta|pago|efectivo|turno|reserva|cuidar|curar|faq|ubica|donde|horario|acompañado)/.test(q)) {
      addBotMsg("Te abro la ventana con las Preguntas Frecuentes para que veas todos los detalles sobre medios de pago, reservas, ubicación y cuidados. 📋");
      setTimeout(() => window.openModal('faq-modal'), 1200);
      return;
    }

    // 6. RESPUESTA POR DEFECTO
    addBotMsg("¡Entendido! Si querés cotizar un tatuaje o consultar sobre medios de pago, reservas o cuidados, escribímelo o pedíme la información.");
  };

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      addUserMsg(text);
      chatInput.value = '';
      processUserQuery(text);
    });
  }

  // Mensaje inicial del Bot
  if (chatBody) {
    addBotMsg("👋 ¡Hola! Soy el asistente de Seven Tattoo. Escribime tu pregunta (por ejemplo: <i>'¿Aceptan tarjeta?'</i> o <i>'¿Dónde están ubicados?'</i>) y te ayudo al instante.");
  }

  // 9. LÓGICA DEL COTIZADOR (ACTUALIZACIÓN CONTINUA DE VALORES)
  const sizeRange = document.getElementById('size-range');
  const sizeValue = document.getElementById('size-value');
  const zoneSelect = document.getElementById('zone-select');
  const styleSelect = document.getElementById('style-select');
  const referenceFile = document.getElementById('reference-file');
  const fileNameDisplay = document.getElementById('file-name-display');
  const tentativeDate = document.getElementById('tentative-date');

  // Elementos del resumen
  const summaryZone = document.getElementById('summary-zone');
  const summaryStyle = document.getElementById('summary-style');
  const summarySize = document.getElementById('summary-size');
  const summaryFile = document.getElementById('summary-file');

  const updateQuoteSummary = () => {
    // 1. Actualización del slider de tamaño
    if (sizeRange) {
      const val = sizeRange.value;
      if (sizeValue) sizeValue.textContent = `${val} cm`;
      if (summarySize) summarySize.textContent = `${val} cm`;
    }

    // 2. Actualización de Zona
    if (zoneSelect && summaryZone) {
      summaryZone.textContent = zoneSelect.value;
    }

    // 3. Actualización de Estilo
    if (styleSelect && summaryStyle) {
      summaryStyle.textContent = styleSelect.value;
    }
  };

  // Eventos listeners para respuesta inmediata al arrastrar el slider
  if (sizeRange) {
    ['input', 'change'].forEach(evt => {
      sizeRange.addEventListener(evt, updateQuoteSummary);
    });
  }

  if (zoneSelect) zoneSelect.addEventListener('change', updateQuoteSummary);
  if (styleSelect) styleSelect.addEventListener('change', updateQuoteSummary);

  // Manejo de archivo adjunto
  if (referenceFile) {
    referenceFile.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const name = e.target.files[0].name;
        if (fileNameDisplay) fileNameDisplay.textContent = name;
        if (summaryFile) summaryFile.textContent = 'Cargada ✔';
      } else {
        if (fileNameDisplay) fileNameDisplay.textContent = 'Subir referencia';
        if (summaryFile) summaryFile.textContent = 'No adjuntada';
      }
    });
  }

  // Envío a WhatsApp
  const btnWhatsapp = document.getElementById('btn-whatsapp-quote');
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      const zone = zoneSelect ? zoneSelect.value : 'No especificado';
      const style = styleSelect ? styleSelect.value : 'No especificado';
      const size = sizeRange ? sizeRange.value : '10';
      const fecha = tentativeDate && tentativeDate.value ? tentativeDate.value : 'A coordinar';
      const tieneAdjunto = referenceFile && referenceFile.files.length > 0 ? 'Sí (la adjunto en el chat)' : 'No';

      const mensaje = `Hola Seven Tattoo! Quisiera consultar disponibilidad para un tatuaje:%0A%0A` +
        `📍 *Zona:* ${zone}%0A` +
        `🎨 *Estilo:* ${style}%0A` +
        `📏 *Tamaño aprox:* ${size} cm%0A` +
        `📅 *Fecha estimada:* ${fecha}%0A` +
        `📷 *Referencia:* ${tieneAdjunto}%0A%0A` +
        `¿Cómo podemos proseguir con el turno?`;

      const PHONE_NUMBER = "5491112345678"; // Recordá cambiarlo por tu número real
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${mensaje}`, '_blank');
      window.closeModal('quote-modal');
    });
  }

  // Ejecución inicial para fijar valores
  updateQuoteSummary();

});