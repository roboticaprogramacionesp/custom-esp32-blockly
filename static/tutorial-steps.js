/* ================================================================
   tutorial-steps.js
   Modal de tutoriales guiados paso a paso para 3DPit Blocks.
   Sin imports. Se incluye con <script src="..."> antes de main.js.
   Se engancha al <select id="tutorialSelect"> existente.
================================================================ */

/* ─── 1. DATOS DE TUTORIALES ───────────────────────────────── */

var TUTORIALS = {

  led_basico: {
    title: "LED Básico",
    icon: "💡",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Busca en la categoría <b>Inicio</b> el bloque <em>Al iniciar</em> y arrástralo al área de trabajo. Todos los proyectos empiezan aquí.",
        categoria: "Inicio",
        bloque: "Al iniciar"
      },
      {
        titulo: "Configura el pin del LED",
        desc: "Ve a <b>Pines digitales</b> y agrega el bloque <em>Configurar pin como salida</em>. Selecciona el <b>pin 2</b> (el LED integrado del ESP32).",
        categoria: "Pines digitales",
        bloque: "Configurar pin como salida"
      },
      {
        titulo: "Enciende el LED",
        desc: "Dentro del bloque <em>Repetir siempre</em>, agrega <em>Escribir pin digital</em> con valor <b>ALTO</b> en el pin 2.",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      },
      {
        titulo: "Pausa 1 segundo",
        desc: "Ve a la categoría <b>Tiempo</b> y agrega el bloque <em>Esperar</em>. Pon <b>1000</b> milisegundos.",
        categoria: "Tiempo",
        bloque: "Esperar ms"
      },
      {
        titulo: "Apaga el LED",
        desc: "Agrega otro bloque <em>Escribir pin digital</em> con valor <b>BAJO</b> y otro <em>Esperar 1000 ms</em>. ¡El LED parpadeará cada segundo!",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      }
    ]
  },

  semaforo: {
    title: "Semáforo",
    icon: "🚦",
    steps: [
      {
        titulo: "Bloque de inicio",
        desc: "Arrastra el bloque <em>Al iniciar</em> desde la categoría <b>Inicio</b>.",
        categoria: "Inicio",
        bloque: "Al iniciar"
      },
      {
        titulo: "Configura los 3 pines",
        desc: "Ve a <b>Pines digitales</b> y agrega 3 bloques <em>Configurar pin como salida</em>: pin <b>4</b> (rojo), pin <b>5</b> (amarillo), pin <b>18</b> (verde).",
        categoria: "Pines digitales",
        bloque: "Configurar pin como salida"
      },
      {
        titulo: "Fase ROJO",
        desc: "En <em>Repetir siempre</em>: enciende el pin 4 (<b>ALTO</b>) y espera <b>3000 ms</b>. Luego apágalo (<b>BAJO</b>).",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      },
      {
        titulo: "Fase AMARILLO",
        desc: "Enciende el pin 5 (<b>ALTO</b>), espera <b>1000 ms</b> y apágalo (<b>BAJO</b>).",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      },
      {
        titulo: "Fase VERDE",
        desc: "Enciende el pin 18 (<b>ALTO</b>), espera <b>2000 ms</b> y apágalo (<b>BAJO</b>). El ciclo se repite automáticamente.",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      }
    ]
  },

  boton: {
    title: "Botón",
    icon: "🔘",
    steps: [
      {
        titulo: "Configura los pines",
        desc: "En <em>Al iniciar</em> configura el pin <b>15</b> como <em>entrada con pull-up</em> (botón) y el pin <b>2</b> como <em>salida</em> (LED).",
        categoria: "Pines digitales",
        bloque: "Configurar pin como entrada"
      },
      {
        titulo: "Lee el botón",
        desc: "En <em>Repetir siempre</em> ve a <b>Variables</b>, crea <em>estadoBtn</em> y asígnale el bloque <em>Leer pin digital</em> del pin 15.",
        categoria: "Pines digitales",
        bloque: "Leer pin digital"
      },
      {
        titulo: "Agrega la condición",
        desc: "Ve a la categoría <b>Lógica</b> y agrega un bloque <em>Si … hacer</em>. La condición es: <em>estadoBtn = BAJO</em> (el botón envía LOW al presionarse).",
        categoria: "Lógica",
        bloque: "Si … hacer"
      },
      {
        titulo: "Controla el LED",
        desc: "Dentro del <em>Si</em>: enciende el LED (pin 2, ALTO). En el <em>Sino</em>: apágalo (pin 2, BAJO). ¡El LED sigue al botón!",
        categoria: "Pines digitales",
        bloque: "Escribir pin digital"
      }
    ]
  },

  buzzer: {
    title: "Buzzer",
    icon: "🔊",
    steps: [
      {
        titulo: "Configura el pin del buzzer",
        desc: "En <em>Al iniciar</em>, configura el pin <b>19</b> como <em>salida</em>.",
        categoria: "Pines digitales",
        bloque: "Configurar pin como salida"
      },
      {
        titulo: "Genera un tono",
        desc: "Ve a la categoría <b>Buzzer / Tono</b> y agrega el bloque <em>Tono en pin</em>. Usa pin <b>19</b>, frecuencia <b>440 Hz</b> (nota La).",
        categoria: "Buzzer / Tono",
        bloque: "Tono en pin"
      },
      {
        titulo: "Espera y detén el tono",
        desc: "Agrega <em>Esperar 500 ms</em> y luego el bloque <em>Detener tono</em> para silenciar el buzzer.",
        categoria: "Buzzer / Tono",
        bloque: "Detener tono"
      },
      {
        titulo: "Crea un ritmo",
        desc: "Repite los pasos con diferentes frecuencias: <b>262</b> Hz (Do), <b>330</b> Hz (Mi), <b>392</b> Hz (Sol) para crear una melodía sencilla.",
        categoria: "Buzzer / Tono",
        bloque: "Tono en pin"
      }
    ]
  },

  servo: {
    title: "Servo Motor",
    icon: "⚙️",
    steps: [
      {
        titulo: "Inicializa el servo",
        desc: "Ve a la categoría <b>Servo</b> y arrastra el bloque <em>Inicializar servo en pin</em>. Selecciona el pin <b>13</b> (PWM).",
        categoria: "Servo",
        bloque: "Inicializar servo en pin"
      },
      {
        titulo: "Mueve a 0°",
        desc: "En <em>Repetir siempre</em> agrega <em>Mover servo a</em> con ángulo <b>0</b> grados y espera <b>1000 ms</b>.",
        categoria: "Servo",
        bloque: "Mover servo a"
      },
      {
        titulo: "Mueve a 90°",
        desc: "Agrega otro bloque <em>Mover servo a</em> con ángulo <b>90</b> grados y espera <b>1000 ms</b>.",
        categoria: "Servo",
        bloque: "Mover servo a"
      },
      {
        titulo: "Mueve a 180°",
        desc: "Agrega un tercer bloque <em>Mover servo a</em> con ángulo <b>180</b> grados y espera <b>1000 ms</b>. El servo oscilará entre las tres posiciones.",
        categoria: "Servo",
        bloque: "Mover servo a"
      }
    ]
  },

  ultrasonico: {
    title: "Sensor Ultrasónico",
    icon: "📡",
    steps: [
      {
        titulo: "Configura los pines TRIG y ECHO",
        desc: "En <em>Al iniciar</em>, configura pin <b>5</b> como salida (TRIG) y pin <b>18</b> como entrada (ECHO).",
        categoria: "Pines digitales",
        bloque: "Configurar pin como salida"
      },
      {
        titulo: "Inicializa el sensor",
        desc: "Ve a la categoría <b>Sensores</b> y busca el bloque <em>Ultrasonido HC-SR04</em>. Asigna pin TRIG = 5 y ECHO = 18.",
        categoria: "Sensores",
        bloque: "Ultrasonido HC-SR04"
      },
      {
        titulo: "Lee la distancia",
        desc: "Crea una variable <em>distancia</em> y asígnale el bloque <em>Leer distancia en cm</em>.",
        categoria: "Sensores",
        bloque: "Leer distancia en cm"
      },
      {
        titulo: "Muestra el resultado",
        desc: "Ve a <b>Comunicación Serial</b> y agrega <em>Imprimir en consola</em> para mostrar la variable <em>distancia</em>. Conecta el ESP32 y abre la terminal para ver los datos.",
        categoria: "Comunicación Serial",
        bloque: "Imprimir en consola"
      }
    ]
  },

  neopixel_basico: {
    title: "NeoPixel RGB",
    icon: "🌈",
    steps: [
      {
        titulo: "Inicializa la tira NeoPixel",
        desc: "Ve a la categoría <b>NeoPixel</b> y arrastra el bloque <em>Inicializar NeoPixel</em>. Configura: pin <b>4</b>, cantidad <b>8</b> LEDs.",
        categoria: "NeoPixel",
        bloque: "Inicializar NeoPixel"
      },
      {
        titulo: "Enciende el primer LED en rojo",
        desc: "En <em>Repetir siempre</em> usa <em>Establecer color del LED</em>: índice <b>0</b>, color <b>rojo</b> (R:255 G:0 B:0).",
        categoria: "NeoPixel",
        bloque: "Establecer color del LED"
      },
      {
        titulo: "Muestra los cambios",
        desc: "Agrega el bloque <em>Mostrar (show)</em>. Sin este bloque los LEDs no se actualizan.",
        categoria: "NeoPixel",
        bloque: "Mostrar (show)"
      },
      {
        titulo: "Crea un efecto arcoíris",
        desc: "Usa un bloque <em>Repetir con i</em> del 0 al 7 para asignar un color diferente a cada LED. Experimenta mezclando los valores R, G, B.",
        categoria: "Loops",
        bloque: "Repetir con i"
      }
    ]
  }
};

