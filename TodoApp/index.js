var text = document.getElementById("todo");
Display();

text.addEventListener("keypress", function (e) {
  var text = document.getElementById("todo");
  if (text.value != "") {
    var key = 1;
    if (e.key === "Enter") {
      var data = "";
      var Todos = localStorage.getItem("todo");
      if (Todos != null) {
        data += Todos;
        key = ReturnKey();
      }
      data += key + text.value + "&&" + "<";
      localStorage.setItem("todo", data);
      text.value = "";
      Display();
    }
  }
});

function Display() {
  var Display = document.getElementById("display");
  var Todos = localStorage.getItem("todo");
  var array = [];
  if (Todos != null) {
    array = Todos.split("<");
  }
  var html = "";
  if (array.length > 1) {
    for (let i = 0; i < array.length - 1; i++) {
      var Id=ReturnId(array[i]).toString();
      var data=""
      var temp= array[i];
      data=temp.replace(Id,"");
      var IsCheck = array[i].substring(array[i].length - 2, array[i].length);
      if (IsCheck == "&&") {
        data = data.substring(0, data.length - 2);
        html += `<div class="d-flex">
        <p class="mx-1 my-1" style="text-decoration:none;font-size:24px;">${data}</p><input class="form-check-input mx-1 my-1" type="checkbox"  id="${Id}" onclick="UpdateStatus(${Id})">
        <i class="fa fa-trash-o mx-1" style="font-size:24px" onclick="DeleteTask(${Id})" ></i>
        <i  data-toggle="modal" data-target="#exampleModal" class="fa fa-edit mx-1" style="font-size:24px" onclick="EditTask(${Id})" ></i>
        </div>
        `;
      } else {
        html += `<div class="d-flex">
        <p class="mx-1 my-1" style="text-decoration:line-through;font-size:24px;">${data}</p><input class="form-check-input mx-1 my-1" type="checkbox"  id="${Id}" Checked onclick="UpdateStatus(${Id})">
        <i class="fa fa-trash-o  mx-2" style="font-size:24px" onclick="DeleteTask(${Id})"></i>
        <i data-toggle="modal" data-target="#exampleModal" class="fa fa-edit mx-2" style="font-size:24px" onclick="EditTask(${Id})" ></i>
        </div> 
        `;
      }
    }
  }
  Display.innerHTML = html;
}

function UpdateStatus(id) {
  var checkBox = document.getElementById(id);
  var Todos = localStorage.getItem("todo");
  var array = [];
  if (Todos != null) {
    array = Todos.split("<");
  }
  if (checkBox.checked == true) {
    var temp = "";
    for (let i = 0; i < array.length - 1; i++) {
      var Id=ReturnId(array[i]);
      var data= array[i];
      if(Id==id){
        temp+=data.replace("&&","")+"<";
      }else{
        temp+=data+"<";
      }
    }
    localStorage.setItem("todo", temp);
  } else {
    var temp = "";
    for (let i = 0; i < array.length - 1; i++) {
      var Id=ReturnId(array[i]);
      var data= array[i];
      if(Id==id){
        temp+=data+"&&"+"<";
      }else{
        temp+=data+"<";
      }
    }
    localStorage.setItem("todo", temp);
  }
  Display();  
}

function DeleteTask(id) {
  var todo = localStorage.getItem("todo");
  var array = todo.split("<");
  var temp = "";
  for (let i = 0; i < array.length - 1; i++) {
    var Id=ReturnId(array[i]);
    var data= array[i];
    if(id==Id){
      continue;
    }else{
      temp+=data+"<";
    } 
  }
  localStorage.setItem("todo", temp);
  Display();
}

function ReturnKey() {
  var todos = localStorage.getItem("todo");
  if (todos == null || todos == "") {
    return 1;
  } else {
    var array = todos.split("<");
    if(array.length>2){
     var key=ReturnId(array[array.length-2]);
     return parseInt(key)+1;
    }else{
      return 2;
    }
  }
}

//using Regular expression for getting the Id;
function ReturnId(str) {
  var matches = str.match(/(\d+)/);
  if (matches) {
        return matches[0];
  }
}

function EditTask(id)
{
 const checkbox=document.getElementById(id);
 const parents=checkbox.parentNode;
 const modeltext=document.getElementById('model-text');
 modeltext.classList=`${id}modeltext`;
 modeltext.value=parents.children[0].innerHTML;
}

function ValueChange(){
const modeltext=document.getElementById('model-text');
var classList=modeltext.classList;
var id=ReturnId(classList[0]);
var todo = localStorage.getItem("todo");
var array = todo.split("<");
var temp = "";
for (let i = 0; i < array.length - 1; i++) {
  var Id=ReturnId(array[i]);
  var data= array[i];
  if(id==Id){
    temp+=id+modeltext.value+"&&"+"<";
  }else{
    temp+=data+"<";
  } 
}
localStorage.setItem("todo", temp);
Display();
}

