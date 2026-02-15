const checksInputs = document.querySelectorAll(".input_check");
const rangeInput = document.querySelector("#input_range_password") as HTMLInputElement;
const range = document.querySelector("#range") as HTMLInputElement;
const buttonGenerator = document.querySelector("#button_generator_password");
const passwordGenerated = document.querySelector("#generated_password");
const copy = document.querySelector("#icon_copy");

interface Input {
    type: string;
    chars: string;
};

const inputsType: Input[] = [
    {
        type: "numbers",
        chars: "0123456789"
    },
    {
        type: "lettersUpper",
        chars: "ABCDEFGHIJKLMNOPRSTUVWXYZ"
    },
    {
        type: "lettersLower",
        chars: "abcdefghijklmnopqrstuvwxyz"
    },
    {
        type: "symbols",
        chars: "!@$&()-+"
    }
];

let inputs: Input[] = [];


checksInputs.forEach((checkInput) => {
    checkInput!.addEventListener("click", () => {
        const inputId = checkInput!.getAttribute("id");
        const typeInput = inputsType.find((input) => input.type === inputId)
        if (checkInput!.getAttribute("checked") === null) {
            checkInput!.setAttribute("checked", '');
            inputs.push({type: typeInput!.type, chars: typeInput!.chars});
            return;
        };
        checkInput!.removeAttribute("checked");
        let index: number = 0;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i]?.type === inputId) index = i;
        };
        inputs.splice(index, 1);
    });
});

function getSingleChar(chars: string) {
    let random = chars.split("")[Math.floor(Math.random() * chars.length)];
    return random;
};

function generator(length: number): string {
    let values: string[] = [];
    for (let i = 0; i < length; i++) {
        const chars = inputs.map((input) => input.chars);
        const randomChar = getSingleChar(String(chars[Math.floor(Math.random() * chars.length)]));
        values.push(String(randomChar));
    };
    return values.join("");
}


rangeInput!.addEventListener("input", () => {
    const value:string = rangeInput.value;
    range.textContent = value;
});

function generatorPassword() {
    if (inputs.length === 0) return alert(`Selecione pelo menos um item.`);
    buttonGenerator!.textContent = 'Gerando senha...';
    setTimeout(() => {
        const password: string = generator(Number(rangeInput.value));
        passwordGenerated!.textContent = password;
        buttonGenerator!.textContent = 'Gerar Senha';
    }, 500);
};

function copyPassword() {
    if (passwordGenerated!.textContent.trim().length === 0) return;
    const element: string = passwordGenerated!.textContent;
    navigator.clipboard.writeText(element)
    alert(`A senha ${passwordGenerated!.textContent} foi copiada!`);
};

buttonGenerator?.addEventListener("click", () => {
    generatorPassword();
});

copy!.addEventListener("click", () => {
    copyPassword();
})