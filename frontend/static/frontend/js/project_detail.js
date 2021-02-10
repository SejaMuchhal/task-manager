function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
var form = document.getElementById('form-wrapperd')
var wrapper = document.getElementById('detail-wrapper')
var taskTable = document.getElementById('taskTable')
projectDetail()
function projectDetail(){
    var url = `http://127.0.0.1:8000/api/projects/${id}/`
    
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        var list = data.tasks
        document.title = data.name
        document.getElementById('name').value = data.name
        document.getElementById('description').value = data.description
        document.getElementById('duration').value = data.duration
        
        content = `
        <div class="col-sm-12 title">
        <h1>${data.name}</h1>
        </div><hr/>
        <div class="col-sm-12">
        <img class="fit-picture" style="width:100%;"
        src="${data.avatar}"
        alt="${data.name} avatar">
        </div>
        <div class="col-sm-12">
        <h2>${data.description}</h2>
        </div>
        <div class="col-sm-12">
        <h3 style="text-align-center">Tasks:</h3>
        </div>
        `
        wrapper.innerHTML = content
        
        if (list.length > 0) {
        thead = `
        <thead style="background-color: green; color: white;">
        <tr>
        <th>Task Name</th>
        <th>Description</th>
        <th>View</th>
        <th>Delete</th>
        </tr>
        </thead>
        `
        taskTable.innerHTML = thead
        }
        for (var i in list){
            
            var item = `
            <tr>
            <th>${list[i].name}</th>
            <th>${list[i].description}</th>
            <th id="view-project"><button class="view btn"><i class="fa fa-eye"></i> View</th>
            <th id="delete-project"><button class="delete btn"><i class="fa fa-trash"></i> Delete</button></th>          
            </tr>
            
            `
            taskTable.innerHTML += item
        }
        for (var i in list){
            var viewBtn = document.getElementsByClassName('view')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]
            
            
            viewBtn.addEventListener('click', (function(item){
                return function(){
                    viewItem(item)
                }
            })(list[i]))
            
            
            deleteBtn.addEventListener('click', (function(item){
                return function(){
                    deleteItem(item)
                }
            })(list[i]))
        }
    })
}
function viewItem(item){
    window.location.href = `http://127.0.0.1:8000/projects/${id}/tasks/${item.id}/`
}
function deleteItem(item){
    console.log('Delete clicked')
    fetch(`http://127.0.0.1:8000/api/projects/${id}/tasks/${item.id}/`, {
    method:'DELETE', 
    headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
    }
}).then((response) => {
    projectDetail()
})
}
var editProject = document.getElementById('edit-project')
editProject.onclick = function() { 
    var x = document.getElementById("form-wrapper");
    x.style.display = "block";
    editProject.style.display = "none"
    wrapper.style.display = "none"
} 
var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Form submitted')
    var url = `http://127.0.0.1:8000/api/projects/${id}/`
    var formdata = new FormData()
    var name = document.getElementById('name').value
    formdata.append('name', name)
    var description = document.getElementById('description').value
    formdata.append('description',description)
    var duration = document.getElementById('duration').value
    formdata.append('duration', duration)
    var avatar = document.getElementById('avatar').files[0]
    formdata.append('avatar', avatar)
    fetch(url, {
        method:'PUT',
        headers:{
            processData: false,
            contentType: false,
            'X-CSRFToken':csrftoken,
        },
        body: formdata
    }).then(function(response){
        form.style.display = "none";
        editProject.style.display = "block"
        wrapper.style.display= "block"
        projectDetail()
    })
})
var addTask = document.getElementById('add-task')
addTask.onclick = function() { 
    var x = document.getElementById("task-form-wrapper");
    x.style.display = "block";
    addTask.style.display = "none"
} 
var taskForm = document.getElementById('task-form-wrapper')
taskForm.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Form submitted')
    var url = `http://127.0.0.1:8000/api/projects/${id}/tasks/`
    var formdata = new FormData()
    var name = document.getElementById('name').value
    var description =  document.getElementById('description').value
    var startDate = document.getElementById ('start_date').value
    console.log(startDate)
    var endDate =  document.getElementById('end_date').value
    console.log(endDate)
    var project = id
    formdata.append('name', name)
    formdata.append('description', description)
    formdata.append('start_date', startDate)
    formdata.append('end_date', endDate)
    formdata.append('project', project)
    fetch(url, {
        method:'POST',
        headers:{
            contentType: false,
            'X-CSRFToken':csrftoken,
        },
        body: formdata
    }).then(function(response){
        taskForm.style.display = "none";
        addTask.style.display = "block"
        projectDetail()
    })
})