let modeSwitcher = document.getElementById("modeSwitch");

let body = document.body;

let addTodo = document.querySelector('.add');

let todoLists = document.getElementById('todoLists');

let stage = document.querySelector('.stage');

let clearCompleted = document.querySelector('.items__clear');

let itemsLeft = document.querySelector('.items__left > span');

let itemsLeftValue = itemsLeft.textContent;


let textTodo = document.querySelector('.text');

let drag = document.querySelector('.drag');


function enterKey(event) {
    if (event.key == 'Enter') {
        addingTodo();
    }
}

textTodo.addEventListener('keydown', enterKey);

modeSwitcher.addEventListener('click', event => {
    let header = document.getElementsByTagName('header')[0];
    let boxes = document.querySelectorAll('.box');
    let jsLabels = document.querySelectorAll('.js-label');
    let stage = document.querySelector('.stage');
    if (body.classList.contains('moon__mode-body')) {
        modeSwitcher.src = "images/icon-moon.svg";
        modeSwitcher.alt = 'moon-mode icon'

        body.classList.remove('moon__mode-body');
        body.classList.add('sun__mode-body');

        header.classList.remove('moon__mode-header')
        header.classList.add('sun__mode-header')

        stage.classList.remove('moon__mode-stage');
        stage.classList.add('sun__mode-stage');

        drag.classList.remove('moon__mode-drag');
        drag.classList.add('sun__mode-drag');
        
        for (let box of boxes) {
            box.classList.remove('moon__mode-box');
            box.classList.add('sun__mode-box');
            if (box.classList.contains('moon__mode-li')) {
                box.classList.remove('moon__mode-li');
                box.classList.add('sun__mode-li');
            }
            if (box.classList.contains('moon__mode-status')) {
                box.classList.remove('moon__mode-status');
                box.classList.add('sun__mode-status');
            }
        }

        for (let label of jsLabels) {
            if (label.classList.contains('moon__mode-label')) {
                label.classList.remove('moon__mode-label');
                label.classList.add('sun__mode-label');
            }
        }

        for (let status of stage.querySelectorAll('[data-staging]')) {
            if (status.classList.contains('moon__mode-hover')) {
                status.classList.remove('moon__mode-hover');
                status.classList.add('sun__mode-hover');
            }
        }

    } else {
        modeSwitcher.src = "images/icon-sun.svg";
        modeSwitcher.alt = 'sun-mode icon'

        body.classList.add('moon__mode-body');
        body.classList.remove('sun__mode-body');

        header.classList.add('moon__mode-header');
        header.classList.remove('sun__mode-header');

        stage.classList.add('moon__mode-stage');
        stage.classList.remove('sun__mode-stage');

        drag.classList.add('moon__mode-drag');
        drag.classList.remove('sun__mode-drag');

        for (let box of boxes) {
            box.classList.remove('sun__mode-box');
            box.classList.add('moon__mode-box');
            if (box.classList.contains('sun__mode-li')) {
                box.classList.remove('sun__mode-li');
                box.classList.add('moon__mode-li');
            }
            if (box.classList.contains('sun__mode-status')) {
                box.classList.remove('sun__mode-status');
                box.classList.add('moon__mode-status');
            }
        }

        for (let label of jsLabels) {
            if (label.classList.contains('sun__mode-label')) {
                label.classList.remove('sun__mode-label');
                label.classList.add('moon__mode-label');
            }
        }

        for (let status of stage.querySelectorAll('[data-staging]')) {
            // status.classList.remove('sun__mode-hover');
            // status.classList.add('moon__mode-hover');
            if (status.classList.contains('sun__mode-hover')) {
                status.classList.remove('sun__mode-hover');
                status.classList.add('moon__mode-hover');
            }
        }

    }
})

function addingTodo(event) {
    let todoText = document.getElementById('addText');
    let todoTextValue = todoText.value;

    if (todoTextValue.trim() == "") {
        let message = document.createElement('div');
        message.textContent = `Can't make empty list`;
         message.classList.add('emptyList');
         addTodo.append(message);
         todoText.focus();
         setTimeout(() => {
             message.remove();
         }, 1500);
        return;
    }
    
    let li = document.createElement('li');
    if (body.classList.contains('moon__mode-body')) {
        li.classList.add('box', 'moon__mode-box', 'moon__mode-li');
        li.setAttribute('data-list', 'list');
        li.innerHTML = `<input
        type="radio"
        name=""
        id="select"
        class="select__input"
    />
    <label
        for="select"
        class="js-label select__label moon__mode-label" data-stage=""
    ></label
    ><span class="list">
        <span class="list__word">${todoTextValue}</span>
        <span class="list__delete"><img src="images/icon-cross.svg" alt=""></span>
    </span>`
    } else {
        li.classList.add('box', 'sun__mode-box', 'sun__mode-li');
        li.setAttribute('data-list', 'list');
        li.innerHTML = `<input
        type="radio"
        name=""
        id="select"
        class="select__input"
    />
    <label
        for="select"
        class="js-label select__label sun__mode-label" data-stage=""
    ></label
    ><span class="list">
        <span class="list__word">${todoTextValue}</span>
        <span class="list__delete"><img src="images/icon-cross.svg" alt=""></span>
    </span>`
    }
    todoLists.querySelector('li:last-child').before(li);
    li.draggable = true;
    todoText.value = "";
    todoText.focus();
    leftItems();
    li.addEventListener('dragstart', event => {
        li.classList.add('dragging');
    })
    li.addEventListener('dragend', event => {
        setTimeout(() => {
            li.classList.remove('dragging');
        }, 500);
    })
}

