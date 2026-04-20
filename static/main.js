/**
 * Application Namespace & Blockly Setup
 */
var Code = {};
const IS_DESKTOP = typeof window.pywebview !== "undefined";

Code.workspace = Blockly.inject("blocklyDiv", {
  scrollbars: true,
  trashcan: true,
  undo: true,
  grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
  media: "./static/media/",
  toolbox: document.getElementById("toolbox"),
  oneBasedIndex: false,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
});

// === Botones flotantes ===
const screenshotBtnEl = addScreenshotButton(Code.workspace); // devuelve <g>
const {
  container: undoRedoContainer,
  undoBtn,
  redoBtn,
} = addUndoRedoButtons(Code.workspace);

// Guarda en un arreglo global para toggle
window.FLOATING = [screenshotBtnEl, undoRedoContainer].filter(Boolean);

Code.generateCode = function (generator = Blockly.Python) {
  if (Code.auto_mode || this.constructor.name != "Window") {
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
      if (generator.name_ == "Python") {
        return generator.workspaceToCode(Code.workspace);
      } else if (generator.name_ == "Javascript") {
        return generator.workspaceToCode(Code.workspace);
      }
    } else {
      // Break out of auto_mode if there is a block without a generator function
      Code.auto_mode = false;
    }
  }
};

// CHECAR SOPORTE WEB SERIAL
if (!navigator.serial) {
  console.log(
    "Tu navegador no soporta Web Serial. Usa Chrome o Edge en escritorio.",
  );
  //alert("Tu navegador no soporta Web Serial. Usa Chrome o Edge en escritorio.");
  throw new Error("Web Serial no disponible");
}

function blurBlockly() {
  try {
    const svg =
      Code.workspace &&
      Code.workspace.getParentSvg &&
      Code.workspace.getParentSvg();
    if (svg) svg.blur();
  } catch (e) { }
}

// ACTUALIZAR CÓDIGO DESDE BLOCKLY
function updateCodeFromBlockly() {
  const code = Blockly.Python.workspaceToCode(Code.workspace);
  editor.setValue(code);
}

// Inicializar Editor CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
});

// BOTÓN: VER CÓDIGO
document.getElementById("btnCode").addEventListener("click", function () {
  updateCodeFromBlockly();

  showView("viewCode");
  isWorkSpace = false;
  requestAnimationFrame(() => {
    editor.refresh();

    refreshTerminalFit();
  });
});

document
  .getElementById("btnBlocks")
  .addEventListener("click", () => showView("viewBlocks"));

function refreshBlockly() {
  if (!Code.workspace) return;
  const svg = Code.workspace.getParentSvg();
  const blocklyDiv = document.getElementById("blocklyDiv");
  const w = blocklyDiv.clientWidth;
  const h = blocklyDiv.clientHeight;
  if (w === 0 || h === 0) return; // ❗ evita render con tamaño 0
  svg.style.width = w + "px";
  svg.style.height = h + "px";
  Blockly.svgResize(Code.workspace);
}

function showView(viewId) {
  Blockly.hideChaff(true);
  isWorkSpace = viewId === "viewBlocks";

  const views = document.querySelectorAll(".view");

  views.forEach((v) => {
    v.classList.remove("active");
    v.style.display = "none"; // ocultar todas
  });

  const view = document.getElementById(viewId);
  view.classList.add("active");
  view.style.display = "block"; // mostrar la vista activa
  if (viewId === "viewBlocks") {
    document.getElementById("viewBlocks").style.display = "block";
    document.getElementById("viewCode").style.display = "none";

    setTimeout(() => {
      Blockly.svgResize(Code.workspace);
      window.dispatchEvent(new Event("resize"));
    }, 50);
  } else {
    document.body.classList.remove("body--no-blockly-ui");
    toggleFloating(true); // mostrar botones flotantes

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        refreshBlockly();
      });
    });
  }
}

// UTILIDADES
/*
document
  .getElementById("btnUndo")
  .addEventListener("click", () => Code.workspace.undo(false));
document
  .getElementById("btnRedo")
  .addEventListener("click", () => Code.workspace.undo(true));

*/

// AUTOGUARDADO – LOCAL STORAGE
const AUTOSAVE_KEY = "blockly_autosave_workspace";

function autoSaveWorkspace() {
  const xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
  const xmlText = Blockly.Xml.domToText(xmlDom);
  localStorage.setItem(AUTOSAVE_KEY, xmlText);
}

// Guardar cada cambio (ignorar eventos de UI)
Code.workspace.addChangeListener((event) => {
  if (event.isUiEvent) return;
  autoSaveWorkspace();
});

function restoreWorkspaceFromLocal() {
  const xmlText = localStorage.getItem(AUTOSAVE_KEY);
  if (!xmlText) return;

  try {
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
  } catch (e) {
    console.warn("No se pudo restaurar el workspace");
  }
}

let activeTutorial = null;

