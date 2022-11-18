var TOKEN_REF = "token";

window.addEventListener("DOMContentLoaded", function (event) {
  console.log(window.location.search);
  console.log("DOM fully loaded and parsed");

  var urlSearch = window.location.search;
  var urlParams = urlSearch ? urlSearch.substring(1).split("&") : [];

  if (urlParams.length > 0) {
    var token = "";
    for (var i = 0; i < urlParams.length; i++) {
      var paramElement = urlParams[i].split("=");
      if (paramElement[0] === TOKEN_REF) {
        token = paramElement[1] === undefined ? "" : decodeURIComponent(paramElement[1]);
      }
    }
    if (token.length > 0) {
      fetchResponses(token);
    }
  }

  //   if (paramElement[0] === tokenRefName) {
  //     token = paramElement[1] === undefined ? true : decodeURIComponent(paramElement[1]);
  //   }
  //   if (paramElement[0] === InterviewType) {
  //     interview = paramElement[1] === undefined ? true : decodeURIComponent(paramElement[1]);
  //   }
  // }
});

function fetchResponses(token) {
  var url = "https://mycvtracker.com:8080/interviews/interviewResponse/" + token;
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var section = document.getElementById("responses");
      if (xhr.response.length === 0) {
        var err = document.createElement("div");
        err.classList.add("alert", "alert-danger");
        err.innerText = "Invalid Token or No response";
        // section.childNodes.forEach(function (child) {
        //   child.remove();
        // });
        section.appendChild(err);
        return;
      }

      displayResponses(JSON.parse(xhr.response), token);
    }
  };

  xhr.open("GET", url, true);
  xhr.send("");
}

function displayResponses(responses, token) {
  var section = document.getElementById("responses");
  var candidate = document.createElement("div");
  candidate.classList.add("row", "alert", "alert-info");
  candidate.innerText = "Candidate Email: " + responses[0].candidate;
  section.appendChild(candidate);
  responses.forEach(function (response, index) {
    var res = createResponseElement(response, index + 1, token);
    section.appendChild(res);
  });
}

function createResponseElement(response, qNumber, token) {
  // {
  //   id: Number;
  //   candidate: string;
  //   token: string;
  //   question: string;
  //   answerLocation: string;
  //   questionId: number;
  // }

  var item = document.createElement("div");
  item.style.marginTop = 20 + "px";
  var row1 = document.createElement("div");
  var quesId = document.createElement("p");
  var ques = document.createElement("h4");
  ques.innerText = "Q." + qNumber + " " + response.question;
  quesId.innerText = "Question Id: " + response.questionId;
  row1.classList.add("row");
  row1.appendChild(quesId);
  row1.appendChild(ques);

  item.appendChild(row1);

  var row2 = document.createElement("div");
  row2.classList.add("row");
  var audio = document.createElement("audio");
  audio.controls = "controls";
  audio.src = "https://mycvtracker.com:8080/interviews/audioData/" + token + "/" + response.questionId;
  audio.style.width = "100%";
  audio.style.borderRadius = "10px";
  audio.type = "audio/wav";

  var label = document.createElement("p");
  label.innerText = "Audio Response: ";
  row2.appendChild(label);
  row2.appendChild(audio);
  item.appendChild(row2);

  var hr = document.createElement("hr");
  item.appendChild(hr);

  return item;
}
