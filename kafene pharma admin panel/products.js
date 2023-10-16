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

function createTableData(data){
    tableData.innerHTML = ""
    for(let i=0; i<data.length; i++){
        tableData.innerHTML += `
            <tr>
                <td class="dimColor">${data[i].id}</td>
                <td>${data[i].medicineName}</td>
                <td>${data[i].medicineBrand}</td>
                <td>${data[i].expiryDate}</td>
                <td class="dimColor">${data[i].unitPrice}</td>
                <td>${data[i].stock}</td>
            </tr>`
    }
    document.getElementById("count").innerHTML = `Count: ${data.length} `;
    expiredItems = [];
    lowStockItems = [];
}

var productData
$.ajax({
    url:"https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
    type:"GET",
    success: function(response){
        productData = response
        createTableData(productData)
    },
    error: function(error){
        console.log(error)
    }
})


var filteredData = [];
function filterOptions() {
  for (var i = 0; i < 2; i++) {
    let checkStatus = document.getElementById(`check-${i}`);
    if (checkStatus.checked === true) {
    //pushing label Values of checkboxes inside filteredData array
      filteredData.push(checkStatus.name);
    }
  }
  getFilteredItems(filteredData);
  filteredData = [];
}

//getting data as per checkBox Selected
function getFilteredItems(data) {
  if (data.length == 2) {
    createTableData(productData);
  } 
  else if (data.length == 1) {
    if (data[0] == "expired") {
        var newData = getLowStockItems(productData); //will return only low stock items
        createTableData(newData);
    } 
    else {
        var newData = getExpiredItems(productData);//will return only expired items
        createTableData(newData);
    }
  } 
  else {
      var newData = [];
      createTableData(newData);
  }
}

//Getting Low-stock Items
var lowStockItems = [];
function getLowStockItems(productData) {
  for (var i = 0; i < productData.length; i++) {
    if (productData[i].stock > 100) {
      lowStockItems.push(productData[i]);
    }
  }
  return lowStockItems;
}

//Getting Expired Items
var expiredItems = [];
function getExpiredItems(productData) {
  let today = new Date();
  today.setHours(0, 0, 0, 0); //to have single value based on hrs,min,sec,ms
  for (let i = 0; i < productData.length; i++) {
    const dateFormat = productData[i].expiryDate;
    
    var varDate = new Date(dateFormat); //in dd-mm-YYYY format
    
    varDate.setHours(0,0,0,0); ////to have single value based on hrs,min,sec,ms
    if (varDate > today) {
      expiredItems.push(productData[i]);
    }
  }
  return expiredItems;
}

$(".check-boxes").on("change", function () {
  filterOptions();
});