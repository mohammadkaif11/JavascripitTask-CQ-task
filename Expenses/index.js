const btnfrom = document.getElementById("form-btn");
btnfrom.addEventListener("click", AddValue);

var array = [];

function AddValue() {
  let name = document.getElementById("name");
  let amount = document.getElementById("value");
  if(name.value.trim()=="" || amount.value==0 || amount.value=="+" || amount.value=="-"){
    alert("cannot epmty");
    return;
  }
  const obj = {
    name: name.value,
    amount:parseInt(amount.value)
  };
  array.push(obj);
  name.value="";
  amount.value="";
  AddAmountComponent();
}

function deletefn(id){
  
  array.splice(id,1);
  AddAmountComponent();
  updateTotalValue();
}

function AddAmountComponent() {
  var display = document.getElementById("histroy");
  if (array != null || array.length() > 0) {
    var html = "";
    array.forEach(function (element,index) {
      if (element.amount > 0) {
        html += `<div class="card card-body green my-1">
             <p>${element.name}</p>
            <p>$${element.amount}</p>
            <i class="fa fa-trash-o" onclick="deletefn(${index})" style="font-size:24px"></i>
            </div>`;
      } else {
        html += `<div class="card card-body red my-1">
             <p>${element.name}</p>
            <p>$${element.amount}</p>
            <i class="fa fa-trash-o" onclick="deletefn(${index})" style="font-size:24px"></i>
            </div>`;
      }
    });
    display.innerHTML = html;
  }
  updateTotalValue();

}

function updateTotalValue() {
  var debitvalue=document.getElementById("debitvalue");
  var creditvalue=document.getElementById("creditvalue");
  var credit=0;
  var debit=0;
  array.forEach(function (element) {
    if(element.amount<0){
     var abs_value=Math.abs(element.amount)
      debit+=abs_value;
    }else{
      credit=credit+element.amount;
    }
  });
  if(debit!=0){
    debitvalue.innerText=debit;
  }
  if(credit!=0){
    creditvalue.innerText=credit;
  }
}

function OpenFormModal() {
  var form = document.getElementById("form");
  var icon = document.getElementById("icon");
  form.style.display = "block";
  icon.style.display = "none";
}

function closeFormModal() {
  var form = document.getElementById("form");
  var icon = document.getElementById("icon");
  form.style.display = "none";
  icon.style.display = "block";
}
