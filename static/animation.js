Blockly.JavaScript["time_sleep"] = function (block) {
  const time = block.getFieldValue("VALUE");
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + "sleep(" + time + ");\n";

  return code;
};

Blockly.JavaScript["analog_sensor_init"] = function (block) {
  const model = block.getFieldValue("MODEL");
  const pin = block.getFieldValue("PIN");

  const id = block.id;

  const code =
    "highlightBlock('" +
    id +
    "');\n" +
    "analogSensor_" +
    pin +
    " = { model: '" +
    model +
    "', pin: " +
    pin +
    " };\n";

  return code;
};

Blockly.JavaScript["analog_sensor_read"] = function (block) {
  const pin = block.getFieldValue("PIN");

  const code = "Math.floor(Math.random()*1024)";

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/* ===== DIVISIÓN SEGURA (simular Python) ===== */

Blockly.JavaScript["math_arithmetic"] = function (block) {
  const op = block.getFieldValue("OP");

  const A =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";

  const B =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";

  if (op === "DIVIDE") {
    const code =
      "((" +
      B +
      ")==0 ? (function(){ throw new Error('division by zero'); })() : (" +
      A +
      "/" +
      B +
      "))";

    return [code, Blockly.JavaScript.ORDER_DIVISION];
  }

  /* operaciones normales */

  const OPERATORS = {
    ADD: [" + ", Blockly.JavaScript.ORDER_ADDITION],
    MINUS: [" - ", Blockly.JavaScript.ORDER_SUBTRACTION],
    MULTIPLY: [" * ", Blockly.JavaScript.ORDER_MULTIPLICATION],
  };

  const tuple = OPERATORS[op];
  const code = A + tuple[0] + B;

  return [code, tuple[1]];
};

/* ===== GENERADOR IF OPTIMIZADO ===== */
Blockly.JavaScript["controls_if"] = function (block) {
  let n = 0;
  let code = "";
  const id = block.id;

  do {
    const condition =
      Blockly.JavaScript.valueToCode(
        block,
        "IF" + n,
        Blockly.JavaScript.ORDER_NONE,
      ) || "false";

    const branch = Blockly.JavaScript.statementToCode(block, "DO" + n);

    if (n === 0) {
      code += "highlightBlock('" + id + "');\n";
      code += "if (" + condition + ") {\n" + branch + "}";
    } else {
      code += " else if (" + condition + ") {\n" + branch + "}";
    }

    n++;
  } while (block.getInput("IF" + n));

  if (block.getInput("ELSE")) {
    const elseBranch = Blockly.JavaScript.statementToCode(block, "ELSE");
    code += " else {\n" + elseBranch + "}";
  }

  code += "\n";

  return code;
};

/* ===== GENERADOR TRY / EXCEPT ===== */

Blockly.JavaScript["controls_try_except"] = function (block) {
  const tryBranch = Blockly.JavaScript.statementToCode(block, "TRY");

  const exceptBranch = Blockly.JavaScript.statementToCode(block, "EXCEPT");

  const id = block.id;

  const code =
    "highlightBlock('" +
    id +
    "');\n" +
    "try {\n" +
    tryBranch +
    "} catch (e) {\n" +
    exceptBranch +
    "}\n";

  return code;
};

/* ===== GENERADOR CONTINUE (EXCEPT) ===== */

Blockly.JavaScript["exceptions_continue"] = function (block) {
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + "continue;\n";

  return code;
};

/* ===== GENERADOR PASS ===== */

Blockly.JavaScript["pass"] = function (block) {
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + ";\n"; // instrucción vacía

  return code;
};

/* ===== BLOQUE INICIO ===== */

Blockly.JavaScript["runstart"] = function (block) {
  return "";
};

/* ===== CONFIGURACIÓN HIGHLIGHT ===== */

Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
Blockly.JavaScript.addReservedWords("highlightBlock");

/* ===== VARIABLES ===== */

let interpreter = null;
let runner = null;

/* ===== RESALTAR BLOQUE ===== */

function highlightBlock(id) {
  id = String(id).replace(/'/g, "");
  Code.workspace.highlightBlock(id);
  const block = Code.workspace.getBlockById(id);
  if (!block) return;
  block.select(); // ← selecciona el bloque visualmente
}

/* ===== INICIALIZAR INTERPRETER ===== */

function initInterpreter(code) {
  interpreter = new Interpreter(code, function (interpreter, globalObject) {
    const highlightWrapper = function (id) {
      highlightBlock(id);
    };

    interpreter.setProperty(
      globalObject,
      "highlightBlock",
      interpreter.createNativeFunction(highlightWrapper),
    );

    const alertWrapper = function (text) {
      console.log(text);
    };

    interpreter.setProperty(
      globalObject,
      "alert",
      interpreter.createNativeFunction(alertWrapper),
    );

    // ⬇️ NUEVO sleep
    const sleepWrapper = function (time, callback) {
      setTimeout(callback, time);
    };

    interpreter.setProperty(
      globalObject,
      "sleep",
      interpreter.createAsyncFunction(sleepWrapper),
    );
  });
}

/* ===== EJECUCIÓN ===== */

function runStep() {
  if (!interpreter) return;

  try {
    if (interpreter.step()) {
      runner = setTimeout(runStep, 80); // antes 250
    } else {
      interpreter = null;
      Code.workspace.highlightBlock(null);
      Blockly.selected && Blockly.selected.unselect();
    }
  } catch (e) {
    console.error(e);
    interpreter = null;
    Code.workspace.highlightBlock(null);
  }
}

/* ===== EJECUTAR ===== */

function runBlocklyAnimation() {
  if (runner) {
    clearTimeout(runner);
    runner = null;
  }

  Code.workspace.highlightBlock(null);

  Blockly.JavaScript.init(Code.workspace);

  const code = Blockly.JavaScript.workspaceToCode(Code.workspace);

  //console.log("Código generado:");
  //console.log(code);

  initInterpreter(code);

  runStep();
}
