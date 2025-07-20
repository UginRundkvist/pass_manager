import {Add, Subtract} from "./wailsjs/go/main/Calculator.js";

console.log("AAA")

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const resultDiv = document.getElementById('result');

if (!num1Input || !num2Input || !addBtn || !subtractBtn || !resultDiv) {
    console.error('Ошибка: Не найдены необходимые HTML-элементы!');
}

function getNumber(inputElement) {
    const value = inputElement.value.trim();
    return value === '' ? 0 : parseInt(value);
}

function showResult(value, isError = false) {
    resultDiv.innerHTML = isError
        ? `<div class="error">Ошибка: ${value}</div>`
        : `<div class="success">Результат: ${value}</div>`;
}

addBtn.addEventListener('click', async () => {
    try {
        const num1 = getNumber(num1Input);
        const num2 = getNumber(num2Input);

        const result = await Add(num1, num2);

        showResult(result);
    } catch (error) {
        showResult(error.message, true);
        console.error('Ошибка сложения:', error);
    }
});

subtractBtn.addEventListener('click', async () => {
    try {
        const num1 = getNumber(num1Input);
        const num2 = getNumber(num2Input);

        const result = await Subtract(num1, num2);
        showResult(result);
    } catch (error) {
        showResult(error.message, true);
        console.error('Ошибка вычитания:', error);
    }
});