// Завдання 2.1
const fruitSelect = document.getElementById("fruit");
const priceInput = document.getElementById("price");
const list = document.getElementById("list");
const message = document.getElementById("message");

function addFruit(){
    const text = priceInput.value.trim().replace(",", ".");
    const price = Number(text);

    if (text === "" || isNaN(price) || price <= 0){
        message.textContent = "Введіть коректну вартість (число не менше 0)";
        return;
    }
    message.textContent = "";

    //створюємо пункт списку і додаємо його в <ul>
    const li = document.createElement("li");
    li.textContent = fruitSelect.value + " – " + price.toFixed(2) + " грн";
    list.appendChild(li);

    priceInput.value = "";
}

//подія: натискання клавіші в полі вартості
priceInput.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault(); //щоб форма не перезавантажила сторінку
        addFruit();
    }
});

// Завдання 2.2
//випадкове ціле число від 1 до 99
function randomNumber(){
    return Math.floor(Math.random() * 99) + 1;
}

//заповнення таблиці за правилами
function fillTable(){
    const table = document.getElementById("matrix");

    for (let i = 0; i < table.rows.length; i++){
        for (let j = 0; j < table.rows[i].cells.length; j++){
            let value;

            if (i === j) {
                value = 0;                    //головна діагональ
            } else if (i % 2 === 1) {
                value = -randomNumber();      //парний рядок: від'ємне
            } else {
                value = randomNumber();       //непарний рядок: додатне
            }

            table.rows[i].cells[j].textContent = value;
        }
    }
}

document.getElementById("fillBtn").addEventListener("click", fillTable);