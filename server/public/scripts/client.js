

$(document).ready(onReady);

function onReady() {
    $('#taskSubmitBtn').on('click', submitTask);   
        
}

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
        
    }).catch(function(error) {
        console.log('error in POST', error);
    });
}