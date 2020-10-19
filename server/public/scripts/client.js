// This is the index file for the weekend assignment for week 9 of Prime Digital Academy
// for Adam Boerhave, to make a to do list app, created 10/16/2020 - 10/18/2020

$(document).ready(onReady);

function onReady() {
    clearInputs();
    // click event listeners
    // initial submit button
    $('#taskSubmitBtn').on('click', submitTask);
    // edit and delete buttons inside the additional 3 tables   
    $('#displayTasks3').on('click', '.editBtn', changeStatus);
    $('#displayTasks3').on('click', '.deleteBtn', deleteFunction);
    $('#displayTasks2').on('click', '.editBtn', changeStatus);
    $('#displayTasks2').on('click', '.deleteBtn', deleteFunction);
    $('#displayTasks1').on('click', '.editBtn', changeStatus);
    $('#displayTasks1').on('click', '.deleteBtn', deleteFunction);
    // up/down buttons for changing priorities of tasks inside other 3 tables
    $('#displayTasks3').on('click', '.down', changeLevel);
    $('#displayTasks2').on('click', '.down', changeLevel);
    $('#displayTasks2').on('click', '.up', changeLevel);
    $('#displayTasks1').on('click', '.up', changeLevel);
    getAllTasks();
}   // end onReady

// POST request
function submitTask() {
    // will call checkInputs to make sure all inputs are valid
    if(!checkInputs()) {
        alert('Please be sure all of the inputs are filled in');
        return;
    }
    // want to take task from text in input text box and 
    // create an object to send to server
    let taskObject = {
        task_description: $('#taskInput').val(),
        complete_status: 'false',
        taskType: $('#taskTypeInput').val(),
        priority: $('#taskPriorityInput').val()
    };
    console.log('taskObject', taskObject);

    // ajax request to post taskObject to db
    $.ajax({
        method: 'POST',
        url: 'tasks',
        data: taskObject
    }).then(function (response) {
        console.log('response', response);
        getAllTasks();
        clearInputs();
    }).catch(function (error) {
        console.log('error in POST', error);
    });
}   // end submitTask POST fn

// GET request for all tasks already posted
function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: 'tasks'
    }).then(function (response) {
        console.log('in GET tasks', response);
        printResults(response);
    }).catch(function (error) {
        console.log('error in GET request', error);
    });
}   // end getAllTasks GET fn

// function to append rows from db to DOM
function printResults(array) {
    let tasks = array;
    $('#displayTasks3').empty();
    $('#displayTasks2').empty();
    $('#displayTasks1').empty();
    for( task of tasks) {
        let table = task.priority;
        console.log('table', table);
        let elementToAdd = '';
        // add arrow buttons depending on section
        if( table == 3) {
            elementToAdd = `<button class="down btn btn-info btn-sm" data-direction="-">↓</button>`;
        }
        else if(table == 2) {
            elementToAdd = `<button class="up btn btn-info btn-sm" data-direction="+">↑</button> <button class="down btn btn-info btn-sm" data-direction="-">↓</button> `;
        }
        else if(table == 1) {
            elementToAdd = `<button class="up btn btn-info btn-sm" data-direction="+">↑</button>`;
        }        
        
        if(task.complete_status == false) {
            $(`#displayTasks${table}`).append(`
                <tr data-id=${task.id} class="incomplete">    
                    <td>${task.task_description}</td>
                    <td>${task.category}</td>
                    <td>${elementToAdd}</td>
                    <td><button class="editBtn btn btn-success btn-sm">Task Complete</button></td>
                    <td><button class="deleteBtn btn btn-warning btn-sm">Delete Task</button></td>
                </tr>
            `);
        }
        else if (task.complete_status == true) {
            $(`#displayTasks${table}`).append(`
                <tr data-id=${task.id} class="done">    
                    <td><p>${task.task_description}<span></span></p></td>
                    <td><p>${task.category}<span></span></p></td>
                    <td>${elementToAdd}</td>
                    <td></td>
                    <td><button class="deleteBtn btn btn-warning btn-sm">Delete Task</button></td>
                </tr>
            `);
        }
    }
}   // end printResults fn

// PUT request to mark task as complete
function changeStatus() {
    let taskId = $(this).closest('tr').data('id');
    console.log('edit button clicked', taskId);
    // want to mark task with id of taskId as true
    let dataToSend = { complete_status: 'true' };
    // need to make ajax request for editing db
    // button will be clicked if task is complete
    $.ajax({
        method: 'PUT',
        url: `/tasks/done/${taskId}`,
        data: dataToSend
    }).then(function (response) {
        console.log('response', response);
        getAllTasks();
    }).catch(function (error) {
        console.log('error in PUT request', error);
    });
}   // end changeStatus PUT request for marking complete

// PUT request to change sections for higher or lower priority
function changeLevel() {
    // direction to change task with id of taskID to section + or -
    let dataToSend = {direction: $(this).data("direction")};
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/level/${taskId}`,
        data: dataToSend
    }).then(function (response) {
        getAllTasks();
    }).catch(function (error) {
        console.log('error in level put', error);    
    });
}   // end changeLevel

// DELETE request to delete task from db
function deleteFunction() {
    let taskId = $(this).closest('tr').data('id');
    console.log('delete button clicked', taskId);
    $.ajax({
        method: 'DELETE',
        url: `tasks/${taskId}`
    }).then(function (response) {
        console.log('response', response);
        getAllTasks();
    }).catch(function (error) {
        console.log('error', error);
    });
}   // end deleteFunction for DELETE request

// function to clear inputs after task is submitted
function clearInputs() {
    $('#taskInput').val('');
    $('#taskTypeInput').val('');
    $('#taskPriorityInput').val('');
}   // end clearInputs

// checkInputs function will return true if all three inputs are filled in, otherwise false
function checkInputs() {
    if($('#taskInput').val().trim() == '' || $('#taskTypeInput').val() == null || $('#taskPriorityInput').val() == null) {
        return false;
    }
    else {
        return true;
    }
}   // end checkInputs fn