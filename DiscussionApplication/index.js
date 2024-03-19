var DisplayQuestionResponseId = 0;
var questionsubmitform = document.getElementById("question-submitform");
var homebuttion = document.getElementById("home-buttion");

DisplayQuestion();

//bind the event listner
questionsubmitform.addEventListener("click", AddQuestion);
homebuttion.addEventListener("click", ChangePageUi);

//Add Question
function AddQuestion() {
  var Data = [];
  var primaryKey = 1;
  var questionName = document.getElementById("subjectName");
  var question = document.getElementById("question");
  if (questionName.value == "" || question.value == "") {
    return;
  }
  var temp = localStorage.getItem("data");
  var Id = localStorage.getItem("id");
  if (Id == null || temp == undefined || temp == "") {
    primaryKey = 1;
  } else {
    primaryKey = parseInt(Id) + 1;
  }

  if (temp == null || temp == undefined || temp == "") {
    Data = [];
  } else {
    Data = JSON.parse(temp);
  }
  var obj = {
    Id: primaryKey,
    name: questionName.value,
    question: question.value,
    createdOn: new Date().toLocaleString(),
    response: [],
  };
  Data.push(obj);
  var stringifyData = JSON.stringify(Data);
  localStorage.setItem("data", stringifyData);
  localStorage.setItem("id", JSON.stringify(primaryKey));
  question.value = "";
  questionName.value = "";
  DisplayQuestion();
}

//Display
function DisplayQuestion() {
  var data = localStorage.getItem("data");
  var tempArray = [];
  if (data != null || data != "") {
    var userQuestion = document.getElementById("userQuestion");
    tempArray = JSON.parse(data);
    var html = "";
    if (tempArray != null) {
      tempArray.forEach((element) => {
       var diffDate= GetDate(element.createdOn);
        html += `<div onclick=ChangePage(${element.Id}) class="shadow-none p-3 mb-2 bg-light rounded border2">
            <h3>${element.name}</h3>
            <P>${element.question}</P>
            <span style="color: red; font-weight: bold;">${diffDate}</span>
           </div>`;
      });
      userQuestion.innerHTML = html;
    }
  }
}

function GetLocalStorgae()
{
  
}

//GetData
function GetDate(eleDate) {
  var nowDate = new Date().toLocaleString();
  var currentDate = new Date(nowDate);
  var elementDate = new Date(eleDate);

  var hours = Math.abs(currentDate.getHours() - elementDate.getHours());
  var minutes = Math.abs(currentDate.getMinutes() - elementDate.getMinutes());
  var seconds = currentDate.getSeconds() - elementDate.getSeconds();
  var years = Math.abs(currentDate.getFullYear() - elementDate.getFullYear());
  var months = Math.abs(currentDate.getMonth() - elementDate.getMonth());
  var day = Math.abs(currentDate.getDay() - elementDate.getDay());
  let result = "";
  

  if (years != 0 && months != 0 && day != 0) {
    result = year + "/" + months + "/" + day + "ago...";
    return result;
  } else if (months != 0 && day != 0) {
    result = months + "/" + day + "ago...";
    return result;
  } else if (day != 0) {
    result = +day + "Days ago...";
    return result;
  } else if (hours != 0 && minutes != 0 && seconds != 0) {
    result = hours + "hours ago...";
    return result;
  } else if (minutes != 0) {
    result = minutes + "minutes ago...";
    return result;
  } else {
   if(seconds==0){
    result = "Added Now...";
    return result;
   }else{
    result=seconds+"seconds ago";
    return result;
   }
  }
}

//Change the page
function ChangePage(id) {
  DisplayQuestionResponseId = id;
  var nonPortalPage = document.getElementById("nonPortalPage");
  var portalPage = document.getElementById("PortalPage");
  nonPortalPage.style.display = "none";
  portalPage.style.display = "block";
  ChangeResponseHtml(id);
}
//Change the html
function ChangeResponseHtml(id) {
  var data = localStorage.getItem("data");
  var tempArray = [];
  if (data != null || data != "") {
    var userQuestion = document.getElementById("userQuestion");
    tempArray = JSON.parse(data);
    if (tempArray != null) {
      var filterArray = tempArray.filter((element) => {
        return element.Id == id;
      });
      var questionboard = document.getElementById("question-board");
      var responseBoard = document.getElementById("respone-board");
      var formBoard = document.getElementById("form-board");
      var html = "";
      html += `<div class="shadow-none p-3 mb-2 bg-light rounded">
          <h3>${filterArray[0].name}</h3>
          <P>${filterArray[0].question}</P>
         </div>
         <button class="btn btn-primary position-absolute bottom-2 end-0 mx-2" onClick=Reslove(${filterArray[0].Id})>Resolve</button>`;
      questionboard.innerHTML = html;
      html = "";
      filterArray[0].response.sort(function (a, b) {
        return b.vote - a.vote;
      });
      filterArray[0].response.forEach((element, index) => {
        var vote = element.vote == 0 ? "" : element.vote;
        var like = element.like == 0 ? "" : element.like;
        var disLike = element.dislike == 0 ? "" : element.dislike;
        html += `<div class="shadow-none p-3 mb-2 bg-light rounded">
            <h3>${element.name}</h3>
            <P>${element.comment}</P>
            <i class="fa fa-thumbs-up mx-2" style="font-size:36px" onClick=LikeResponse(${filterArray[0].Id},${index})></i><strong>${like}</strong>
            <i class="fa fa-thumbs-down mx-2" style="font-size:36px" onClick=disLikeResponse(${filterArray[0].Id},${index})></i><strong>${disLike}</strong>
            <i class="fa fa-hand-o-up" style="font-size:36px" onClick=voteResponse(${filterArray[0].Id},${index})></i><strong>${vote}vote</strong>   
         </div>`;
      });
      responseBoard.innerHTML = html;
      html = "";
      html = `<div class="form p-2 m-4 ">
            <div class="heading  position-relative">
              <h3 style="color: grey;">Add Response</h3>
              <input type="number" hidden id="response-id" value=${id}>
              <input class="form-control" type="text" id="name" name="name" placeholder="Name"/>
              <br>
              <textarea class="form-control" name="comment" id="comment" cols="60" rows="8" placeholder="Comment"></textarea>
              <br>
              <button class="btn btn-primary position-absolute bottom-1 end-0 mx-2" id="submit-response-button" onclick=SubmitResponse()>Submit</button>
            </div>
          </div>`;
      formBoard.innerHTML = html;
    }
  }
}