// container = todoLists

// draggables = [data-list="list"]

todoLists.addEventListener('dragover', event => {
    event.preventDefault(); // to prevent the do not allow cursor
    const afterElement = getDragAfterElement(event.clientY);
    const draggable = document.querySelector('.dragging')
    if (afterElement == undefined) {
        todoLists.querySelector('li:last-child').before(draggable);
    } else {
        afterElement.before(draggable);
    }
})

function getDragAfterElement(yPosMouse) {
    const draggableElments = [...todoLists.querySelectorAll('[data-list="list"]:not(.dragging)')];

    return draggableElments.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yPosMouse - box.top - box.height / 2;
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child}
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

addTodo.addEventListener('click', addingTodo);

function doneList(event) {
    let eventLabel = event.target.closest('[data-stage]');
    if (!eventLabel) {
        return;
    }
    if (eventLabel.dataset.stage == 'completed') {
        return;
    }
    eventLabel.setAttribute('data-stage', "completed");

    let parentComple = event.target.closest('.box');
    parentComple.classList.add('completed');
    itemsLeftValue--;
    itemsLeft.textContent = itemsLeftValue;
}

todoLists.addEventListener('click', doneList);

function cancelList(event) {
    let cancelBtn = event.target.closest('.list__delete');
    if (!cancelBtn) {
        return;
    }
    let parentLi = event.target.closest('.box');
    if (parentLi.querySelector('.js-label').dataset.stage == "") {
        itemsLeftValue--;
        itemsLeft.textContent = itemsLeftValue;
    }
    parentLi.remove();

}

clearCompleted.addEventListener('click', event => {
    let allCompleted = document.querySelectorAll('.completed');
    if(!allCompleted) {
        return;
    }
    for (let completed of allCompleted) {
        completed.remove();
    }
})

todoLists.addEventListener('click', cancelList);

function leftItems() {
    let leftItem = document.querySelectorAll('[data-list="list"]');
    let remainingItem = 0;
    for (let list of leftItem) {
        if (!list.classList.contains('completed')) {
            remainingItem++;
        }
    }
    itemsLeftValue = remainingItem;
    itemsLeft.textContent = itemsLeftValue;
}

window.addEventListener('load', leftItems);

function stagingList(event) {
    let eventTarget = event.target.closest('[data-staging]');

    if (!eventTarget) {
        return
    }
    if (eventTarget.classList.contains('current-stage')) {
        return;
    }
    for (let status of stage.querySelectorAll('[data-staging]')) {
        if (status.classList.contains('current-stage')) {
            status.classList.remove('current-stage');
        }
    }

    for (let status of stage.querySelectorAll('[data-staging]')) {
        if (body.classList.contains('moon__mode-body')) {
            status.classList.add('moon__mode-hover');
            status.classList.remove('sun__mode-hover');
        } else {
            status.classList.add('sun__mode-hover');
            status.classList.remove('moon__mode-hover');
        }
        
    }

    if (eventTarget.classList.contains('moon__mode-hover')) {
        eventTarget.classList.remove('moon__mode-hover');
    } else {
        eventTarget.classList.remove('sun__mode-hover');
    }

    eventTarget.classList.add('current-stage');

    let eventStage = eventTarget.dataset.staging;


    switch (eventStage) {
        case 'allTodo':
            for (let list of document.querySelectorAll('[data-list="list"]')) {
                list.hidden = false;
            }
            break;
    
        case 'activeTodo':
            for (let list of document.querySelectorAll('[data-list="list"]')) {
                list.hidden = false;
                if (list.classList.contains('completed')) {
                    list.hidden = true;
                }
            }
            break;
        case 'completedTodo':
            for (let list of document.querySelectorAll('[data-list="list"]')) {
                list.hidden = false;
                if (!list.classList.contains('completed')) {
                    list.hidden = true;
                }
            }
            break;
    }
}

stage.addEventListener('click', stagingList);