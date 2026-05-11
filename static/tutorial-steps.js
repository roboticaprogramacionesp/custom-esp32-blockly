/* ================================================================
   tutorial-steps.js  v5
   ─ Highlight en workspace principal
   ─ Highlight en flyout (los bloques del panel lateral al abrirse)
   ─ MutationObserver para aplicar glow cuando el flyout aparece
   ─ Sin flecha, panel arrastrable
================================================================ */

var TUTORIALS = {

  led_basico: {
    title: "LED Básico", icon: "💡",
    steps: [
      {
        titulo: "Abre la categoría LEDs",
        desc: "Haz clic en <b>LEDs</b> en el toolbox para desplegarlo.",
        highlightCat: "LEDs", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría LED",
        desc: "Dentro de <b>LEDs</b> haz clic en <b>LED</b> para ver sus bloques.",
        highlightCat: "LED", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LED",
        desc: "Arrastra el bloque <em>led_init</em> al área de trabajo. Pin <b>2</b> = LED integrado del ESP32.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "led_init"
      },
      {
        titulo: "Arrastra: Establecer LED",
        desc: "Arrastra <em>set_led</em> al área. Estado <b>on</b> enciende, <b>off</b> apaga.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "set_led"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  led_infinito: {
    title: "LED Infinito (parpadeo)", icon: "🔁",
    steps: [
      {
        titulo: "Abre la categoría LEDs",
        desc: "Haz clic en <b>LEDs</b> en el toolbox para desplegarlo.",
        highlightCat: "LEDs", expandCat: null, bloque: "LED"
      },
      {
        titulo: "Selecciona la subcategoría LED",
        desc: "Dentro de <b>LEDs</b> haz clic en <b>LED</b> para ver sus bloques.",
        highlightCat: "LED", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LED",
        desc: "Arrastra el bloque <em>led_init</em> al área de trabajo. Pin <b>2</b> = LED integrado del ESP32.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "led_init"
      },
      {
        titulo: "Abre la categoría Ciclos",
        desc: "Haz clic en <b>Ciclos</b> en el toolbox.",
        highlightCat: "Ciclos", expandCat: null, bloque: null
      },
      {
        titulo: "Arrastra: mientras … Verdadero",
        desc: "Arrastra <em>controls_whileUntil</em>. El código dentro se repetirá <b>infinitamente</b>.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Dentro del ciclo: Encender LED",
        desc: "Ve a <b>LEDs › LED</b> y arrastra <em>set_led</em> <b>dentro</b> del bloque mientras. Estado = <b>on</b>.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "set_led"
      },
      {
        titulo: "Dentro del ciclo: Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em> después del set_led. Valor: <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Apagar LED",
        desc: "Arrastra otro <em>set_led</em> con estado <b>off</b>.",
        highlightCat: "LED", expandCat: "LEDs", bloque: ["set_led", "time_sleep"]
      },
      {
        titulo: "Dentro del ciclo: Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em> después del set_led. Valor: <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  semaforo: {
    title: "Semáforo", icon: "🚦",
    steps: [
      {
        titulo: "Abre LEDs › Semáforo (Leds)",
        desc: "Expande <b>LEDs</b> y selecciona <b>Semáforo (Leds)</b>.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar Semáforo",
        desc: "Arrastra <em>init_semaforo</em>. Pines: Verde=18, Amarillo=19, Rojo=23.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "init_semaforo"
      },
      {
        titulo: "Ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra <em>mientras … Verdadero</em>. Todo el semáforo irá dentro.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Fase ROJO",
        desc: "Arrastra <em>set_semaforo</em> con R=1, G=0, Y=0. Luego <em>time_sleep(3)</em> de <b>Tiempo</b>.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo"
      },
      {
        titulo: "Fase AMARILLO",
        desc: "Otro <em>set_semaforo</em> con Y=1, R=0, G=0 y <em>time_sleep(1)</em>.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo"
      },
      {
        titulo: "Fase VERDE",
        desc: "Último <em>set_semaforo</em> con G=1, R=0, Y=0 y <em>time_sleep(2)</em>.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  boton: {
    title: "Botón Contador",
    icon: "🔘",
    steps: [
      {
        titulo: "Abre Interruptores",
        desc: "Expande <b>Interruptores</b> y selecciona la subcategoría <b>Interruptores</b>.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: null
      },

      {
        titulo: "Inicializa el botón",
        desc: "Arrastra el bloque <em>interruptor_init</em> y selecciona el pin <b>0</b> con configuración <b>PULL_UP</b>.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: "interruptor_init"
      },

      {
        titulo: "Crear variable contador",
        desc: "Ve a <b>Variables</b>, crea una variable llamada <b>contador</b> y usa el bloque <em>establecer contador a 0</em>.",
        highlightCat: "Variables",
        highlightFlyoutButton: "create_variable",
        expandCat: null,
        bloque: null
      },
      {
        titulo: "Crear variable para botón",
        desc: "Ve a <b>Variables</b>, crea una variable llamada <b>btn</b> y usa el bloque <em>establecer btn a 0</em>.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: null
      },

      {
        titulo: "Agregar ciclo infinito",
        desc: "Desde <b>Ciclos</b>, arrastra el bloque <em>repetir mientras verdadero</em>.",
        highlightCat: "Ciclos",
        expandCat: null,
        bloque: "controls_whileUntil"
      },
      {
        titulo: "Establecer variable btn",
        desc: "Establece su valor inicial en",
        highlightCat: "Variables",
        bloque: "variables_set"
      },
      {
        titulo: "Leer el botón",
        desc: "Dentro del ciclo, agrega un bloque de variable para guardar el estado del botón usando <em>no leer Pin 17</em>.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: "interruptor_read"
      },

      {
        titulo: "Agregar condición",
        desc: "Ve a <b>Lógica</b> y arrastra el bloque <em>Si hacer</em>. Después agrega una comparación <em>btn = 1</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },

      {
        titulo: "Comparar valor",
        desc: "Usa el bloque <em>=</em> desde <b>Lógica</b> para verificar si el botón fue presionado.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },

      {
        titulo: "Usar operador NO",
        desc: "Agrega el bloque <em>no</em> para invertir la lectura del botón debido al uso de <b>PULL_UP</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_negate"
      },

      {
        titulo: "Imprimir texto",
        desc: "Ve a <b>Texto</b> y arrastra <em>crear texto con</em> para mostrar <b>'Contador:'</b> junto con el valor del botón.",
        highlightCat: "Texto",
        expandCat: null,
        bloque: "text_join"
      },

      {
        titulo: "Agregar mensaje en consola",
        desc: "Usa el bloque <em>imprimir</em> para mostrar el resultado en la terminal serial.",
        highlightCat: "Texto",
        expandCat: null,
        bloque: "text_print"
      },

      {
        titulo: "Agregar espera",
        desc: "Desde <b>Tiempo</b>, agrega <em>esperar 1 segundo</em> para evitar múltiples lecturas rápidas.",
        highlightCat: "Tiempo",
        expandCat: null,
        bloque: "time_sleep"
      },

      {
        titulo: "Conecta tu ESP32",
        desc: `
          Haz clic en <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32.
        `,
        highlightElement: "#btnConnection"
      },

      {
        titulo: "Selecciona puerto",
        desc: `
          Selecciona el puerto serial correcto de tu ESP32 y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },

      {
        titulo: "Ejecuta tu programa",
        desc: `
          Presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      }
    ]
  },

  buzzer: {
    title: "Buzzer", icon: "🔊",
    steps: [
      {
        titulo: "Abre Actuadores › Sounds (Buzzer)",
        desc: "Expande <b>Actuadores</b> y selecciona <b>Sounds (Buzzer)</b>.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: null
      },
      {
        titulo: "Arrastra: Tono Buzzer",
        desc: "Arrastra <em>buzzer_tone</em>. <b>440 Hz</b> = La, <b>262 Hz</b> = Do.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: "buzzer_tone"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em> con <b>0.5</b> segundos.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Detener el buzzer",
        desc: "Arrastra <em>buzzer_stop</em> y otro <em>time_sleep(0.5)</em>.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: "buzzer_stop"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  servo: {
    title: "Servo Motor", icon: "⚙️",
    steps: [
      {
        titulo: "Abre Actuadores › Servo",
        desc: "Expande <b>Actuadores</b> y selecciona <b>Servo</b>.",
        highlightCat: "Servo", expandCat: "Actuadores", bloque: null
      },
      {
        titulo: "Inicializa el Servo",
        desc: "Arrastra <em>init_servo</em>. Selecciona el pin PWM (ej. <b>13</b>).",
        highlightCat: "Servo", expandCat: "Actuadores", bloque: "init_servo"
      },
      {
        titulo: "Ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra <em>mientras … Verdadero</em>.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Mueve a 0°, 90° y 180°",
        desc: "3 bloques <em>move_servo</em> con ángulos <b>0</b>, <b>90</b> y <b>180</b>, cada uno con <em>time_sleep(1)</em>.",
        highlightCat: "Servo", expandCat: "Actuadores", bloque: "move_servo"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  ultrasonico: {
    title: "Sensor Ultrasónico", icon: "📡",
    steps: [
      {
        titulo: "Abre Sensores › Ultrasonico",
        desc: "Expande <b>Sensores</b> › <b>Sensores Digitales</b> y selecciona <b>Ultrasonico</b>.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Inicializa el HC-SR04",
        desc: "Arrastra <em>init_ultrasonic_hcsr04</em>. TRIG=<b>12</b>, ECHO=<b>13</b>.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: "init_ultrasonic_hcsr04"
      },
      {
        titulo: "Lee la distancia",
        desc: "Arrastra <em>read_ultrasonic_hcsr04</em> y guárdalo en una variable <em>distancia</em>.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: "read_ultrasonic_hcsr04"
      },
      {
        titulo: "Imprime el resultado",
        desc: "Ve a <b>Textos</b> y arrastra <em>print()</em>. Conecta la variable <em>distancia</em> dentro.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  neopixel_basico: {
    title: "NeoPixel RGB", icon: "🌈",
    steps: [
      {
        titulo: "Elige un color",
        desc: "Ve a <b>Colores</b> y arrastra un <em>color_picker</em>.",
        highlightCat: "Colores", expandCat: null, bloque: "color_picker"
      },
      {
        titulo: "Inicializa la tira NeoPixel",
        desc: "Expande <b>LEDs</b> y busca los bloques NeoPixel. Pin=<b>4</b>, cantidad=<b>8</b>.",
        highlightCat: "LEDs", expandCat: null, bloque: null
      },
      {
        titulo: "Ciclo de colores",
        desc: "Ve a <b>Ciclos</b> y usa <em>para</em> del <b>0</b> al <b>7</b>. En cada iteración asigna un color a cada LED.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_for"
      },
      {
        titulo: "Conecta tu tarjeta ESP32",
        desc: `
          Haz clic en el botón <b>Conectar</b> 
          <span class="icon-btn icon-disconect"></span> 
          para seleccionar tu tarjeta ESP32 desde el puerto serial.
          
          Cuando la conexión sea exitosa, presiona el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para enviar el código a la tarjeta.
        `,
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: `
          El navegador mostrará una ventana para elegir el puerto serial 
          de tu ESP32. Selecciona el puerto correcto y presiona <b>Conectar</b>.
        `,
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: `
          Ahora haz clic en el botón 
          <b>Ejecutar</b> 
          <span class="icon-btn icon-run"></span> 
          para correr el programa en la ESP32.
        `,
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  }
};

/* ─── LÓGICA ─────────────────────────────────────────────────── */

var TutorialSteps = {
  tutorial: null,
  paso: 0,
  _glowToolbox: null,
  _glowBlocks: [],     // SVG roots resaltados (workspace + flyout)
  _flyoutObs: null,   // MutationObserver del flyout
  _currentTipos: [],    // tipos del paso actual, para el observer

  /* ── API pública ─────────────────────────────────────────── */
  cargar: function (id) {
    if (!id) { this.cerrar(); return; }
    var tut = TUTORIALS[id];
    if (!tut) return;
    this.tutorial = tut;
    this.paso = 0;
    document.getElementById('ts-panel').style.display = 'flex';
    this._renderPaso();
  },

  siguiente: function () {
    if (!this.tutorial) return;
    if (this.paso < this.tutorial.steps.length - 1) {
      this.paso++;
      this._renderPaso();
    } else {
      this._mostrarFin();
    }
  },

  anterior: function () {
    if (!this.tutorial || this.paso === 0) return;
    this.paso--;
    this._renderPaso();
  },

  cerrar: function () {
    this._limpiarTodo();
    this.tutorial = null;
    this.paso = 0;
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'none';
    var sel = document.getElementById('tutorialSelect');
    if (sel) sel.value = '';
  },

  /* ── Render ──────────────────────────────────────────────── */
  _renderPaso: function () {
    var tut = this.tutorial;
    var step = tut.steps[this.paso];
    var total = tut.steps.length;

    document.getElementById('ts-icon').textContent = tut.icon;
    document.getElementById('ts-title').textContent = tut.title;

    var pct = Math.round(((this.paso + 1) / total) * 100);
    document.getElementById('ts-progress-fill').style.width = pct + '%';
    document.getElementById('ts-progress-txt').textContent =
      'Paso ' + (this.paso + 1) + ' de ' + total;

    document.getElementById('ts-step-num').textContent = this.paso + 1;
    document.getElementById('ts-step-title').textContent = step.titulo;
    document.getElementById('ts-step-desc').innerHTML = step.desc;

    // verificar si el body fue reemplazado por _mostrarFin()
    let stepNum = document.getElementById('ts-step-num');
    let stepTitle = document.getElementById('ts-step-title');
    let stepDesc = document.getElementById('ts-step-desc');

    if (!stepNum || !stepTitle || !stepDesc) {
      document.getElementById('ts-body').innerHTML = this._bodyTpl();

      // volver a obtener referencias
      stepNum = document.getElementById('ts-step-num');
      stepTitle = document.getElementById('ts-step-title');
      stepDesc = document.getElementById('ts-step-desc');
    }

    // Ruta del toolbox
    var html = '';
    if (step.expandCat && step.expandCat !== step.highlightCat) {
      html += '<span class="ts-cat-part">' + step.expandCat + '</span>' +
        '<span class="ts-cat-sep">›</span>';
    }
    if (step.highlightCat) {
      html += '<span class="ts-cat-part ts-cat-active">' + step.highlightCat + '</span>';
    }
    document.getElementById('ts-cat-ruta').innerHTML = html;

    // Chip del bloque
    var chipRow = document.getElementById('ts-bloque-row');
    var chip = document.getElementById('ts-bloque-chip');
    if (step.bloque) {
      var tipos = Array.isArray(step.bloque) ? step.bloque : [step.bloque];
      chip.textContent = tipos.join('  +  ');
      chipRow.style.display = 'flex';
    } else {
      chipRow.style.display = 'none';
    }

    // Botones
    document.getElementById('ts-btn-prev').disabled = (this.paso === 0);
    document.getElementById('ts-btn-next').textContent =
      (this.paso === total - 1) ? '¡Terminar! 🎉' : 'Siguiente →';

    // Animación
    var body = document.getElementById('ts-body');
    body.classList.remove('ts-anim');
    void body.offsetWidth;
    body.classList.add('ts-anim');

    // Highlights
    this._limpiarTodo();
    this._highlightToolbox(step.highlightCat);

    if (step.highlightElement) {
      this._highlightHTMLElement(step.highlightElement);
    }

    if (step.highlightFlyoutButton === "create_variable") {
      highlightCreateVariableButton();
    }

    if (step.bloque) {
      var tipos = Array.isArray(step.bloque) ? step.bloque : [step.bloque];
      this._currentTipos = tipos;
      this._aplicarGlowWorkspace(tipos);   // bloques ya en workspace
      this._aplicarGlowFlyout(tipos);      // bloques en el flyout abierto
      this._iniciarFlyoutObserver(tipos);  // observer para cuando abra el flyout
    } else {
      this._currentTipos = [];
    }
  },

  /* ── Highlight toolbox ───────────────────────────────────── */
  _highlightToolbox: function (nombre) {
    if (!nombre) return;
    var rows = document.querySelectorAll('.blocklyTreeRow');
    for (var i = 0; i < rows.length; i++) {
      var label = rows[i].querySelector('.blocklyTreeLabel');
      if (label && label.textContent.trim() === nombre.trim()) {
        rows[i].classList.add('ts-toolbox-glow');
        this._glowToolbox = rows[i];
        rows[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        break;
      }
    }
  },

  _highlightHTMLElement: function (selector) {
    const el = document.querySelector(selector);

    if (!el) {
      console.warn("Elemento no encontrado:", selector);
      return;
    }

    el.classList.add("ts-html-glow");

    this._glowHtmlElement = el;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  },

  /* ── Highlight bloques en el workspace principal ─────────── */
  _aplicarGlowWorkspace: function (tipos) {
    var ws = this._getWorkspace();
    if (!ws) return;
    var self = this;
    ws.getAllBlocks(false).forEach(function (block) {
      if (tipos.indexOf(block.type) !== -1) {
        var svg = block.getSvgRoot();
        if (svg && !svg.classList.contains('ts-block-glow')) {
          svg.classList.add('ts-block-glow');
          self._glowBlocks.push(svg);
        }
      }
    });
  },

  /* ── Highlight bloques en el flyout (si está abierto) ───── */
  _aplicarGlowFlyout: function (tipos) {
    var self = this;
    // Busca todos los <g class="blocklyDraggable"> dentro de .blocklyFlyout
    var flyoutSvg = document.querySelector('.blocklyFlyout');
    if (!flyoutSvg) return;

    // Intenta via API de Blockly primero (más limpio)
    var ws = this._getWorkspace();
    if (ws && ws.getFlyout && ws.getFlyout()) {
      var flyoutWs = ws.getFlyout().getWorkspace ? ws.getFlyout().getWorkspace() : null;
      if (flyoutWs) {
        flyoutWs.getAllBlocks(false).forEach(function (block) {
          if (tipos.indexOf(block.type) !== -1) {
            var svg = block.getSvgRoot();
            if (svg && !svg.classList.contains('ts-block-glow')) {
              svg.classList.add('ts-block-glow');
              self._glowBlocks.push(svg);
            }
          }
        });
        return;  // éxito vía API
      }
    }

    // Fallback: buscar por data-id en el DOM del flyout
    // Blockly pone el type en el atributo data-block-type o en la clase,
    // pero lo más confiable es buscar via getSvgRoot del workspace del flyout.
    // Si el fallback es necesario, marcamos todos los <g.blocklyDraggable>
    // del flyout que correspondan al tipo — comparando con los del workspace.
    this._aplicarGlowFlyoutDOM(tipos, flyoutSvg);
  },

  /* Fallback DOM: compara data-id del flyout con el registro de Blockly */
  _aplicarGlowFlyoutDOM: function (tipos, flyoutSvg) {
    var self = this;
    var ws = this._getWorkspace();
    if (!ws || !ws.getFlyout) return;

    var flyout = ws.getFlyout();
    if (!flyout) return;

    // Blockly guarda un mapa id→block en el flyout
    // Intentamos acceder a flyout.workspace_ (API privada, muy estable)
    var fws = flyout.workspace_ || (flyout.getWorkspace && flyout.getWorkspace());
    if (!fws) return;

    var blockMap = fws.blockDB_ || {};
    Object.keys(blockMap).forEach(function (id) {
      var block = blockMap[id];
      if (block && tipos.indexOf(block.type) !== -1) {
        var svg = block.getSvgRoot ? block.getSvgRoot() : null;
        if (svg && !svg.classList.contains('ts-block-glow')) {
          svg.classList.add('ts-block-glow');
          self._glowBlocks.push(svg);
        }
      }
    });
  },

  /* ── MutationObserver: aplica glow cuando el flyout se abre ─
     El flyout cambia su atributo display/transform al abrirse.
     Observamos el padre del .blocklyFlyout para detectarlo.      */
  _iniciarFlyoutObserver: function (tipos) {
    var self = this;
    this._detenerFlyoutObserver();

    // Observa el blocklyDiv para detectar cuando aparece o cambia el flyout
    var blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    var debounceTimer = null;
    this._flyoutObs = new MutationObserver(function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        // Quita glow viejo del flyout y reaplicar
        // (no quitamos el del workspace, solo el del flyout anterior)
        var toRemove = [];
        self._glowBlocks = self._glowBlocks.filter(function (svg) {
          // Si el SVG ya no está en el flyout activo, lo dejamos
          // Si está en el flyout, lo removemos para reaplicar
          var inFlyout = svg.closest && svg.closest('.blocklyFlyout');
          if (inFlyout) {
            svg.classList.remove('ts-block-glow');
            return false;
          }
          return true;
        });
        self._aplicarGlowFlyout(tipos);
      }, 60);
    });

    this._flyoutObs.observe(blocklyDiv, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'transform', 'display']
    });
  },

  _detenerFlyoutObserver: function () {
    if (this._flyoutObs) {
      this._flyoutObs.disconnect();
      this._flyoutObs = null;
    }
  },

  /* ── Limpieza total ──────────────────────────────────────── */
  _limpiarTodo: function () {
    this._detenerFlyoutObserver();
    this._currentTipos = [];

    if (this._glowToolbox) {
      this._glowToolbox.classList.remove('ts-toolbox-glow');
      this._glowToolbox = null;
    }
    this._glowBlocks.forEach(function (svg) {
      svg.classList.remove('ts-block-glow');
    });
    this._glowBlocks = [];

    if (this._glowHtmlElement) {
      this._glowHtmlElement.classList.remove("ts-html-glow");
      this._glowHtmlElement = null;
    }
  },

  /* ── Helpers ─────────────────────────────────────────────── */
  _getWorkspace: function () {
    if (typeof Code !== 'undefined' && Code.workspace) return Code.workspace;
    if (typeof Blockly !== 'undefined') return Blockly.getMainWorkspace();
    return null;
  },

  /* ── Fin ─────────────────────────────────────────────────── */
  _mostrarFin: function () {
    this._limpiarTodo();
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-fin">' +
      '  <div class="ts-fin-icon">🎉</div>' +
      '  <h3>¡Tutorial completado!</h3>' +
      '  <p>Terminaste <strong>' + this.tutorial.title + '</strong>.<br>' +
      '     Prueba modificar valores o elige otro tutorial.</p>' +
      '  <button class="ts-btn ts-btn-primary" onclick="TutorialSteps._reiniciar()">Repetir</button>' +
      '</div>';
    document.getElementById('ts-btn-next').style.display = 'none';
    document.getElementById('ts-btn-prev').style.display = 'none';
  },

  _reiniciar: function () {
    document.getElementById('ts-btn-next').style.display = '';
    document.getElementById('ts-btn-prev').style.display = '';
    document.getElementById('ts-body').innerHTML = TutorialSteps._bodyTpl();
    this.paso = 0;
    this._renderPaso();
  },

  _bodyTpl: function () {
    return (
      '<div class="ts-step-header">' +
      '  <span class="ts-step-num"  id="ts-step-num">1</span>' +
      '  <h3  class="ts-step-title" id="ts-step-title"></h3>' +
      '</div>' +
      '<p class="ts-step-desc" id="ts-step-desc"></p>' +
      '<div class="ts-cat-box">' +
      '  <div class="ts-cat-label">📂 Ir al toolbox:</div>' +
      '  <div class="ts-cat-ruta"  id="ts-cat-ruta"></div>' +
      '  <div class="ts-bloque-row" id="ts-bloque-row" style="display:none">' +
      '    <span class="ts-bloque-icon">🧩</span>' +
      '    <span class="ts-bloque-chip" id="ts-bloque-chip"></span>' +
      '  </div>' +
      '</div>'
    );
  }
};

/* ─── DRAG ───────────────────────────────────────────────────── */
function _tsMakeDraggable(panel) {
  var header = panel.querySelector('.ts-header');
  if (!header) return;
  header.style.cursor = 'grab';
  var drag = false, sx, sy, ol, ot;
  header.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('ts-close')) return;
    drag = true; sx = e.clientX; sy = e.clientY;
    var r = panel.getBoundingClientRect();
    ol = r.left; ot = r.top;
    panel.style.right = panel.style.bottom = 'auto';
    panel.style.left = ol + 'px'; panel.style.top = ot + 'px';
    header.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!drag) return;
    panel.style.left = Math.max(0, ol + e.clientX - sx) + 'px';
    panel.style.top = Math.max(48, ot + e.clientY - sy) + 'px';
  });
  document.addEventListener('mouseup', function () {
    if (drag) { drag = false; header.style.cursor = 'grab'; }
  });
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

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
    '<div class="ts-body" id="ts-body">' + TutorialSteps._bodyTpl() + '</div>' +
    '<div class="ts-footer">' +
    '  <button class="ts-btn ts-btn-sec"     id="ts-btn-prev">← Anterior</button>' +
    '  <button class="ts-btn ts-btn-primary" id="ts-btn-next">Siguiente →</button>' +
    '</div>';

  document.body.appendChild(panel);

  document.getElementById('ts-close').addEventListener('click', function () { TutorialSteps.cerrar(); });
  document.getElementById('ts-btn-next').addEventListener('click', function () { TutorialSteps.siguiente(); });
  document.getElementById('ts-btn-prev').addEventListener('click', function () { TutorialSteps.anterior(); });

  var sel = document.getElementById('tutorialSelect');
  if (sel) sel.addEventListener('change', function () { TutorialSteps.cargar(this.value); });

  _tsMakeDraggable(panel);
});

function highlightCreateVariableButton() {
  const buttons = document.querySelectorAll(".blocklyFlyoutButton");
  alert("Busca el botón 'Crear variable' en el flyout de Variables. Si no lo ves, abre el menú de Variables para que aparezca.");
  for (const btn of buttons) {
    const text = btn.textContent?.toLowerCase();

    if (
      text.includes("crear variable") ||
      text.includes("create variable")
    ) {
      btn.classList.add("tutorial-highlight");
      btn.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return btn;
    }
  }

  return null;
}