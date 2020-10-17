

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
        $('#displayTasks').append(`
            <tr data-id=${task.id}>    
                <td>${task.task_description}</td>
                <td>${task.complete_status}</td>
                <td><button class="editBtn">Task Complete</button></td>
                <td><button class="deleteBtn">Delete Task</button></td>
            </tr>
        `);
    }
}




// PUT request

function changeStatus() {
    let taskId = $(this).closest('tr').data('id');
    console.log('edit button clicked', taskId);
    
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