//           TUTORIAL
document.getElementById("btnTutor").addEventListener("click", function () {
  showView("viewBlocks");
  startTutorial();
});

//           TUTORIAL
document.getElementById("btnCodeTutor").addEventListener("click", function () {
  showView("viewCode");
  startCodeTutorial();
});

// AUTOGUARDADO – PYTHON (DESKTOP)
let autosaveTimer = null;
const AUTOSAVE_DELAY = 800;

function autoSaveWorkspacePython() {
  const workspace = Blockly.getMainWorkspace();
  const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToText(xmlDom);

  if (window.pywebview?.api?.autosave_xml) {
    window.pywebview.api.autosave_xml(xmlText);
  }
}

Code.workspace.addChangeListener(function (event) {
  if (event.type === Blockly.Events.UI) return;

  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autoSaveWorkspacePython, AUTOSAVE_DELAY);
});

async function restoreWorkspaceFromPython() {
  if (!window.pywebview?.api?.load_autosave) return;

  const xmlText = await window.pywebview.api.load_autosave();
  if (!xmlText) return;

  try {
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
      xmlDom,
      Blockly.getMainWorkspace(),
    );
  } catch (e) {
    console.warn("No se pudo restaurar autosave", e);
  }
}

// ⏳ ESPERAR A PYWEBVIEW
window.addEventListener("pywebviewready", () => {
  restoreWorkspaceFromPython();
  startTutorial();
});

if (window.pywebview?.api) {
  autoSaveWorkspacePython();
} else {
  restoreWorkspaceFromLocal();
  //localStorage.setItem(AUTOSAVE_KEY, xmlText);
}

// BOTÓN: NUEVO ARCHIVO
document.getElementById("btnNew").addEventListener("click", async function () {
  showView("viewBlocks");
  const confirmDelete = await showCustomConfirm();
  if (!confirmDelete) return;

  Blockly.Events.disable();

  try {
    // Limpiar workspace
    if (Code.workspace) {
      Code.workspace.clear();
    }

    // Limpiar editor
    if (typeof editor !== "undefined") {
      editor.setValue("");
    } else {
      const codeArea = document.getElementById("codeArea");
      if (codeArea) codeArea.value = "";
    }

    // Borrar autosave local
    localStorage.removeItem(AUTOSAVE_KEY);

    // Borrar autosave backend (si existe)
    if (window.pywebview?.api?.clear_autosave) {
      await window.pywebview.api.clear_autosave();
    }
  } catch (error) {
    console.error("Error al crear nuevo archivo:", error);
  }

  Blockly.Events.enable();
});

async function saveFileAuto(content, fileName = "") {
  try {
    let extension = "txt";
    let mimeType = "text/plain";
    let isBase64 = false;

    if (typeof content === "string" && content.startsWith("data:image/png")) {
      extension = "png";
      mimeType = "image/png";
      isBase64 = true;
    } else if (fileName.endsWith(".xml") || content.trim().startsWith("<")) {
      extension = "xml";
      mimeType = "text/xml";
    } else if (
      fileName.endsWith(".py") ||
      content.includes("import ") ||
      content.includes("def ")
    ) {
      extension = "py";
      mimeType = "text/x-python";
    }

    const suggestedName =
      fileName && fileName.includes(".") ? fileName : `archivo.${extension}`;

    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: `Archivo ${extension.toUpperCase()}`,
          accept: {
            [mimeType]: [`.${extension}`],
          },
        },
      ],
    });

    const writable = await handle.createWritable();

    if (isBase64) {
      const base64 = content.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      await writable.write(bytes);
    } else {
      await writable.write(content);
    }

    await writable.close();

    //alert(`Archivo ${extension.toUpperCase()} guardado correctamente`);
  } catch (err) {
    // 🔥 AQUÍ ESTÁ LA CLAVE
    if (err.name === "AbortError") {
      // ❌ usuario canceló → NO hacer nada
      return;
    }

    // ⚠️ solo errores reales
    console.error("Error real al guardar:", err);
    console.log("Error al guardar archivo");
    //alert("Error al guardar archivo");
  }
}

document.getElementById("btnSave").addEventListener("click", async (e) => {
  e.preventDefault();

  const workspace = Blockly.getMainWorkspace();
  const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  // 🖥️ Desktop (evaluación dinámica REAL)
  if (window.pywebview?.api?.save_xml) {
    const result = await window.pywebview.api.save_xml(xmlText);

    if (result?.status === "ok") {
      console.log("Archivo XML guardado en:", result.path);
      //alert("Proyecto guardado en:\n" + result.path);
    }
  } else {
    await saveFileAuto(xmlText, "proyecto.xml");
  }
});

// BOTÓN: CARGAR XML
document.getElementById("btnLoad").addEventListener("click", function () {
  document.getElementById("loadXML").click();
});

