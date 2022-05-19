import * as monaco from "monaco-editor";

export class Prompt {
    editor: monaco.editor.IStandaloneCodeEditor;
    container: HTMLDivElement;
    state: "closed" | "open" = "closed";

    constructor(editor: monaco.editor.IStandaloneCodeEditor) {
        this.editor = editor;
    }

    private create() {
        this.container = document.createElement("div");
        this.container.classList.add("prompt-container");

        document.body.appendChild(this.container);

        document.addEventListener("click", (e) => {
            if (e.target !== this.container) {
                this.close();
            }
        });
    }

    open() {
        if (this.state === "closed") this.create();

        this.state = "open";
    }

    close() {
        if (this.state === "open") {
            this.container.remove();
            this.state = "closed";
        }
    }
}
