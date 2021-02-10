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
var subTaskTable = document.getElementById('subTaskTable')
taskDetail()
function taskDetail(){
  var url = `http://127.0.0.1:8000/api/projects/${id_1}/tasks/${id}`
  
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
      var list = data.sub_tasks
      console.log(data)
      document.title = data.name
      document.getElementById('name').value = data.name
      document.getElementById('description').value = data.description
      document.getElementById('start_date').value = data.start_date
      document.getElementById('end_date').value = data.end_date
      content = `
      <div class="col-sm-12">
            <table id="projectTable" class="table table-bordered table-condensed table-striped" >
            <tr>
              <th><h2>Name:</th>
              <th><h3>${data.name}</h3>
            </tr>
            <tr>
              <th><h2>Description:</th>
              <th><h4>${data.description}</h3></th>
            </tr>
            <tr>
              <th><h2>Start Date:</th>
              <th><h4>${data.start_date}</h3></th>
            </tr>
            <tr>
              <th><h2>End Date:</th>
              <th><h4>${data.end_date}</h3></th>
            </tr>
            </table>
        </div>
      `
      wrapper.innerHTML = content
      if (list.length > 0) {
      thead = `
      <thead style="background-color: green; color: white;">
      <tr>
          <th>Sub Task Name</th>
          <th>Description</th>
          <th>Delete</th>
      </tr>
  </thead>
      `
      subTaskTable.innerHTML = thead
      }
      for (var i in list){

        var item = `
        <tr>
        <th>${list[i].name}</th>
        <th>${list[i].description}</th>
        <th id="delete-project"><button class="delete btn"><i class="fa fa-trash"></i> Delete</button></th>          
        </tr>
        
        `
        subTaskTable.innerHTML += item
    }
    for (var i in list){
      var deleteBtn = document.getElementsByClassName('delete')[i]
      deleteBtn.addEventListener('click', (function(item){
          return function(){
              deleteItem(item)
          }
      })(list[i]))
  }
  })
}
function deleteItem(item){
  console.log('Delete clicked')
  fetch(`http://127.0.0.1:8000/api/subtasks/${item.id}/`, {
      method:'DELETE', 
      headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
      }
  }).then((response) => {
      taskDetail()
  })
}
var editTask = document.getElementById('edit-task')
editTask.onclick = function() { 
    var x = document.getElementById("form-wrapper");
    x.style.display = "block";
    editTask.style.display = "none"
} 
var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e){
  e.preventDefault()
  console.log('Form submitted')
  var url = `http://127.0.0.1:8000/api/projects/${id_1}/tasks/${id}/`
  var formdata = new FormData()
  var name = document.getElementById('name').value
  var description =  document.getElementById('description').value
  var startDate = document.getElementById ('start_date').value
  var endDate =  document.getElementById('end_date').value
  var project = id_1
  formdata.append('name', name)
  formdata.append('description', description)
  formdata.append('start_date', startDate)
  formdata.append('end_date', endDate)
  formdata.append('project', project)
  fetch(url, {
      method:'PUT',
      headers:{
          contentType: false,
          'X-CSRFToken':csrftoken,
      },
      body: formdata
  }).then(function(response){
    form.style.display = "none"
    editTask.style.display = "block"
    taskDetail()
  })
})