//Response function
function Reslove(id) {
  var data = localStorage.getItem("data");
  var tempArray = [];
  if (data != null || data != "") {
    tempArray = JSON.parse(data);
    if (tempArray != null) {
      var newArray = [];
      tempArray.forEach((element) => {
        if (element.Id == id) {
        } else {
          newArray.push(element);
        }
      });
      localStorage.setItem("data", JSON.stringify(newArray));
      ChangePageUi();
    }
  }
}

//Response submit function
function SubmitResponse() {
  var primaryId = document.getElementById("response-id").value;
  var name = document.getElementById("name").value;
  var comment = document.getElementById("comment").value;
  if (name == "" || comment == "") {
    return;
  }
  var data = localStorage.getItem("data");
  var tempArray = [];
  if (data != null || data != "") {
    tempArray = JSON.parse(data);
    if (tempArray != null) {
      tempArray.forEach((element) => {
        if (element.Id == primaryId) {
          let obj = {
            questionId: primaryId,
            name: name,
            comment: comment,
            like: 0,
            dislike: 0,
            vote: 0,
          };
          element.response.push(obj);
        }
      });
      localStorage.setItem("data", JSON.stringify(tempArray));
      ChangeResponseHtml(primaryId);
    }
  }
}

//Searching Algorithm with String Function
function FormChange(value) {
  //change the value form lowerCase
  var LowerCaseValue = value.toLowerCase();

  var data = localStorage.getItem("data");
  var tempArray = [];
  if (data != null || data != "") {
    var userQuestion = document.getElementById("userQuestion");
    var html = "";
    tempArray = JSON.parse(data);
    if (tempArray != null) {
      tempArray.forEach((element) => {
        var ElementName = element.name.toLowerCase().trim();
        var ElementQuestion = element.question.toLowerCase().trim();
        if (ElementName.includes(LowerCaseValue)) {
          html += `<div onclick=ChangePage(${element.Id}) class="shadow-none p-3 mb-2 bg-light rounded border2">
                <h3>${element.name}</h3>
                <P>${element.question}</P>
               </div>`;
        } else if (ElementQuestion.includes(LowerCaseValue)) {
          html += `<div onclick=ChangePage(${element.Id}) class="shadow-none p-3 mb-2 bg-light rounded border2">
                <h3>${element.name}</h3>
                <P>${element.question}</P>
               </div>`;
        }
      });
      if (html != "") {
        userQuestion.innerHTML = html;
      } else {
        html = `<div class="shadow-none p-3 mb-2 bg-light rounded border2">
            <h3>No match Found</h3>
           </div>`;
        userQuestion.innerHTML = html;
      }
    }
  }
}

//Change the half ui
function ChangePageUi() {
  var nonPortalPage = document.getElementById("nonPortalPage");
  var portalPage = document.getElementById("PortalPage");
  nonPortalPage.style.display = "block";
  portalPage.style.display = "none";
  DisplayQuestion();
}

//Like response
function LikeResponse(id, i) {
  var data = localStorage.getItem("data");
  var temp = JSON.parse(data);
  temp.forEach((element) => {
    if (element.Id == id) {
      var data = element.response;
      data.sort(function (a, b) {
        return b.vote - a.vote;
      });
      data.forEach(function (element, index) {
        if (index == i) {
          element.like++;
        }
      });
      element.response = data;
    }
  });
  localStorage.setItem("data", JSON.stringify(temp));
  ChangeResponseHtml(id);
}

//dislike response
function disLikeResponse(id, i) {
  var data = localStorage.getItem("data");
  var temp = JSON.parse(data);
  temp.forEach((element) => {
    if (element.Id == id) {
      var data = element.response;
      data.sort(function (a, b) {
        return b.vote - a.vote;
      });
      data.forEach(function (element, index) {
        if (index == i) {
          element.dislike++;
        }
      });
      element.response = data;
    }
  });
  localStorage.setItem("data", JSON.stringify(temp));
  ChangeResponseHtml(id);
}

//vote response
function voteResponse(id, i) {
  var data = localStorage.getItem("data");
  var temp = JSON.parse(data);
  temp.forEach((element) => {
    if (element.Id == id) {
      var data = element.response;
      data.sort(function (a, b) {
        return b.vote - a.vote;
      });
      data.forEach(function (element, index) {
        if (index == i) {
          element.vote++;
        }
      });
      element.response = data;
    }
  });
  localStorage.setItem("data", JSON.stringify(temp));
  ChangeResponseHtml(id);
}

setInterval(DisplayQuestion,10000);