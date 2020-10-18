

$(document).ready(onReady);

function onReady() {
    // click event listeners
    $('#taskSubmitBtn').on('click', submitTask);   
    $('#displayTasks').on('click', '.editBtn', changeStatus);
    $('#displayTasks').on('click', '.deleteBtn', deleteFunction);
    getAllTasks();
}

// POST request
function submitTask() {
    // want to take task from text in input text box and 
    //create an object to send to server
    let taskObject = {
        task_description: $('#taskInput').val(),
        complete_status: 'false'
    };
    console.log('taskObject', taskObject);
    
    $.ajax({
        method: 'POST',
        url: 'tasks',
        data: taskObject
    }).then(function(response) {
        console.log('response', response);
        getAllTasks();
        clearInputs();
    }).catch(function(error) {
        console.log('error in POST', error);
    });
}




// GET request
function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: 'tasks'
    }).then(function(response) {
        console.log('in GET tasks', response);
        printResults(response);
    }).catch(function(error) {
        console.log('error in GET request', error);        
    });
}

function printResults(array) {
    let tasks = array;
    $('#displayTasks').empty();
    for( task of tasks) {
        if(task.complete_status == false) {
            $('#displayTasks').append(`
                <tr data-id=${task.id} class="incomplete">    
                    <td>${task.task_description}</td>
                    <td>${task.complete_status}</td>
                    <td><button class="editBtn">Task Complete</button></td>
                    <td><button class="deleteBtn">Delete Task</button></td>
                </tr>
            `);
        }
        else if (task.complete_status == true) {
            $('#displayTasks').append(`
                <tr data-id=${task.id} class="done">    
                    <td>${task.task_description}</td>
                    <td>${task.complete_status}</td>
                    <td></td>
                    <td><button class="deleteBtn">Delete Task</button></td>
                </tr>
            `);
        }
    }
}




// PUT request

function changeStatus() {
    let taskId = $(this).closest('tr').data('id');
    console.log('edit button clicked', taskId);
    let dataToSend = {complete_status: 'true'};
    
    // need to make ajax request for editing db
    // button will be clicked if task is complete
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: dataToSend
    }).then(function(response) {
        console.log('response', response);
        getAllTasks();
    }).catch(function(error) {
        console.log('error in PUT request', error); 
    });
}








// DELETE request
function deleteFunction() {
    let taskId = $(this).closest('tr').data('id');
    console.log('delete button clicked', taskId);

    $.ajax({
        method: 'DELETE',
        url: `tasks/${taskId}`
    }).then(function(response) {
        console.log('response', response);
        getAllTasks();        
    }).catch(function(error) {
        console.log('error', error);  
    });
}

// function to clear input box after task is submitted
function clearInputs() {
    $('#taskInput').val('');
}
