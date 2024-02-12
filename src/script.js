//import "/src/style.css";
const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector("form > input");


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const value = input.value;
    input.value = '';
    addTodo(value);
});

const todos = [
    {
        text:'je suis une todo',
        done: false,
        editMode: true
    },
    {
        text:'faire du JevaScript',
        done:true,
        editMode: false
    }
]

const displayTodo = () =>{
    const todosNode = todos.map((todo, index) =>{
        if(todo.editMode){
            return creareTodoEditElement(todo, index);
        }else{
            return  createTodoElement(todo, index);
        }
    })
    ul.innerHTML = ``;
    ul.append(...todosNode);
}

const createTodoElement = (todo, index) =>{
    const li = document.createElement('li');

    const btn_delete = document.createElement('button');
    btn_delete.textContent = 'supprimer';
    const btn_edit = document.createElement('button');
    btn_edit.textContent = 'Edit';
    btn_delete.addEventListener('click', event =>{
        event.stopPropagation();
        deleteTodo(index);
    })
    btn_edit.addEventListener('click', event =>{
        event.stopPropagation();
        toggleEditTodo(index);
    })
    li.innerHTML = `  
        <span class = "todo ${todo.done ? 'done' : ''}"></span>
        <p>${todo.text }</p>
    `;
    li.addEventListener('click', event => {
        toggleTodo(index);
    })
    li.append(btn_edit, btn_delete);
    return li;
};

const creareTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    const btn_save = document.createElement('button');
    btn_save.textContent = 'save';
    const btn_cancel = document.createElement('button');
    btn_cancel.textContent = 'cancel';
    btn_cancel.addEventListener('click', event =>{
        event.stopPropagation();
        toggleEditTodo(index);
    });
    btn_save.addEventListener('click', event =>{
        event.stopPropagation();
        editTodo(index, input);
    })
    li.append(input, btn_cancel, btn_save);
    return li;
}

const addTodo = (text) => {
    todos.push({
        text,
        done: false
    });
    displayTodo();
};

const deleteTodo = (index) =>{
   
    todos.splice(index, 1);
    displayTodo();
};
const toggleTodo = index =>{
    todos[index].done = !todos[index].done;
    displayTodo();
}

const toggleEditTodo = (index) =>{
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}
const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();
}
displayTodo();