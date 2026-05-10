/* ================================================================
   tutorial-steps.js  v2
   ─ Panel arrastrable (no tapa la papelera)
   ─ Flecha SVG animada apuntando a la categoría del toolbox
   ─ Highlight del ítem de toolbox con glow
   ─ Categorías/subcategorías reales del index.html
================================================================ */

/* ─── 1. DATOS CON RUTAS REALES DEL TOOLBOX ─────────────────── */

var TUTORIALS = {

  led_basico: {
    title: "LED Básico",
    icon: "💡",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Abre la categoría <b>Inicio</b> y arrastra el bloque <em>runstart</em> al área de trabajo. Es el punto de partida de todos los proyectos.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart (Al iniciar / Repetir siempre)"
      },
      {
        titulo: "Inicializa el LED",
        desc: "Ve a <b>LEDs</b> › <b>LED</b> y arrastra el bloque <em>Inicializar LED</em>. El pin por defecto es el <b>2</b> (LED integrado del ESP32).",
        categoria: "LEDs",
        subcategoria: null,
        bloque: "led_init — Inicializar LED"
      },
      {
        titulo: "Enciende el LED",
        desc: "Desde <b>LEDs</b> › <b>LED</b> agrega el bloque <em>Establecer LED</em> con estado <b>1</b> (encendido) dentro de <em>Repetir siempre</em>.",
        categoria: "LEDs",
        subcategoria: "LED",
        bloque: "set_led — Establecer LED (1=ON)"
      },
      {
        titulo: "Espera 1 segundo",
        desc: "Ve a la categoría <b>Tiempo</b> y agrega el bloque <em>time.sleep</em>. Pon el valor <b>1</b> segundo.",
        categoria: "Tiempo",
        subcategoria: null,
        bloque: "time_sleep — Esperar"
      },
      {
        titulo: "Apaga el LED",
        desc: "Agrega otro <em>Establecer LED</em> con estado <b>0</b> (apagado) y otro <em>time.sleep(1)</em>. ¡El LED parpadeará cada segundo!",
        categoria: "LEDs",
        subcategoria: "LED",
        bloque: "set_led — Establecer LED (0=OFF)"
      }
    ]
  },

  semaforo: {
    title: "Semáforo",
    icon: "🚦",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde la categoría <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Inicializa el semáforo",
        desc: "Ve a <b>LEDs</b> › <b>Semáforo (Leds)</b> y arrastra <em>Inicializar Semáforo</em>. Pines: Verde=18, Amarillo=19, Rojo=23.",
        categoria: "LEDs",
        subcategoria: "Semáforo (Leds)",
        bloque: "init_semaforo — Inicializar Semáforo"
      },
      {
        titulo: "Fase ROJO",
        desc: "Desde <b>LEDs</b> › <b>Semáforo (Leds)</b> agrega <em>Establecer Semáforo</em> con R=1, G=0, Y=0. Luego <em>time.sleep(3)</em> de <b>Tiempo</b>.",
        categoria: "LEDs",
        subcategoria: "Semáforo (Leds)",
        bloque: "set_semaforo — Establecer Semáforo"
      },
      {
        titulo: "Fase AMARILLO",
        desc: "Agrega otro <em>Establecer Semáforo</em> con Y=1, R=0, G=0 y <em>time.sleep(1)</em>.",
        categoria: "LEDs",
        subcategoria: "Semáforo (Leds)",
        bloque: "set_semaforo — Establecer Semáforo"
      },
      {
        titulo: "Fase VERDE",
        desc: "Agrega <em>Establecer Semáforo</em> con G=1, R=0, Y=0 y <em>time.sleep(2)</em>. El ciclo se repite automáticamente.",
        categoria: "LEDs",
        subcategoria: "Semáforo (Leds)",
        bloque: "set_semaforo — Establecer Semáforo"
      }
    ]
  },

  boton: {
    title: "Botón",
    icon: "🔘",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Inicializa el interruptor",
        desc: "Ve a <b>Interruptores</b> › <b>Interruptores</b> y arrastra <em>Inicializar interruptor</em>. Asigna el pin del botón (ej. <b>15</b>).",
        categoria: "Interruptores",
        subcategoria: "Interruptores",
        bloque: "interruptor_init — Inicializar interruptor"
      },
      {
        titulo: "Inicializa el LED",
        desc: "Ve a <b>LEDs</b> › <b>LED</b> y agrega <em>Inicializar LED</em> en el pin <b>2</b>.",
        categoria: "LEDs",
        subcategoria: "LED",
        bloque: "led_init — Inicializar LED"
      },
      {
        titulo: "Lee el botón",
        desc: "Desde <b>Interruptores</b> › <b>Interruptores</b> agrega <em>Leer interruptor</em>. Envuélvelo en un <em>Si … hacer</em> de la categoría <b>Lógica</b>.",
        categoria: "Interruptores",
        subcategoria: "Interruptores",
        bloque: "interruptor_read — Leer interruptor"
      },
      {
        titulo: "Controla el LED",
        desc: "Si el botón está presionado (<em>Si</em>): pon el LED en <b>1</b>. En el <em>Sino</em>: ponlo en <b>0</b>.",
        categoria: "LEDs",
        subcategoria: "LED",
        bloque: "set_led — Establecer LED"
      }
    ]
  },

  buzzer: {
    title: "Buzzer",
    icon: "🔊",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Genera un tono",
        desc: "Ve a <b>Actuadores</b> › <b>Sounds (Buzzer)</b> y arrastra el bloque <em>Tono Buzzer</em>. Frecuencia <b>440 Hz</b> = nota La.",
        categoria: "Actuadores",
        subcategoria: "Sounds (Buzzer)",
        bloque: "buzzer_tone — Tono Buzzer"
      },
      {
        titulo: "Espera",
        desc: "Ve a <b>Tiempo</b> y agrega <em>time.sleep</em> con <b>0.5</b> segundos.",
        categoria: "Tiempo",
        subcategoria: null,
        bloque: "time_sleep — Esperar"
      },
      {
        titulo: "Detén el tono",
        desc: "Desde <b>Actuadores</b> › <b>Sounds (Buzzer)</b> agrega <em>Detener Buzzer</em> y otro <em>time.sleep(0.5)</em>.",
        categoria: "Actuadores",
        subcategoria: "Sounds (Buzzer)",
        bloque: "buzzer_stop — Detener Buzzer"
      },
      {
        titulo: "Crea una melodía",
        desc: "Repite bloques <em>Tono</em> con distintas frecuencias: <b>262</b> Do, <b>330</b> Mi, <b>392</b> Sol, <b>523</b> Do alto.",
        categoria: "Actuadores",
        subcategoria: "Sounds (Buzzer)",
        bloque: "buzzer_tone — Tono Buzzer"
      }
    ]
  },

  servo: {
    title: "Servo Motor",
    icon: "⚙️",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Inicializa el Servo",
        desc: "Ve a <b>Actuadores</b> › <b>Servo</b> y arrastra <em>Inicializar Servo</em>. Selecciona el pin PWM (ej. <b>13</b>).",
        categoria: "Actuadores",
        subcategoria: "Servo",
        bloque: "init_servo — Inicializar Servo"
      },
      {
        titulo: "Mueve a 0°",
        desc: "Desde <b>Actuadores</b> › <b>Servo</b> agrega <em>Mover Servo</em> con ángulo <b>0</b>. Luego <em>time.sleep(1)</em>.",
        categoria: "Actuadores",
        subcategoria: "Servo",
        bloque: "move_servo — Mover Servo"
      },
      {
        titulo: "Mueve a 90° y 180°",
        desc: "Agrega <em>Mover Servo a 90°</em> con delay y <em>Mover Servo a 180°</em> con delay. El servo oscilará entre las tres posiciones.",
        categoria: "Actuadores",
        subcategoria: "Servo",
        bloque: "move_servo — Mover Servo"
      }
    ]
  },

  ultrasonico: {
    title: "Sensor Ultrasónico",
    icon: "📡",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Inicializa el HC-SR04",
        desc: "Ve a <b>Sensores</b> › <b>Sensores Digitales</b> › <b>Ultrasonico</b> y arrastra <em>Inicializar HC-SR04</em>. TRIG=<b>12</b>, ECHO=<b>13</b>.",
        categoria: "Sensores",
        subcategoria: "Ultrasonico",
        bloque: "init_ultrasonic_hcsr04"
      },
      {
        titulo: "Lee la distancia",
        desc: "Desde la misma subcategoría arrastra <em>Leer HC-SR04</em>. Guárdalo en una variable <em>distancia</em> de la categoría <b>Variables</b>.",
        categoria: "Sensores",
        subcategoria: "Ultrasonico",
        bloque: "read_ultrasonic_hcsr04 — Leer distancia"
      },
      {
        titulo: "Imprime el resultado",
        desc: "Ve a <b>Textos</b> y usa <em>print()</em> para mostrar <em>distancia</em>. Abre la terminal para ver los centímetros en tiempo real.",
        categoria: "Textos",
        subcategoria: null,
        bloque: "text_print — print()"
      }
    ]
  },

  neopixel_basico: {
    title: "NeoPixel RGB",
    icon: "🌈",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>runstart</em> desde <b>Inicio</b>.",
        categoria: "Inicio",
        subcategoria: null,
        bloque: "runstart"
      },
      {
        titulo: "Elige un color",
        desc: "Ve a la categoría <b>Colores</b> y selecciona un color del picker. Combinarás R, G y B para obtener el color que quieras.",
        categoria: "Colores",
        subcategoria: null,
        bloque: "color_picker — Selector de color"
      },
      {
        titulo: "Inicializa y enciende el NeoPixel",
        desc: "Busca los bloques de <b>NeoPixel</b> en el toolbox, configura pin=<b>4</b> y cantidad=<b>8</b> LEDs. Luego usa <em>Establecer color</em> y <em>Mostrar (show)</em>.",
        categoria: "LEDs",
        subcategoria: null,
        bloque: "NeoPixel — Inicializar / Establecer color"
      },
      {
        titulo: "Efecto arcoíris",
        desc: "Usa un bloque <em>Repetir</em> de la categoría <b>Ciclos</b> con variable <em>i</em> del 0 al 7. En cada iteración asigna un color diferente a cada LED.",
        categoria: "Ciclos",
        subcategoria: null,
        bloque: "controls_for — Para i de 0 a 7"
      }
    ]
  }
};

