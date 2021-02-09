const form = document.querySelector('#task-form'); 
const taskInput = document.querySelector('#task'); 

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
var taskDate;

var DB;

// Add Event Listener [on Load]
document.addEventListener('DOMContentLoaded', () => {
    // create the database
    let TasksDB = indexedDB.open('tasks', 1);

    // if there's an error
    TasksDB.onerror = function() {
            console.log('There was an error');
        }
        // if everything is fine, assign the result to the instance
    TasksDB.onsuccess = function() {
        // console.log('Database Ready');

        // save the result
        DB = TasksDB.result;

        // display the Task 
        displayTask();
    }
    function displayTask() {

        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');
        let request = objectStore.get(id);

        request.onsuccess = function(event) {
            if (request.result) {
                taskInput.value = request.result.taskname;
                taskDate = request.result.date;
                console.log(taskDate)

            } else {
                console.log('No data record');
            }
        };
        request.onerror = function(event) {
            console.log('Transaction failed');
        };
    }
    form.addEventListener('submit', updateTask);
    function updateTask(e) {
        e.preventDefault();
        
        // Check empty entry
        if (taskInput.value === '') {
            taskInput.style.borderColor = "red";

            return;
        }
        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');

        let getTask = {
            taskname: taskInput.value,
            date : taskDate,
            id: id,
        }
        objectStore.put(getTask); 
        transaction.oncomplete = () => {
                    console.log("Yes")
                }      
        history.back();
    }
});


        /* 
        Instruction set to handle Update

        1. Declare the transaction and object store objects 
        2. Use the id on put method of index db
        
        */