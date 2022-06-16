import { ToDo } from "../js/models/toDo.js";
import { ToDoList } from "../js/models/ToDoList.js";
import { Service } from "../js/service/index.js";

const getEle = id => document.getElementById(id);
const tasksList = new ToDoList();
const service = new Service();
var isDown = true;

//Render--------------------------------------------
const renderList = (arr) => {
    let toDoContent = "";
    let completeContent = "";
    arr.forEach(ele => {
        if (ele.isDone === false) {
            toDoContent += `
        <li>
            <span>${ele.content}</span>
            <div class="buttons">
                <button class="remove" onclick="removeTask(${ele.id})"><i class="far fa-trash-alt"></i></button>
                <button class="complete" onclick="checkAsDone(${ele.id})"><i class="fas fa-check-circle"></i></button>
            </div>
        </li>   
            `
        }
        else {
            completeContent += `
        <li>
            <span>${ele.content}</span>
            <div class="buttons">
            <button class="remove" onclick="removeTask(${ele.id})"><i class="far fa-trash-alt"></i></button>
                <button class="complete"><i class="fas fa-check-circle"></i></button>
            </div>
        </li>   
            `
        }
    })
    getEle("todo").innerHTML = toDoContent;
    getEle("completed").innerHTML = completeContent;
}


//Get data from API and render-----------------------
const getTaskList = () => {
    service.getTasksListAPI()
        .then((result) => {
            let sortedArray = result.data;
            if (isDown) {
                sortedArray.sort((a, b) => a.content < b.content ? -1 : 1);
            }
            else{
                sortedArray.sort((a, b) => a.content < b.content ? 1 : -1);
            }
            renderList(sortedArray);
        })
}

//Remove task from list--------------------------------
window.removeTask = id => {
    service.removeTaskAPI(id)
        .then(result => {
            getTaskList();
        })
}

//Add new task into list-------------------------------
getEle("addItem").onclick = () => {
    const task = new ToDo(getEle("newTask").value, false);

    if (getEle("newTask").value) {
        service.addTaskAPI(task)
            .then(result => {
                getTaskList();
            })

        getEle("newTask").value = "";
    }

}

//Check task is done-------------------------------
window.checkAsDone = id => {
    service.getTaskAPI(id)
        .then(result => {
            result.data.isDone = true;
            service.editTaskAPI(id, result.data)
                .then(() => {
                    getTaskList();
                })
        })
}

//Sort down----------------------------------------------
getEle("sortDown").onclick = () => {
    isDown = true;
    getTaskList();
}

//Sort up----------------------------------------------
getEle("sortUp").onclick = () => {
    isDown = false;
    getTaskList();
}

getTaskList();