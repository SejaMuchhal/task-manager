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
var form = document.getElementById('form-wrapper')

projectList()
function projectList(){
    var wrapper = document.getElementById('projectTable')
    wrapper.innerHTML = ''
    var url = 'http://127.0.0.1:8000/api/projects/'
    
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        var list = data
        if (list.length > 0) {
            var tableHead = `
            <thead style="background-color: green; color: white;">
            <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>View</th>
            <th>Delete</th>
            </tr>
            </thead>
            
            `
            wrapper.innerHTML += tableHead
        }
        else{
            var title = document.getElementById('table-title')
            title.value = 'No Project added'
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
            wrapper.innerHTML += item
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
var addProject = document.getElementById('add-project')
addProject.onclick = function() { 
    var x = document.getElementById("form-wrapper");
    addProject.style.display = "none";
    x.style.display = "block";
} 

form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Form submitted')
    var url = 'http://127.0.0.1:8000/api/projects/'
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
        method:'POST',
        headers:{
            processData: false,
            contentType: false,
            'X-CSRFToken':csrftoken,
        },
        body: formdata
    }).then(function(response){
        document.getElementById("form").reset()
        form.style.display = "none";
        projectList()
    })
})
function viewItem(item){
    window.location.href = `http://127.0.0.1:8000/projects/${item.id}/`
}
function deleteItem(item){
    console.log('Delete clicked')
    fetch(`http://127.0.0.1:8000/api/projects/${item.id}/`, {
    method:'DELETE', 
    headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
    }
}).then((response) => {
    projectList()
})
}

