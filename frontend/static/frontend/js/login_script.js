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
form.addEventListener('submit', function(e){
  e.preventDefault()
  console.log('Form submitted')
  var url = `http://127.0.0.1:8000/api/login/`
  var username = document.getElementById('username').value
  var password =  document.getElementById('password').value
  fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'username':username, 'password':password})
  }).then(function(response){
    window.location.href = `http://127.0.0.1:8000`
  })
})