// INPUT FILE: LEER Y CARGAR XML
document.getElementById("loadXML").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const xmlText = e.target.result;

      Code.workspace.clear();
      const xmlDom = Blockly.Xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);

      // 👇 GENERAR CÓDIGO Y MOSTRARLO
      updateCodeFromBlockly();
      //showView("viewCode");

      requestAnimationFrame(() => {
        editor.refresh();
      });
    } catch (err) {
      //alert("Error al cargar el archivo XML");
      console.error(err);
    }
  };

  reader.readAsText(file);

  // Permite volver a cargar el mismo archivo si se desea
  event.target.value = "";
  showView("viewBlocks"); // <- quita la clase body--no-blockly-ui
});

// RESTAURAR DESDE AUTOSAVE
async function reloadWorkspace() {
  Blockly.Events.disable();

  try {
    let xmlText = "";

    // 1️⃣ Intentar desde Python (desktop)
    if (window.pywebview?.api?.load_autosave) {
      xmlText = await window.pywebview.api.load_autosave();
    }

    // 2️⃣ Si no hay, intentar desde LocalStorage
    if (!xmlText) {
      xmlText = localStorage.getItem("blockly_autosave_workspace");
    }

    if (!xmlText) {
      Blockly.Events.enable();
      return;
    }

    const xmlDom = Blockly.Xml.textToDom(xmlText);

    Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, Code.workspace);
  } catch (e) {
    console.error("Error al recargar workspace", e);
  }

  Blockly.Events.enable();
}

// BOTÓN: RECARGAR
document.getElementById("btnReload").addEventListener("click", function () {
  location.reload();
});

// BOTÓN: GUARDAR .PY (DESKTOP + WEB)
document.getElementById("btnSavePy").addEventListener("click", async (e) => {
  e.preventDefault();

  const fileName =
    document.getElementById("fileNameInput").value.trim() || "test.py";

  const code = editor.getValue();

  // 🖥️ SI ES APP DE ESCRITORIO (pywebview)
  if (
    window.pywebview &&
    window.pywebview.api &&
    window.pywebview.api.save_py
  ) {
    const result = await window.pywebview.api.save_py(code, fileName);

    if (result?.status === "ok") {
      console.log(`Archivo ${fileName} guardado en:`, result.path);
      //alert("Archivo guardado en:\n" + result.path);
    }
  } else {
    await saveFileAuto(code, fileName);
  }
});

// BOTÓN: CARGAR .PY
document.getElementById("btnLoadPy").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loadPy").click();
});

document.getElementById("loadPy").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    editor.setValue(e.target.result);
  };

  reader.readAsText(file);

  // Permite volver a cargar el mismo archivo
  event.target.value = "";
});

function showCustomConfirm(message = "¿Deseas continuar?") {
  return new Promise((resolve) => {
    const modal = document.getElementById("customModal");
    const msg = document.getElementById("modalMessage");
    const btnAccept = document.getElementById("modalAccept");
    const btnCancel = document.getElementById("modalCancel");

    if (!modal || !msg || !btnAccept || !btnCancel) {
      console.error("Modal no encontrado");
      resolve(false);
      return;
    }

    msg.innerHTML = message;

    btnCancel.style.display = "inline-block";
    btnAccept.textContent = "Aceptar";

    modal.style.display = "flex";

    btnAccept.onclick = () => {
      modal.style.display = "none";
      resolve(true);
    };

    btnCancel.onclick = () => {
      modal.style.display = "none";
      resolve(false);
    };
  });
}

function showMessageModal(message) {
  const modal = document.getElementById("customModal");
  const msg = document.getElementById("modalMessage");
  const btnAccept = document.getElementById("modalAccept");
  const btnCancel = document.getElementById("modalCancel");

  if (!modal || !msg || !btnAccept) {
    console.log(message);
    //alert(message);
    return;
  }

  msg.innerHTML = message;

  btnCancel.style.display = "none"; // ocultamos cancelar
  btnAccept.textContent = "OK";

  modal.style.display = "flex";

  btnAccept.onclick = () => {
    modal.style.display = "none";
  };
}

window.addEventListener("DOMContentLoaded", () => {
  startTutorial();
  initTerminal();
  enableTerminalInput();
  //console.log("Terminal inicializada correctamente");
});

//////////////////////////////////////////////////////////////
// TERMINAL AUTO RESIZE OBSERVER
//////////////////////////////////////////////////////////////

let resizeObserver;

function enableTerminalAutoResize() {
  const terminalElement = document.getElementById("terminal");

  resizeObserver = new ResizeObserver(() => {
    if (fitAddon && term) {
      fitAddon.fit();
    }
  });

  resizeObserver.observe(terminalElement);
}

//////////////////////////////////////////////////////////////
// TERMINAL XTERM + FIT ADDON
//////////////////////////////////////////////////////////////

let term;
let fitAddon;

