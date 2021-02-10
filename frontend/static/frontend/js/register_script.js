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
var form = document.getElementById('form')
form.addEventListener('submit', function(e){
  e.preventDefault()
  var url = 'http://127.0.0.1:8000/api/registration/'
  var username = document.getElementById('username').value
  var email =  document.getElementById('email').value
  var password1 =  document.getElementById('password1').value
  var password2 =  document.getElementById('password2').value
  fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify(
        {
          "username": username,
          "email": email,
          "password1": password1,
          "password2": password2
    })
  }).then(function(response){
    console.log(response)
    window.location.href = `http://127.0.0.1:8000/login/`
  })
})