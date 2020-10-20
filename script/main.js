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
    if (isValid) {
        submit();
        form.reset();
    } else {
        console.error('error')
    }

})
// end

// todo start
const input = document.querySelector('.message'),
    btn = document.querySelector('.add'),
    result = document.querySelector('.todo');

btn.addEventListener('click', (e) => {
    // result.innerHTML += `<li>${input.value}</li>`
    if (input.value === '') return
    createDeleteElements(input.value)
    input.value = ''
})



function createDeleteElements(value) {
    console.log(value)

    const input = document.createElement('input')
    const text = document.createElement('textarea')
    const btn = document.createElement('button')
    const delet = document.createElement('button')
    const li = document.createElement('li')
    const div = document.createElement('div')

    input.type = 'text'
    btn.textContent = 'Добавить'
    delet.textContent = 'Delete'
    delet.className = delet
    text.cols = 54
    text.rows = 10


    li.textContent = value
    li.appendChild(delet)



    result.appendChild(li)
    li.appendChild(input)
    li.appendChild(text)
    li.appendChild(btn)
    // li.appendChild(p)
    // li.appendChild(span)
    li.appendChild(div)


    btn.addEventListener('click', () => {
        const span = document.createElement('span')
        const p = document.createElement('p')
        span.textContent = text.value
        p.textContent = input.value
        div.appendChild(p)
        div.appendChild(span)

    })

}
















    // const addMessage = document.querySelector('.message'),
    // addMessage2 = document.querySelector('.message1'),
    // addButton = document.querySelector('.add'),
    // todo = document.querySelector('.todo'),
    // text = document.querySelector('.text');

    // create_new_todo = wrap
    // addmessage = id input
    // todo = id result




// const createElements = () => {
//     const newElem = document.createElement('span');
//     newElem.textContent = input.value;
//     todo.appendChild(newElem)
// }


// addButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (!addMessage.value === '') {

//     }
// });

// let todoList = [];

// addButton.addEventListener('click', () => {
//     let newTodo = {
//         todo: addMessage.value,
//         todo1: addMessage2.value,
//         text: text.value,
//         checked: false,
//         important: false
//     };

//     todoList.push(newTodo);
//     displayMessages();
// });


// function displayMessages() {
//     let displayMessage = '';
//     todoList.forEach((item, i) => {
//         displayMessage += `
//         <li>
//         <label for='item_${i}'>${item.todo}</label>
//         <br>
//         <label for='item_${i}'>${item.todo1}</label>
//         <br>
//         <label for='item_${i}'>${item.text}</label>
//         <br>
//         <span>Блок № ${i + 1}</span>
//         <input type="text" class="message" placeholder="заголовок поля">
//         <textarea class="text" cols="54" rows="10" placeholder="содержание поля"></textarea>
//         <button>click</button>
//         </li>
//         `;
//         todo.innerHTML = displayMessage;

//         addMessage.value = '';
//         addMessage2.value = '';
//         text.value = '';
//     })
// };

// todo end
