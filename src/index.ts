import * as monaco from "monaco-editor";
import "./index.css";

// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === "json") {
            return "./json.worker.bundle.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
            return "./css.worker.bundle.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return "./html.worker.bundle.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "./ts.worker.bundle.js";
        }
        return "./editor.worker.bundle.js";
    },
};

monaco.editor.create(document.getElementById("monaco-editor"), {
    value: "",
    language: "python",
    minimap: {
        enabled: false,
    },
    dimension: { height: 500, width: 500 },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    contextmenu: false,
    codeLens: false,
    mouseWheelScrollSensitivity: 0,
    scrollbar: {
        vertical: "auto",
        horizontal: "auto",
        verticalSliderSize: 5,
        horizontalSliderSize: 5,
        scrollByPage: false,
    },
    fontSize: 20,
    lineHeight: 30,
});
