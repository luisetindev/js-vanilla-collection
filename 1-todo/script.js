const todoInput = document.querySelector("#todoInput")
const todoButton = document.querySelector("#todoButton")
const todoList = document.querySelector("#todoList")


const myTodosLS = readLS(); // null | [{},{}]
const myTodos = myTodosLS ? myTodosLS : [];
renderTodos();

todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        addTodo();
    }
});

function addTodo(){

    let text = todoInput.value;

    if(!text){
        console.log("La tarea no puede estar vacía");
        return;
    }

    let exists = false;
    myTodos.forEach(todo => {
        if(todo.content == text){
            exists = true;
        }
    })

    if(exists){
        console.log("El todo ya exsite.")
        return;
    }

    const myTodo = {
        "content": text,
        "marked": false,
    }

    myTodos.push(myTodo)

    renderTodos();
    updateLS();
}

function updateLS(){

    localStorage.setItem("todos", JSON.stringify(myTodos));

}

function readLS(){
    const todosLS = JSON.parse(localStorage.getItem("todos"));
    return todosLS;
}

function renderTodos(){

    todoList.innerHTML = "";

    myTodos.forEach(todo => {
        const todoLI = document.createElement("li");


        todoLI.textContent = todo.content;

        if(todo.marked == true){
            todoLI.classList.add("todo-completed");
        }

        const buttonDeleteTodo = document.createElement("button");
        
        todoLI.append(buttonDeleteTodo);
        buttonDeleteTodo.textContent = "X";
        buttonDeleteTodo.addEventListener("click", function(){
            removeTodoFromList(todo);
        })


        todoLI.addEventListener("click", function(){
            todoLI.classList.toggle("todo-completed");


            myTodos.forEach(td => {
                if(todo.content == td.content){
                    if(td.marked){
                        td.marked = false;
                    }else{
                        td.marked = true;
                    }
                }
            })

            updateLS();
        })
        todoList.append(todoLI);   
    });
}


function removeTodoFromList(todo){
    myTodos.forEach(td => {
        if(td.content == todo.content){
            myTodos.splice(myTodos.indexOf(td), 1);
        }
    })
    updateLS();
    renderTodos();
}