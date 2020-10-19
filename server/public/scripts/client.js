

$(document).ready(onReady);

function onReady() {
    clearInputs();
    // click event listeners
    $('#taskSubmitBtn').on('click', submitTask);   
    $('#displayTasks3').on('click', '.editBtn', changeStatus);
    $('#displayTasks3').on('click', '.deleteBtn', deleteFunction);
    $('#displayTasks2').on('click', '.editBtn', changeStatus);
    $('#displayTasks2').on('click', '.deleteBtn', deleteFunction);
    $('#displayTasks1').on('click', '.editBtn', changeStatus);
    $('#displayTasks1').on('click', '.deleteBtn', deleteFunction);
    $('#displayTasks3').on('click', '.down', changeLevel);
    $('#displayTasks3').on('click', '.up', changeLevel);
    $('#displayTasks2').on('click', '.down', changeLevel);
    $('#displayTasks2').on('click', '.up', changeLevel);
    $('#displayTasks1').on('click', '.down', changeLevel);
    $('#displayTasks1').on('click', '.up', changeLevel);
    getAllTasks();
}

// POST request
function submitTask() {
    if(!checkInputs()) {
        alert('Please be sure all of the inputs are filled in');
    }
    // want to take task from text in input text box and 
    //create an object to send to server
    let taskObject = {
        task_description: $('#taskInput').val(),
        complete_status: 'false',
        taskType: $('#taskTypeInput').val(),
        priority: $('#taskPriorityInput').val()
    };
    console.log('taskObject', taskObject);

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
}




// GET request
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
}

function printResults(array) {
    let tasks = array;
    $('#displayTasks3').empty();
    $('#displayTasks2').empty();
    $('#displayTasks1').empty();
    for( task of tasks) {
        let table = task.priority;
        console.log('table', table);
        let elementToAdd = '';
        if( table == 3) {
            elementToAdd = `<button class="down btn btn-info btn-sm" data-direction="-">↓</button>`;
        }
        else if(table == 2) {
            elementToAdd = `<button class="down btn btn-info btn-sm" data-direction="-">↓</button> <button class="up btn btn-info btn-sm" data-direction="+">↑</button>`;
        }
        else if(table == 1) {
            elementToAdd = `<button class="up btn btn-info btn-sm" data-direction="+">↑</button>`;
        }
        console.log('elementToAdd', elementToAdd);
        
        
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
}




// PUT request

function changeStatus() {
    let taskId = $(this).closest('tr').data('id');
    console.log('edit button clicked', taskId);
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
}


function changeLevel() {
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
}






// DELETE request
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
}

// function to clear input box after task is submitted
function clearInputs() {
    $('#taskInput').val('');
    $('#taskTypeInput').val('');
    $('#taskPriorityInput').val('');
}

function checkInputs() {

}