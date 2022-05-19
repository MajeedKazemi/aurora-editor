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

        const form = document.createElement("form");
        form.classList.add("prompt-form");

        const input = document.createElement("input");
        input.classList.add("prompt-input");
        input.setAttribute(
            "placeholder",
            "Generate code based on your description"
        );

        const button = document.createElement("button");
        button.classList.add("prompt-button");
        button.innerText = "Generate";

        form.appendChild(input);
        form.appendChild(button);

        this.container.appendChild(form);
        document.body.appendChild(this.container);

        document.addEventListener("click", (e) => {
            if (
                e.x < this.container.offsetLeft ||
                e.x > this.container.offsetLeft + this.container.offsetWidth ||
                e.y < this.container.offsetTop ||
                e.y > this.container.offsetTop + this.container.offsetHeight
            ) {
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
