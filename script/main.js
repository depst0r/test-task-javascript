'use strict';

// foto
const previewFile = () => {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
};
// end

// form
const form = document.querySelector('form');

let isValid = false;

const regExpName = /^([А-Я][а-я]*)\s([А-Я][а-я]*)((\s[А-Я][а-я]*)$|$)/;
const regExpPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const regExpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
const regExpDate = /^(?: (?: 31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const submit = () => {
    console.log('submit')
}

const validateElem = (elem) => {
    if (elem.name == 'username') {
        if (!regExpName.test(elem.value) && elem.value !== '') {
            elem.nextElementSibling.textContent = 'Введите коректное ФИО, Иванов Иван Иванович';
            isValid = false;
        } else {
            elem.nextElementSibling.textContent = '';
            isValid = true;
        }
    }
    if (elem.name == 'userdate') {
        if (!regExpDate.test(elem.value) && elem.value !== '') {
            elem.nextElementSibling.textContent = 'Введите коректную дату , DD/MM/YYYY';
            isValid = false;
        } else {
            elem.nextElementSibling.textContent = '';
            isValid = true;
        }
    }
    if (elem.name == 'useremail') {
        if (!regExpEmail.test(elem.value) && elem.value !== '') {
            elem.nextElementSibling.textContent = 'Введите коректный Email';
            isValid = false;
        } else {
            elem.nextElementSibling.textContent = '';
            isValid = true;
        }
    }
    if (elem.name == 'userphone') {
        if (!regExpPhone.test(elem.value) && elem.value !== '') {
            elem.nextElementSibling.textContent = 'Введите коректный номер телефона';
            isValid = false;
        } else {
            elem.nextElementSibling.textContent = '';
            isValid = true;
        }
    }
};

for (let elem of form.elements) {
    if (elem.tagName !== 'BUTTON') {
        elem.addEventListener('blur', () => {
            validateElem(elem)
        })
    }
}

form.addEventListener('submit', (e) => {
    console.log(isValid)
    e.preventDefault();
    for (let elem of form.elements) {
        if (elem.tagName !== 'BUTTON') {
            if (elem.value === '') {
                elem.nextElementSibling.textContent = 'Данное поле не заполненно!';
                isValid = false;
            } else {
                elem.nextElementSibling.textContent = '';
                isValid = true;
            }
        }
    }
    if (isValid == true) {
        submit();
        form.reset();
    } else {
        console.error('error')
    }

})
// end

// todo start
const addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];

addButton.addEventListener('click', () => {
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
});

function test() {

}

function displayMessages() {
    let displayMessage = '';
    todoList.forEach((item, i) => {
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}'>
        <label for='item_${i}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
        addMessage.value = '';
    })
}

// todo end
