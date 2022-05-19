import { AxiosResponse } from "axios";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export async function generateCode(
    prevCode: string,
    comment: string
): Promise<string> {
    let promptStr: string = "";

    if (prevCode.trim() === "") {
        promptStr = `def main():\n    # ${comment}\n    `;
    } else {
        promptStr = `def main():\n    ${prevCode}\n    # ${comment}\n    `;
    }

    return new Promise<string>((resolve, reject) => {
        openai
            .createCompletion("code-davinci-002", {
                prompt: promptStr,
                temperature: 0,
                max_tokens: 182,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["\n"],
            })
            .then((response: AxiosResponse<CreateCompletionResponse>) => {
                resolve(response.data.choices[0].text);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