/* ─── 2. LÓGICA PRINCIPAL ────────────────────────────────────── */

var TutorialSteps = {
  tutorial: null,
  paso: 0,
  _arrowEl: null,
  _glowEl:  null,
  _rafId:   null,

  cargar: function(id) {
    if (!id) { this.cerrar(); return; }
    var tut = TUTORIALS[id];
    if (!tut) return;
    this.tutorial = tut;
    this.paso = 0;
    document.getElementById('ts-panel').style.display = 'flex';
    this._renderPaso();
  },

  siguiente: function() {
    if (!this.tutorial) return;
    if (this.paso < this.tutorial.steps.length - 1) {
      this.paso++;
      this._renderPaso();
    } else {
      this._mostrarFin();
    }
  },

  anterior: function() {
    if (!this.tutorial || this.paso === 0) return;
    this.paso--;
    this._renderPaso();
  },

  cerrar: function() {
    this._limpiarHighlight();
    this.tutorial = null;
    this.paso = 0;
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'none';
    var sel = document.getElementById('tutorialSelect');
    if (sel) sel.value = '';
  },

  _renderPaso: function() {
    var tut   = this.tutorial;
    var step  = tut.steps[this.paso];
    var total = tut.steps.length;

    document.getElementById('ts-icon').textContent  = tut.icon;
    document.getElementById('ts-title').textContent = tut.title;

    var pct = Math.round(((this.paso + 1) / total) * 100);
    document.getElementById('ts-progress-fill').style.width = pct + '%';
    document.getElementById('ts-progress-txt').textContent  =
      'Paso ' + (this.paso + 1) + ' de ' + total;

    document.getElementById('ts-step-num').textContent   = this.paso + 1;
    document.getElementById('ts-step-title').textContent = step.titulo;
    document.getElementById('ts-step-desc').innerHTML    = step.desc;

    // Ruta de navegación
    var rutaHTML = '<span class="ts-cat-part">' + step.categoria + '</span>';
    if (step.subcategoria) {
      rutaHTML += '<span class="ts-cat-sep">›</span>' +
                  '<span class="ts-cat-part">' + step.subcategoria + '</span>';
    }
    document.getElementById('ts-cat-ruta').innerHTML  = rutaHTML;
    document.getElementById('ts-bloque-chip').textContent = step.bloque;

    document.getElementById('ts-btn-prev').disabled = (this.paso === 0);
    document.getElementById('ts-btn-next').textContent =
      (this.paso === total - 1) ? '¡Terminar! 🎉' : 'Siguiente →';

    var body = document.getElementById('ts-body');
    body.classList.remove('ts-anim');
    void body.offsetWidth;
    body.classList.add('ts-anim');

    // Highlight toolbox
    this._limpiarHighlight();
    // Intenta resaltar primero la subcategoría, si no la categoría padre
    var target = null;
    if (step.subcategoria) target = this._findToolboxItem(step.subcategoria);
    if (!target) target = this._findToolboxItem(step.categoria);
    if (target) {
      target.classList.add('ts-toolbox-glow');
      this._glowEl = target;
      this._crearFlecha(target);
    }
  },

  _findToolboxItem: function(nombre) {
    if (!nombre) return null;
    var rows = document.querySelectorAll('.blocklyTreeRow');
    for (var i = 0; i < rows.length; i++) {
      var label = rows[i].querySelector('.blocklyTreeLabel');
      if (label && label.textContent.trim() === nombre.trim()) {
        return rows[i];
      }
    }
    return null;
  },

  _crearFlecha: function(target) {
    var self = this;
    if (self._arrowEl)  { self._arrowEl.remove();  self._arrowEl = null; }
    if (self._rafId)    { cancelAnimationFrame(self._rafId); self._rafId = null; }

    var arrow = document.createElement('div');
    arrow.id = 'ts-arrow';
    arrow.innerHTML =
      '<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">' +
      '  <defs><filter id="tsgf">' +
      '    <feGaussianBlur stdDeviation="2.5" result="b"/>' +
      '    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '  </filter></defs>' +
      '  <line x1="4" y1="16" x2="48" y2="16" stroke="#7c6af7" stroke-width="4"' +
      '    stroke-linecap="round" filter="url(#tsgf)"/>' +
      '  <polygon points="46,6 62,16 46,26" fill="#7c6af7" filter="url(#tsgf)"/>' +
      '</svg>';
    document.body.appendChild(arrow);
    self._arrowEl = arrow;

    function posicionar() {
      if (!self._arrowEl) return;
      var r   = target.getBoundingClientRect();
      var midY = r.top + r.height / 2;
      arrow.style.left = (r.right + 8) + 'px';
      arrow.style.top  = (midY - 16) + 'px';
      self._rafId = requestAnimationFrame(posicionar);
    }
    posicionar();
  },

  _limpiarHighlight: function() {
    if (this._glowEl)  { this._glowEl.classList.remove('ts-toolbox-glow'); this._glowEl = null; }
    if (this._arrowEl) { this._arrowEl.remove(); this._arrowEl = null; }
    if (this._rafId)   { cancelAnimationFrame(this._rafId); this._rafId = null; }
  },

  _mostrarFin: function() {
    this._limpiarHighlight();
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-fin">' +
      '  <div class="ts-fin-icon">🎉</div>' +
      '  <h3>¡Tutorial completado!</h3>' +
      '  <p>Terminaste <strong>' + this.tutorial.title + '</strong>.<br>' +
      '     Prueba cambiar valores o elige otro tutorial.</p>' +
      '  <button class="ts-btn ts-btn-primary" onclick="TutorialSteps._reiniciar()">Repetir</button>' +
      '</div>';
    document.getElementById('ts-btn-next').style.display = 'none';
    document.getElementById('ts-btn-prev').style.display = 'none';
  },

  _reiniciar: function() {
    document.getElementById('ts-btn-next').style.display = '';
    document.getElementById('ts-btn-prev').style.display = '';
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-step-header">' +
      '  <span class="ts-step-num" id="ts-step-num">1</span>' +
      '  <h3 class="ts-step-title" id="ts-step-title"></h3>' +
      '</div>' +
      '<p class="ts-step-desc" id="ts-step-desc"></p>' +
      '<div class="ts-cat-box">' +
      '  <div class="ts-cat-label">📂 Ve al toolbox:</div>' +
      '  <div class="ts-cat-ruta" id="ts-cat-ruta"></div>' +
      '  <div class="ts-bloque-row">' +
      '    <span class="ts-bloque-icon">🧩</span>' +
      '    <span class="ts-bloque-chip" id="ts-bloque-chip"></span>' +
      '  </div>' +
      '</div>';
    this.paso = 0;
    this._renderPaso();
  }
};