function initTerminal() {
  if (term) return;

  fitAddon = new FitAddon.FitAddon();

  term = new Terminal({
    cursorBlink: true,

    cursorStyle: "block",

    scrollback: 5000,

    convertEol: true,

    fontSize: 14,

    fontFamily: 'Consolas, "Courier New", monospace',

    //rendererType: "canvas",

    theme: {
      background: "#1e1e1e",
      foreground: "#d4d4d4",

      cursor: "#ffffff",

      selectionBackground: "rgba(255,255,255,0.2)",

      black: "#000000",
      red: "#cd3131",
      green: "#0dbc79",
      yellow: "#e5e510",
      blue: "#2472c8",
      magenta: "#bc3fbc",
      cyan: "#11a8cd",
      white: "#e5e5e5",

      brightBlack: "#666666",
      brightRed: "#f14c4c",
      brightGreen: "#23d18b",
      brightYellow: "#f5f543",
      brightBlue: "#3b8eea",
      brightMagenta: "#d670d6",
      brightCyan: "#29b8db",
      brightWhite: "#ffffff",
    },
  });

  term.loadAddon(fitAddon);

  const el = document.getElementById("terminal");

  term.open(el);

  requestAnimationFrame(() => {
    fitAddon.fit();
  });

  enableTerminalAutoResize();
}

/*
document.getElementById("btnPaste").addEventListener("click", async () => {
  if (!isConnected || isSendingCode) return;

  try {
    let text = await navigator.clipboard.readText();

    if (text) {
      // 🔥 agregar salto de línea al final
      if (!text.endsWith("\n")) {
        text += "\r\n";
      }

      await sendSerial(text);
    }
  } catch (err) {
    console.error("Error al pegar:", err);
  }
});
*/

window.addEventListener("resize", () => {
  if (Code.workspace) {
    Blockly.svgResize(Code.workspace);
  }
  if (fitAddon) {
    fitAddon.fit();
  }
});

function refreshTerminalFit() {
  setTimeout(() => {
    if (fitAddon) {
      fitAddon.fit();

      term.scrollToBottom();
    }
  }, 100);
}

//////////////////////////////////////////////////////////////
// WEBSERIAL ENGINE
//////////////////////////////////////////////////////////////

let serialPort = null;
let serialReader = null;
let serialWriter = null;
let isConnected = false;
let isSendingCode = false;
let isWorkSpace = true;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let serialBuffer = "";
let waitingResponse = false;

//////////////////////////////////////////////////////////////
// CONNECT
//////////////////////////////////////////////////////////////
async function connectSerial() {
  try {
    // asegurar que terminal exista
    if (!term) {
      initTerminal();
      enableTerminalInput();
    }

    serialPort = await navigator.serial.requestPort();

    await serialPort.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      flowControl: "none",
    });

    serialWriter = serialPort.writable.getWriter();
    serialReader = serialPort.readable.getReader();

    isConnected = true;
    serialConnected = true;
    updateConnectionIcon(true);
    term.writeln("MicroPython Terminal\r\n");
    await sendSerial("\x03"); // Ctrl+C
    readSerialLoop();
  } catch (error) {
    if (term)
      term.writeln("\r\nError conexión: " + error); //❌
    else console.error(error);
  }
}

////////////////////////////////////////////////////////////
// DISCONNECT
////////////////////////////////////////////////////////////

let isDisconnecting = false;

async function disconnectSerial() {
  if (isDisconnecting) return;
  isDisconnecting = true;

  try {
    isConnected = false;
    serialConnected = false;
    updateConnectionIcon(false);

    // reader
    if (serialReader) {
      try {
        await serialReader.cancel();
      } catch { }
      try {
        serialReader.releaseLock();
      } catch { }
      serialReader = null;
    }

    // writer
    if (serialWriter) {
      try {
        await serialWriter.close();
      } catch { }
      try {
        serialWriter.releaseLock();
      } catch { }
      serialWriter = null;
    }

    // puerto
    if (serialPort && serialPort.readable) {
      try {
        await serialPort.close();
      } catch { }
    }

    serialPort = null;

    term.writeln("\r\nDesconectado\r\n");

    // UI segura
    const btnConnect = document.getElementById("btnConnect");
    const btnDisconnect = document.getElementById("btnDisconnect");

    if (btnConnect) btnConnect.disabled = false;
    if (btnDisconnect) btnDisconnect.disabled = true;

    // 🔥 limpiar explorer
    clearExplorer();
  } catch (error) {
    if (error.name !== "NetworkError" && error.name !== "InvalidStateError") {
      console.error(error);
      term.writeln("\r\nError al desconectar\r\n");
    }
  } finally {
    resetSerialState();
    isDisconnecting = false;
  }
}
/*
async function disconnectSerial() {
  try {
    isConnected = false;
    serialConnected = false;
    updateConnectionIcon(false);
    // cancelar reader
    if (serialReader) {
      try {
        await serialReader.cancel();
      } catch (e) {}
      try {
        serialReader.releaseLock();
      } catch (e) {}
      serialReader = null;
    }

    // cerrar writer
    if (serialWriter) {
      try {
        await serialWriter.close();
      } catch (e) {}
      try {
        serialWriter.releaseLock();
      } catch (e) {}
      serialWriter = null;
    }

    // cerrar puerto
    if (serialPort) {
      try {
        await serialPort.close();
      } catch (e) {}
      serialPort = null;
    }

    term.writeln("\r\nDesconectado\r\n"); //🔌

    // UI
    const btnConnect = document.getElementById("btnConnect");
    const btnDisconnect = document.getElementById("btnDisconnect");

    if (btnConnect) btnConnect.disabled = false;
    if (btnDisconnect) btnDisconnect.disabled = true;

  } catch (error) {
    if (error.name !== "NetworkError") {
      console.error(error);
      term.writeln("\r\nError al desconectar\r\n");
    }
  } finally {
    resetSerialState();
  }
}
*/

