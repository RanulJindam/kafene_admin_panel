console.log("Sri Matre Namaha")

let submitElement = document.getElementById('submit')
let userElement = document.getElementById('user')
let passwordElement = document.getElementById('password')

submitElement.addEventListener('click',function(){
    let user = userElement.value
    let pwd = passwordElement.value
    var object = {
        name : user,
        password : pwd
    }
    if(user === pwd && user !== "" && pwd !== ""){
        alert("Login Successfully :)")
        localStorage.setItem("loginStatus", JSON.stringify(object))
        location.assign("./orders.html")
    }else{
        alert("Enter valid Credentials !")
    }
})