/* ─── 2. ESTADO DEL TUTORIAL ───────────────────────────────── */

var TutorialSteps = {
  tutorial: null,
  paso: 0,

  /* Abre un tutorial por id */
  cargar: function(id) {
    if (!id) { this.cerrar(); return; }
    var tut = TUTORIALS[id];
    if (!tut) return;
    this.tutorial = tut;
    this.paso = 0;
    this._mostrarPanel();
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
    this.tutorial = null;
    this.paso = 0;
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'none';
    var sel = document.getElementById('tutorialSelect');
    if (sel) sel.value = '';
  },

  /* ── Render interno ──────────────────────────────────────── */

  _mostrarPanel: function() {
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'flex';
  },

  _renderPaso: function() {
    var tut   = this.tutorial;
    var step  = tut.steps[this.paso];
    var total = tut.steps.length;

    /* Encabezado */
    document.getElementById('ts-icon').textContent  = tut.icon;
    document.getElementById('ts-title').textContent = tut.title;

    /* Progreso */
    var pct = Math.round(((this.paso + 1) / total) * 100);
    document.getElementById('ts-progress-fill').style.width = pct + '%';
    document.getElementById('ts-progress-txt').textContent  =
      'Paso ' + (this.paso + 1) + ' de ' + total;

    /* Contenido */
    document.getElementById('ts-step-num').textContent   = this.paso + 1;
    document.getElementById('ts-step-title').textContent = step.titulo;
    document.getElementById('ts-step-desc').innerHTML    = step.desc;

    /* Pista de categoría + bloque */
    document.getElementById('ts-cat').innerHTML =
      '📂 Ve a <strong>' + step.categoria + '</strong> › ' +
      '<span class="ts-block-chip">' + step.bloque + '</span>';

    /* Botones */
    document.getElementById('ts-btn-prev').disabled = (this.paso === 0);
    document.getElementById('ts-btn-next').textContent =
      (this.paso === total - 1) ? '¡Terminar! 🎉' : 'Siguiente →';

    /* Animación */
    var body = document.getElementById('ts-body');
    body.classList.remove('ts-anim');
    void body.offsetWidth;
    body.classList.add('ts-anim');
  },

  _mostrarFin: function() {
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-fin">' +
      '  <div class="ts-fin-icon">🎉</div>' +
      '  <h3>¡Tutorial completado!</h3>' +
      '  <p>Terminaste <strong>' + this.tutorial.title + '</strong>.<br>' +
      '     Prueba cambiar los valores o carga otro tutorial.</p>' +
      '  <button class="ts-btn ts-btn-primary" onclick="TutorialSteps._reiniciar()">Repetir</button>' +
      '</div>';
    document.getElementById('ts-btn-next').style.display = 'none';
    document.getElementById('ts-btn-prev').style.display = 'none';
  },

  _reiniciar: function() {
    document.getElementById('ts-btn-next').style.display = '';
    document.getElementById('ts-btn-prev').style.display = '';
    this._reconstruirBody();
    this.paso = 0;
    this._renderPaso();
  },

  _reconstruirBody: function() {
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-step-header">' +
      '  <span class="ts-step-num" id="ts-step-num">1</span>' +
      '  <h3 class="ts-step-title" id="ts-step-title"></h3>' +
      '</div>' +
      '<p class="ts-step-desc" id="ts-step-desc"></p>' +
      '<div class="ts-cat" id="ts-cat"></div>';
  }
};

