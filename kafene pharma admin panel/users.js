let loginCredentials = localStorage.getItem("loginStatus")
if(loginCredentials == null || loginCredentials == false){
    location.assign("./index.html")
}

const logoutElement = document.getElementById("logout")
logoutElement.addEventListener('click',function(){
    localStorage.setItem("loginStatus", false);
    location.assign("./index.html");
    localStorage.clear("loginStatus")
})

var tableData = document.getElementById("table-data")
var searchUser = document.getElementById("search-user")
var resetBtn = document.getElementById("reset")

searchUser.addEventListener("keyup", function(e){
    $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${e.target.value}`, function(response){
        userData = response
        createUsersData(userData)
    })
})

function createUsersData(data){
    tableData.innerHTML = ""
    for(var i=0; i<data.length; i++){
        tableData.innerHTML += `
            <tr>
                <td>${data[i].id}</td>
                <td><img src="${data[i].profilePic}"</td>
                <td>${data[i].fullName}</td>
                <td class="dimColor">${data[i].dob}</td>
                <td>${data[i].gender}</td>
                <td class="dimColor">${data[i].currentCity} ${data[i].currentCountry}</td>
            </tr>`
    }
    userData = []
}

var userData
$.ajax({
    url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    type: "GET",
    success: function(response){
        userData = response
        createUsersData(userData)
    },
    error: function(error){
        console.log(error)
    }
})


resetBtn.addEventListener('click', function(){
    searchUser.value = ''
    location.reload()
})