/* ─── 3. DRAG ────────────────────────────────────────────────── */

function makeDraggable(panel) {
  var header = panel.querySelector('.ts-header');
  if (!header) return;
  header.style.cursor = 'grab';

  var drag = false, sx, sy, ol, ot;

  header.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('ts-close')) return;
    drag = true;
    sx = e.clientX; sy = e.clientY;
    var r = panel.getBoundingClientRect();
    ol = r.left; ot = r.top;
    panel.style.right = panel.style.bottom = 'auto';
    panel.style.left  = ol + 'px';
    panel.style.top   = ot + 'px';
    header.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!drag) return;
    panel.style.left = Math.max(0, ol + e.clientX - sx) + 'px';
    panel.style.top  = Math.max(48, ot + e.clientY - sy) + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (drag) { drag = false; header.style.cursor = 'grab'; }
  });
}

/* ─── 4. INICIALIZACIÓN ─────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {

  var panel = document.createElement('div');
  panel.id = 'ts-panel';
  panel.style.display = 'none';
  panel.innerHTML =
    '<div class="ts-header">' +
    '  <span class="ts-icon" id="ts-icon">📖</span>' +
    '  <div class="ts-title-group">' +
    '    <p class="ts-label">Tutorial guiado &nbsp;·&nbsp; <span class="ts-drag-hint">✥ arrastrar</span></p>' +
    '    <h2 class="ts-title" id="ts-title">—</h2>' +
    '  </div>' +
    '  <button class="ts-close" id="ts-close" title="Cerrar">✕</button>' +
    '</div>' +
    '<div class="ts-progress-bar"><div class="ts-progress-fill" id="ts-progress-fill"></div></div>' +
    '<p class="ts-progress-txt" id="ts-progress-txt"></p>' +
    '<div class="ts-body" id="ts-body">' +
    '  <div class="ts-step-header">' +
    '    <span class="ts-step-num" id="ts-step-num">1</span>' +
    '    <h3 class="ts-step-title" id="ts-step-title"></h3>' +
    '  </div>' +
    '  <p class="ts-step-desc" id="ts-step-desc"></p>' +
    '  <div class="ts-cat-box">' +
    '    <div class="ts-cat-label">📂 Ve al toolbox:</div>' +
    '    <div class="ts-cat-ruta" id="ts-cat-ruta"></div>' +
    '    <div class="ts-bloque-row">' +
    '      <span class="ts-bloque-icon">🧩</span>' +
    '      <span class="ts-bloque-chip" id="ts-bloque-chip"></span>' +
    '    </div>' +
    '  </div>' +
    '</div>' +
    '<div class="ts-footer">' +
    '  <button class="ts-btn ts-btn-sec" id="ts-btn-prev">← Anterior</button>' +
    '  <button class="ts-btn ts-btn-primary" id="ts-btn-next">Siguiente →</button>' +
    '</div>';

  document.body.appendChild(panel);

  document.getElementById('ts-close').addEventListener('click', function()   { TutorialSteps.cerrar();    });
  document.getElementById('ts-btn-next').addEventListener('click', function() { TutorialSteps.siguiente(); });
  document.getElementById('ts-btn-prev').addEventListener('click', function() { TutorialSteps.anterior();  });

  var sel = document.getElementById('tutorialSelect');
  if (sel) sel.addEventListener('change', function() { TutorialSteps.cargar(this.value); });

  makeDraggable(panel);
});