/* ─── 3. INICIALIZACIÓN ─────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {

  /* Inyectar el HTML del panel en el body */
  var panel = document.createElement('div');
  panel.id = 'ts-panel';
  panel.style.display = 'none';
  panel.innerHTML =
    /* Cabecera */
    '<div class="ts-header">' +
    '  <span class="ts-icon" id="ts-icon">📖</span>' +
    '  <div class="ts-title-group">' +
    '    <p class="ts-label">Tutorial guiado</p>' +
    '    <h2 class="ts-title" id="ts-title">—</h2>' +
    '  </div>' +
    '  <button class="ts-close" id="ts-close" title="Cerrar">✕</button>' +
    '</div>' +
    /* Barra de progreso */
    '<div class="ts-progress-bar"><div class="ts-progress-fill" id="ts-progress-fill"></div></div>' +
    '<p class="ts-progress-txt" id="ts-progress-txt"></p>' +
    /* Cuerpo */
    '<div class="ts-body ts-anim" id="ts-body">' +
    '  <div class="ts-step-header">' +
    '    <span class="ts-step-num" id="ts-step-num">1</span>' +
    '    <h3 class="ts-step-title" id="ts-step-title"></h3>' +
    '  </div>' +
    '  <p class="ts-step-desc" id="ts-step-desc"></p>' +
    '  <div class="ts-cat" id="ts-cat"></div>' +
    '</div>' +
    /* Footer */
    '<div class="ts-footer">' +
    '  <button class="ts-btn ts-btn-sec" id="ts-btn-prev">← Anterior</button>' +
    '  <button class="ts-btn ts-btn-primary" id="ts-btn-next">Siguiente →</button>' +
    '</div>';

  document.body.appendChild(panel);

  /* Eventos del panel */
  document.getElementById('ts-close').addEventListener('click', function() {
    TutorialSteps.cerrar();
  });
  document.getElementById('ts-btn-next').addEventListener('click', function() {
    TutorialSteps.siguiente();
  });
  document.getElementById('ts-btn-prev').addEventListener('click', function() {
    TutorialSteps.anterior();
  });

  /* Select existente en el menú */
  var sel = document.getElementById('tutorialSelect');
  if (sel) {
    sel.addEventListener('change', function() {
      TutorialSteps.cargar(this.value);
    });
  }
});
