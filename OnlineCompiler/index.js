function Compile() {
  var langauge = document.getElementById("language");
  var codes = document.getElementById("codes");
  var sendBody = { "code": codes.value, "langId": langauge.value };
  const url = "https://codequotient.com/api/executeCode";
  console.log(sendBody)

  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setTimeout(() => {
        fetch(`https://codequotient.com/api/codeResult/${data.codeId}`, {
        }).then((response) => response.json()).then((data) => {
            GenrateUI(data) 
          })
          .catch((error) => { console.log(error) })
      },6000)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function GenrateUI(data){
  var outputdisplay=document.getElementById('output_display');
  var parseData=JSON.parse(data.data);
  if(parseData.output!=''){
  outputdisplay.innerText=parseData.output;
  }
  else if(parseData.errors!=''){
  outputdisplay.innerText=parseData.errors;
  }
}