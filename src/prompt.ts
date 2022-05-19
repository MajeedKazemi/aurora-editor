import * as monaco from "monaco-editor";
import { generateCode } from "./codex";

export class Prompt {
    editor: monaco.editor.IStandaloneCodeEditor;
    container: HTMLDivElement;
    state: "closed" | "open" = "closed";

    constructor(editor: monaco.editor.IStandaloneCodeEditor) {
        this.editor = editor;
    }

    private getCodeBeforeCursor(): string {
        this.editor.getPosition();

        const code = this.editor.getValue();

        return code
            .split("\n")
            .slice(0, this.editor.getPosition().lineNumber - 1)
            .join("\n");
    }

    private create() {
        this.container = document.createElement("div");
        this.container.classList.add("prompt-container");

        const form = document.createElement("div");
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

        const outputContainer = document.createElement("div");
        outputContainer.classList.add("prompt-output");

        const outputCode = document.createElement("p");
        outputCode.classList.add("prompt-output-code");

        outputContainer.appendChild(outputCode);

        this.container.appendChild(outputContainer);

        button.onclick = () => {
            generateCode(this.getCodeBeforeCursor(), input.value).then(
                (result: string) => {
                    outputCode.innerText = result;
                }
            );
        };

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

        input.focus();
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
