/* =========================
   MENU ARCHIVO
========================= */

/* =========================
   MENU ARCHIVO
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ========= NUEVO ========= */
    const btnNew = document.getElementById("btnNew");
    if (btnNew) {
        btnNew.addEventListener("click", function () {
            if (confirm("¿Borrar todo el proyecto actual?")) {

                if (Code.workspace) {
                    Code.workspace.clear();   // limpia Blockly
                }

                const codeArea = document.getElementById("codeArea");
                if (codeArea) {
                    codeArea.value = "";
                }

                localStorage.removeItem("blockly_autosave_workspace_v1");
            }
        });
    }


    /* ========= GUARDAR PY ========= */
    const btnSavePy = document.getElementById("btnSavePy");
    if (btnSavePy) {
        btnSavePy.addEventListener("click", function () {

            let code = "";

            // Si usas generador Blockly
            if (Code.workspace && Blockly.Python) {
                code = Blockly.Python.workspaceToCode(Code.workspace);
            } else {
                const codeArea = document.getElementById("codeArea");
                if (codeArea) {
                    code = codeArea.value;
                }
            }

            const blob = new Blob([code], { "type": "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "codigo.py";
            link.click();
        });
    }


    /* ========= CARGAR PY ========= */
    const btnLoadPy = document.getElementById("btnLoadPy");
    const inputLoadPy = document.getElementById("loadPy");

    if (btnLoadPy && inputLoadPy) {

        btnLoadPy.addEventListener("click", function () {
            inputLoadPy.click();
        });

        inputLoadPy.addEventListener("change", function (event) {

            const file = event.target.files[0];
            if (!file) return;

            // Validación correcta (tu bloque editado)
            if (!file.name.endsWith(".py")) {
                alert("Selecciona un archivo .py válido");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const codeArea = document.getElementById("codeArea");
                if (codeArea) {
                    codeArea.value = e.target.result;
                }
            };

            reader.readAsText(file);

            event.target.value = "";
        });
    }


    /* ========= RECARGAR ========= */
    const btnReload = document.getElementById("btnReload");
    if (btnReload) {
        btnReload.addEventListener("click", function () {
            location.reload();
        });
    }

});

// BOTÓN: GUARDAR XML (SIN ALERTAS EDGE)
document.getElementById("btnSave").addEventListener("click", async (e) => {
    e.preventDefault();

    const workspace = Blockly.getMainWorkspace();

    //console.log("Bloques:", workspace.getAllBlocks(false).length);

    const xmlDom = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    const result = await window.pywebview.api.save_xml(xmlText);

    if (result?.status === "ok") {
        alert("Proyecto guardado en:\n" + result.path);
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

            // Limpiar workspace actual
            Code.workspace.clear();

            // Convertir texto XML a DOM
            const xmlDom = Blockly.Xml.textToDom(xmlText);

            // Cargar bloques al workspace
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
        } catch (err) {
            alert("Error al cargar el archivo XML");
            console.error(err);
        }
    };

    reader.readAsText(file);

    // Permite volver a cargar el mismo archivo si se desea
    event.target.value = "";
});