//////////////////////////////////////////////////////////////
// READ LOOP UNIVERSAL
//////////////////////////////////////////////////////////////
async function readSerialLoop() {
  try {
    while (isConnected) {
      const { value, done } = await serialReader.read();

      if (done) {
        term.writeln("\r\nPuerto cerrado\r\n"); //⚠️
        await disconnectSerial();
        break;
      }

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        term.write(chunk);

        if (waitingResponse) {
          serialBuffer += chunk;
        }
      }
    }
  } catch (error) {
    term.writeln("\r\nConexión perdida\r\n"); //⚠️
    await disconnectSerial();
  }
}

//////////////////////////////////////////////////////////////
// SEND
//////////////////////////////////////////////////////////////

async function sendSerial(data) {
  if (!serialWriter) return;

  if (!data || data.length === 0) return; // 🔥 evitar vacío

  //console.log("SEND:", JSON.stringify(data), "length:", data.length);

  await serialWriter.write(encoder.encode(data));
}

//////////////////////////////////////////////////////////////
// TERMINAL INPUT
//////////////////////////////////////////////////////////////

function enableTerminalInput() {
  term.onData(async (data) => {
    if (!isConnected) return;

    // bloquear input SOLO durante envio
    if (isSendingCode) return;
    console.log("DATA:", JSON.stringify(data));
    await sendSerial(data);
  });
}

let serialConnected = false;

document.addEventListener("DOMContentLoaded", () => {
  const btnConnection = document.getElementById("btnConnection");
  const iconConnection = document.getElementById("iconConnection");

  if (!btnConnection || !iconConnection) {
    console.warn("Botón o icono no encontrados");
    return;
  }

  // Estado inicial → desconectado
  updateConnectionIcon(false);

  btnConnection.addEventListener("click", async () => {
    if (serialConnected) {
      await disconnectSerial();
    } else {
      await connectSerial();
    }
  });
});

//////////////////////////////////////////////////////////////
// DETECTAR DESCONEXIÓN FÍSICA USB
//////////////////////////////////////////////////////////////

navigator.serial.addEventListener("disconnect", async (event) => {
  //console.log("USB desconectado", event);

  if (serialPort && event.target === serialPort) {
    term.writeln("\r\nDispositivo desconectado físicamente\r\n"); //⚠️

    await disconnectSerial(); // usar tu función existente
  }
});

//////////////////////////////////////////////////////////////
// DETECTAR NUEVA CONEXIÓN USB
//////////////////////////////////////////////////////////////

navigator.serial.addEventListener("connect", (event) => {
  //console.log("USB conectado", event);

  term.writeln("\r\nDispositivo USB detectado\r\n"); //🔌
});

function updateConnectionIcon(connected) {
  const icon = document.getElementById("iconConnection");
  if (!icon) return;

  icon.classList.remove("icon-connect", "icon-disconnect");

  if (connected) {
    icon.classList.add("icon-connect");
  } else {
    icon.classList.add("icon-disconnect");
  }
}

