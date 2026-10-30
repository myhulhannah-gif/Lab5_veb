const tasks = [
    { name: "Підготувати звіт",     description: "Квартальний звіт",   start: "2026-10-10", duration: 7 },
    { name: "Лабораторна з JS",     description: "Зробити роботу №5",  start: "2026-10-15", duration: 3 },
    { name: "Верстка сайту",        description: "Головна сторінка",   start: "2026-10-23", duration: 5 },
    { name: "Презентація проєкту",  description: "Підготувати слайди", start: "2026-10-20", duration: 10 },
    { name: "Курсова робота",       description: "Написати вступ",     start: "2026-10-28", duration: 10 },
    { name: "Підготовка до іспиту", description: "Повторити теми 1-5", start: "2026-11-02", duration: 14 }
];

function parseDate(text){
    const parts = text.split("-");
    return new Date(parts[0], parts[1]-1, parts[2]);
}

const DAY = 1000 * 60 * 60 * 24; //мілісекунд у добі

function daysBetween(from, to){
    return Math.round((to - from) / DAY);
}

function getStatus(task){
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = parseDate(task.start);
    const end = new Date(start);
    end.setDate(start.getDate() + task.duration);

    if(today >= end){
        return "done";
    }
    else if(today >= start){
        return "progress";
    }
    else{
        return "planned";
    }
}

//побудова картки однієї задачі
function buildCard(task, status){
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = parseDate(task.start);
    const end = new Date(start);
    end.setDate(start.getDate() + task.duration);

    let extra = "";
    if (status === "done") {
        extra = "Задачу виконано";
    } else if (status === "progress") {
        extra = "Залишилось днів до завершення: " + daysBetween(today, end);
    } else {
        extra = "Почнеться через " + daysBetween(today, start) + " дн.";
    }

    return `<div class="card ${status}">
        <h4>${task.name}</h4>
        <p>${task.description}</p>
        <p>Початок: ${start.toLocaleDateString("uk-UA")}</p>
        <p>Термін виконання: ${end.toLocaleDateString("uk-UA")}</p>
        <p>Тривалість: ${task.duration} дн.</p>
        <p><b>${extra}</b></p>
    </div>`;
}

//виведення трьох груп
function showPlanner(){
    let doneHtml = "";
    let progressHtml = "";
    let plannedHtml = "";

    for (let i = 0; i < tasks.length; i++){
        const task = tasks[i];
        const status = getStatus(task);
        const card = buildCard(task, status);

        if (status === "done") {
            doneHtml += card;
        } else if (status === "progress") {
            progressHtml += card;
        } else {
            plannedHtml += card;
        }
    }

    document.getElementById("result").innerHTML =
        "<h3>Виконані</h3>" + doneHtml +
        "<h3>В процесі</h3>" + progressHtml +
        "<h3>Повинні початися через … днів</h3>" + plannedHtml;
}

//подія кліку на кнопку
document.getElementById("btn").addEventListener("click", showPlanner);