btnRun.addEventListener("click", async () => {
  let codigo = "";

  if (isWorkSpace) {
    updateCodeFromBlockly();

    codigo = editor.getValue();
    console.log("Código generado:\n", codigo);
    //const visor = document.getElementById("codigoGenerado");

    //if (visor) {
    //visor.textContent = codigo;
    //}

    ejecutarPython(codigo);
  }

  if (!isConnected || !serialWriter) {
    console.log("Conecta la ESP32 primero.");
    //alert("Conecta la ESP32 primero.");
    return;
  }

  // 1️⃣ Obtener el código desde CodeMirror o textarea
  let codeStr = "";

  if (typeof editor !== "undefined" && editor.getDoc) {
    codeStr = editor.getDoc().getValue(); // tu CodeMirror
  } else {
    codeStr = document.getElementById("codeEditor").value; // fallback
  }
  /*
  // 3️⃣ Preparar el código para MicroPython
  let safeCode = codeStr
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\r");

  // 4️⃣ Comandos para escribir archivo en MicroPython
  let commands = [
    `f = open('main.py','w')`,
    `f.write('${safeCode}')`,
    `f.close()`,
  ];

  // 5️⃣ Enviar al dispositivo uno por uno
  for (let cmd of commands) {
    await sendSerial(cmd + "\r\n");
  }
  */
  //term.writeln(`\r\nArchivo main.py guardado correctamente\r\n`); //✅

  const code = editor.getValue();

  if (!code || code.trim() === "") {
    term.writeln("\r\nNo hay código para ejecutar\r\n"); //⚠️
    return;
  }

  try {
    // bloquear input mientras se envía
    isSendingCode = true;

    term.writeln("\r\nEjecutando código...\r\n"); //▶

    // 1. detener cualquier programa
    await sendSerial("\x03"); // Ctrl+C
    await sleep(100);

    // 2. entrar en paste mode
    await sendSerial("\x05"); // Ctrl+E
    await sleep(100);

    // 3. enviar código completo (no hace falta filtrar)
    await sendSerial(code);

    // asegurar salto final
    await sendSerial("\r\n");

    // 4. salir de paste mode
    await sendSerial("\x04"); // Ctrl+D
  } catch (error) {
    term.writeln("\r\nError: " + error + "\r\n"); //❌
  } finally {
    isSendingCode = false;

    term.focus();
  }
});

// Botón para subir/guardar código
document.getElementById("btnUploadCode").addEventListener("click", async () => {
  if (!isConnected || !serialWriter) {
    console.log("Conecta la ESP32 primero.");
    //alert("Conecta la ESP32 primero.");
    return;
  }

  // 1️⃣ Obtener el código desde CodeMirror o textarea
  let codeStr = "";
  if (typeof editor !== "undefined" && editor.getDoc) {
    codeStr = editor.getDoc().getValue(); // tu CodeMirror
  } else {
    codeStr = document.getElementById("codeEditor").value; // fallback
  }

  // 2️⃣ Obtener el nombre del archivo
  let fileNameInput = document.getElementById("fileNameInput");
  let fileName =
    fileNameInput && fileNameInput.value.trim() !== ""
      ? fileNameInput.value.trim()
      : "test.py";

  // 3️⃣ Preparar el código para MicroPython
  let safeCode = codeStr
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\r");

  // 4️⃣ Comandos para escribir archivo en MicroPython
  let commands = [
    `f = open('${fileName}','w')`,
    `f.write('${safeCode}')`,
    `f.close()`,
  ];

  // 5️⃣ Enviar al dispositivo uno por uno
  for (let cmd of commands) {
    await sendSerial(cmd + "\r\n");
  }

  term.writeln(`\r\nArchivo '${fileName}' guardado correctamente\r\n`); //✅
});

////////////////////////////////////////////////////////////
// STOP (Ctrl+C)
////////////////////////////////////////////////////////////

async function stopExecution() {
  if (!serialWriter) {
    term.writeln("\r\nNo conectado\r\n"); //⚠️
    return;
  }

  try {
    // Enviar Ctrl+C
    await sendSerial("\x03");

    term.writeln("\r\nEjecución detenida\r\n"); //⛔
  } catch (error) {
    console.error("Error enviando Ctrl+C:", error);
  }
}

document.getElementById("btnStop").addEventListener("click", stopExecution);

btnConsoleReset.addEventListener("click", async () => {
  await sendSerial("\x03");
  await sleep(100);

  await sendSerial("\x04");
});

btnConsoleClear.addEventListener("click", () => {
  term.clear();
});

const splitter = document.getElementById("splitter");
const editorWrapper = document.getElementById("editorWrapper");
const container = document.getElementById("codeSplitContainer");

let isDragging = false;

const MIN_EDITOR_HEIGHT = 100;
const MIN_TERMINAL_HEIGHT = 100;

splitter.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.cursor = "row-resize";
});

document.addEventListener(
  "mousemove",
  (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();

    let newEditorHeight = e.clientY - rect.top;

    const maxEditorHeight =
      rect.height - MIN_TERMINAL_HEIGHT - splitter.offsetHeight;

    if (newEditorHeight < MIN_EDITOR_HEIGHT)
      newEditorHeight = MIN_EDITOR_HEIGHT;

    if (newEditorHeight > maxEditorHeight) newEditorHeight = maxEditorHeight;

    editorWrapper.style.flex = `0 0 ${newEditorHeight}px`;

    refreshTerminalFit();
  },
  { passive: true },
);

document.addEventListener(
  "mouseup",
  () => {
    isDragging = false;
    document.body.style.cursor = "default";
  },
  { passive: true },
);

function resetSerialState() {
  serialReader = null;
  serialWriter = null;
  serialPort = null;

  isConnected = false;
  serialConnected = false;

  serialBuffer = "";
  waitingResponse = false;
}

function clearExplorer() {
  const container = document.getElementById("fileList");
  if (container) container.innerHTML = "";

  Files.currentFile = null;
}

const Files = {
  currentFile: null,

  isOpening: false, // 🔒 bandera anti doble clic

  async listFiles() {
    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado"); //⚠️
      return;
    }

    Files.currentFile = null;

    term.writeln("\r\nListando archivos..."); //📁

    await sendSerial("\x03");
    await sleep(100);

    await sendSerial("import os\r\n");
    await sendSerial("print(os.listdir())\r\n");

    const response = await this.readResponse();

    //console.log("RAW:", response);

    const files = this.parseList(response);

    this.updateExplorer(files);
  },

  async sendCommand(cmd) {
    const encoder = new TextEncoder();
    await serialWriter.write(encoder.encode(cmd));
  },

  async readResponse(timeout = 3000) {
    serialBuffer = "";
    waitingResponse = true;

    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (serialBuffer.includes("]")) {
        break;
      }
      await new Promise((r) => setTimeout(r, 50));
    }

    waitingResponse = false;

    return serialBuffer;
  },

  parseList(text) {
    try {
      const match = text.match(/\[(.*?)\]/);

      if (!match) return [];

      return match[0]
        .replace(/'/g, "")
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((f) => f.trim());
    } catch {
      return [];
    }
  },

  updateExplorer(files) {
    const container = document.getElementById("fileList");
    container.innerHTML = "";

    files.forEach((file) => {
      const row = document.createElement("div");
      row.className = "file-row";

      // ===== Nombre archivo =====
      const nameDiv = document.createElement("div");
      nameDiv.className = "file-name";
      nameDiv.textContent = file;
      nameDiv.title = "Abrir " + file;

      nameDiv.onclick = () => {
        if (this.isOpening) return;
        this.openFile(file);
      };

      // ===== Iconos =====
      const iconsDiv = document.createElement("div");
      iconsDiv.className = "file-icons";

      const runBtn = document.createElement("span");
      runBtn.className = "icon-btn icon-run";
      runBtn.title = "Ejecutar " + file;
      runBtn.onclick = (e) => {
        e.stopPropagation();
        this.runFile(file);
      };

      const downloadBtn = document.createElement("span");
      downloadBtn.className = "icon-btn icon-save-py";
      downloadBtn.title = "Descargar " + file;
      runBtn.onclick = (e) => {
        e.stopPropagation();
        this.runFile(file);
      };

      const deleteBtn = document.createElement("span");
      deleteBtn.className = "icon-btn icon-clear";
      deleteBtn.title = "Eliminar " + file;
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        this.deleteFile(file);
      };

      iconsDiv.appendChild(runBtn);
      iconsDiv.appendChild(downloadBtn);
      iconsDiv.appendChild(deleteBtn);

      row.appendChild(nameDiv);
      row.appendChild(iconsDiv);

      container.appendChild(row);
    });
  },

  async openFile(fileName) {
    // 🔒 BLOQUEO
    if (this.isOpening) return;
    this.isOpening = true;

    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado"); //⚠️
      this.isOpening = false;
      return;
    }

    term.writeln(`\r\nAbriendo ${fileName}...\r\n`); //📂

    try {
      await sendSerial("\x03");
      await sleep(100);

      serialBuffer = "";
      waitingResponse = true;

      await sendSerial(`print(open('${fileName}').read())\r\n`);

      const start = Date.now();

      while (Date.now() - start < 3000) {
        if (serialBuffer.includes(">>>")) break;
        await sleep(50);
      }

      waitingResponse = false;

      let content = serialBuffer;

      content = content.replace(
        new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`),
        "",
      );

      content = content.replace(/>>>/g, "");

      content = content.trim();

      editor.setValue(content);

      Files.currentFile = fileName;

      const input = document.getElementById("fileNameInput");
      if (input) input.value = fileName;

      editor.refresh();

      showView("viewCode");

      term.writeln("Archivo cargado correctamente\r\n"); //✅
    } catch (err) {
      console.error(err);
      term.writeln("Error abriendo archivo\r\n"); //❌
    } finally {
      // 🔓 DESBLOQUEAR SIEMPRE
      this.isOpening = false;
    }
  },

  async runFile(fileName) {
    if (!isConnected) return;

    term.writeln(`\r\nEjecutando ${fileName}...\r\n`); //▶

    await sendSerial("\x03");
    await sleep(100);

    await sendSerial(`exec(open('${fileName}').read())\r\n`);
  },

  async deleteFile(fileName) {
    if (!confirm("¿Eliminar " + fileName + "?")) return;

    if (fileName === "boot.py") {
      console.log("No se recomienda eliminar boot.py");
      //alert("No se recomienda eliminar boot.py");
      return;
    }

    term.writeln(`\r\nEliminando ${fileName}...\r\n`); //🗑

    await sendSerial("\x03");
    await sleep(100);

    await sendSerial(`import os\r\n`);
    await sendSerial(`os.remove('${fileName}')\r\n`);

    term.writeln("Archivo eliminado\r\n"); //✅

    // refrescar lista
    this.listFiles();
  },

  async downloadFile(fileName) {
    await sendSerial("\x03");
    await sleep(100);

    serialBuffer = "";
    waitingResponse = true;

    await sendSerial(`print(open('${fileName}').read())\r\n`);

    await sleep(1000);

    waitingResponse = false;

    let content = serialBuffer;

    content = content.replace(/>>>/g, "").trim();

    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  },
};

function toggleFloating(show) {
  if (window.FLOATING && Array.isArray(window.FLOATING)) {
    window.FLOATING.forEach((el) => {
      if (el) el.style.display = show ? "" : "none";
    });
  } else {
    // fallback por selector si hiciera falta
    document.querySelectorAll(".floating-tools").forEach((el) => {
      el.style.display = show ? "" : "none";
    });
  }
}

function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Minimizado / pestaña oculta
document.addEventListener("visibilitychange", () => {
  const hidden = document.visibilityState !== "visible";
  toggleFloating(!hidden);
  if (!hidden) {
    requestAnimationFrame(() => {
      refreshBlockly();
      refreshTerminalFit();
    });
  }
});

// Foco de ventana (por si el navegador no emite visibilitychange en todos los casos)
document.addEventListener("visibilitychange", () => {
  const hidden = document.visibilityState !== "visible";
  toggleFloating(!hidden);
});

// Cambios de tamaño (incluye maximizar/restaurar)
window.addEventListener(
  "resize",
  debounce(() => {
    // Si la ventana queda muy chica, ocultamos; ajusta umbrales a tu UI
    const tooSmall = window.innerWidth < 640 || window.innerHeight < 420;
    toggleFloating(!tooSmall);
    refreshBlockly();
    refreshTerminalFit();
  }, 150),
);

window.addEventListener("load", () => {
  document.querySelectorAll(".icon-btn").forEach((el) => {
    el.style.visibility = "visible";
  });
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    if (Code.workspace) Blockly.svgResize(Code.workspace);
  }, 200);
});

/* ===== DOBLE CLICK EN runstart ===== */
Code.workspace.getParentSvg().addEventListener("dblclick", function () {
  const block = Blockly.selected;
  if (!block) return;
  if (block.type !== "runstart") return;
  //console.log("🚀 Ejecutando animación");
  runBlocklyAnimation();
});

/* ===== Generar enlace para compartir ===== */
function generateShareLink() {
  const xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
  const xmlText = Blockly.Xml.domToText(xmlDom);

  // comprimir
  const compressed = LZString.compressToEncodedURIComponent(xmlText);

  // crear URL
  const url = location.origin + location.pathname + "#" + compressed;

  return url;
}

// ===== LOGGER SIMPLE =====

function saveLog(type, message, extra = {}) {
  const logs = JSON.parse(localStorage.getItem("app_logs") || "[]");

  logs.push({
    type,
    message,
    ...extra,
    time: new Date().toISOString(),
  });

  // limitar tamaño
  if (logs.length > 500) logs.shift();

  localStorage.setItem("app_logs", JSON.stringify(logs));
}

window.addEventListener("error", function (event) {
  saveLog("JS_ERROR", event.message, {
    file: event.filename,
    line: event.lineno,
    column: event.colno,
  });
});

window.addEventListener("unhandledrejection", function (event) {
  saveLog("PROMISE_ERROR", event.reason?.message || event.reason);
});



function generarLinkCompartir() {
  const xml = Blockly.Xml.workspaceToDom(Code.workspace);
  const xmlText = Blockly.Xml.domToText(xml);

  // 🔥 Comprimir
  const compressed = LZString.compressToEncodedURIComponent(xmlText);

  // Crear URL
  const url = window.location.origin + window.location.pathname + "#" + compressed;

  return url;
}

function compartir() {
  const url = generarLinkCompartir();

  const modal = document.getElementById("shareModal");
  const input = document.getElementById("shareInput");

  input.value = url;
  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("btnShare")?.addEventListener("click", compartir);

  document.getElementById("copyBtn")?.addEventListener("click", () => {
    const input = document.getElementById("shareInput");
    input.select();
    navigator.clipboard.writeText(input.value);
  });

  document.getElementById("closeModal")?.addEventListener("click", () => {
    document.getElementById("shareModal").style.display = "none";
  });

});

function cargarDesdeURL() {
  if (window.location.hash.length > 1) {
    try {
      const compressed = window.location.hash.substring(1);
      const xmlText = LZString.decompressFromEncodedURIComponent(compressed);
      const xml = Blockly.Xml.textToDom(xmlText);

      Blockly.Xml.domToWorkspace(xml, Code.workspace);

    } catch (e) {
      console.error("Error al cargar desde URL:", e);
    }
  }
}

window.addEventListener("load", () => {
  cargarDesdeURL();
});