//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");

var recordingTimerDuration = 0;
var recordingTimerInterval = null;

//var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
//recordButton.addEventListener("click", startRecording);
//stopButton.addEventListener("click", stopRecording);
//pauseButton.addEventListener("click", pauseRecording);

// Variable to manage submission of recording for each question
var recordingSubmitted = false;

function startRecording() {
  document.getElementById("startTime").value = new Date();

  var nextQuesBtn = document.getElementById("nextQuestion");
  nextQuesBtn.disabled = true;

  var skipQuesBtn = document.getElementById("skipQuestion");
  skipQuesBtn.disabled = true;

  var recordButton = document.getElementById("recordButton");
  var stopButton = document.getElementById("stopButton");
  // var nextQuestion = document.getElementById("nextQuestion");
  // var pauseButton = document.getElementById("pauseButton");

  /*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/

  var constraints = { audio: true, video: false };

  /*
    	Disable the record button until we get a success or fail from getUserMedia()
	*/
  recordingTimerDuration = -1;

  recordingTimerInterval = setInterval(function () {
    recordButton.innerHTML = "Recording... " + ++recordingTimerDuration + " sec";
  }, 1000);
  recordButton.disabled = true;
  stopButton.disabled = false;
  //nextQuestion.disabled = true;
  //pauseButton.disabled = false

  /*
    	We're using the standard promise based getUserMedia()
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

      /*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
      audioContext = new AudioContext();

      //update the format
      //document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

      /*  assign to gumStream for later use  */
      gumStream = stream;

      /* use the stream */
      input = audioContext.createMediaStreamSource(stream);

      /*
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
      rec = new Recorder(input, { numChannels: 1 });

      //start the recording process
      rec.record();

      console.log("Recording started");
    })
    .catch(function (err) {
      //enable the record button if getUserMedia() fails
      recordButton.disabled = false;
      stopButton.disabled = true;
      //pauseButton.disabled = true
    });
}

function pauseRecording() {
  console.log("pauseButton clicked rec.recording=", rec.recording);
  if (rec.recording) {
    //pause
    rec.stop();
    pauseButton.innerHTML = "Resume";
  } else {
    //resume
    rec.record();
    pauseButton.innerHTML = "Pause";
  }
}

function stopRecording() {
  clearInterval(recordingTimerInterval);
  recordingTimerDuration = 0;

  var nextQuesBtn = document.getElementById("nextQuestion");
  var skipQuesBtn = document.getElementById("skipQuestion");

  nextQuesBtn.disabled = false;
  skipQuesBtn.disabled = false;

  var recordButton = document.getElementById("recordButton");
  var stopButton = document.getElementById("stopButton");
  //var pauseButton = document.getElementById("pauseButton");
  document.getElementById("endTime").value = new Date();
  recordButton.innerHTML = "Record";
  //var nextQuestion = document.getElementById("nextQuestion");

  //disable the stop button, enable the record too allow for new recordings
  stopButton.disabled = true;
  recordButton.disabled = false;
  //pauseButton.disabled = true;
  //nextQuestion.disabled = false;

  //reset button just in case the recording is stopped while paused
  //pauseButton.innerHTML="Pause";

  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);
}

function nextQuestion(skip) {
  var tokenRefName = "token";
  var InterviewType = "interviewType";
  var token = null;
  var interview = null;

  var urlSearch = window.location.search;
  var urlParams = urlSearch ? urlSearch.substring(1).split("&") : [];

  for (var i = 0, len = urlParams.length; i < len; i++) {
    var paramElement = urlParams[i].split("=");

    if (paramElement[0] === tokenRefName) {
      token = paramElement[1] === undefined ? true : decodeURIComponent(paramElement[1]);
    }
    if (paramElement[0] === InterviewType) {
      interview = paramElement[1] === undefined ? true : decodeURIComponent(paramElement[1]);
    }
  }
  // function nextQuestion(skip = false) gives eslint error, thus the following error
  if (skip === undefined) skip = false;
  if (!skip && recordingSubmitted !== true) return alert("You havn't submitted the recording, please submit");
  else if (skip === true) {
    var ans = window.confirm("You are about to skip this Question, are you sure ?");
    if (!ans) return;
  }

  var skipQuesBtn = document.getElementById("skipQuestion");
  skipQuesBtn.disabled = false;

  recordingSubmitted = false;

  var currentQuestion = document.getElementById("currentQuestion").value;
  document.getElementById("recordingsList").innerHTML = "";
  if (currentQuestion == document.getElementById("totalQuestion").text) {
    var nextQuestion = document.getElementById("nextQuestion");
    nextQuestion.disabled = true;

    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      if (this.readyState === 4) {
        console.log("Server returned: ", e.target.responseText);
      }
    };

    var fd = new FormData();
    fd.append("token", document.getElementById("token").value);
    xhr.open("POST", "https://mycvtracker.com:8080/interviews/complete", true);
    xhr.send(fd);
    window.localStorage.clear("questions_" + token + "_" + interview);
    alert("Thanks for attempting your Interview. Our team will get in touch soon.");
  } else {
    var value = window.localStorage.getItem("questions_" + token + "_" + interview);
    if (value) {
      var obj = JSON.parse(value);
      obj.answered = currentQuestion - 1;

      window.localStorage.setItem("questions_" + token + "_" + interview, JSON.stringify(obj));
    }

    var data = document.getElementById("quizdata").text;
    document.getElementById("interviewPuzzle").value = data[currentQuestion].question;
    document.getElementById("currentQuestionId").value = data[currentQuestion].id;
    currentQuestion = ++currentQuestion;
    document.getElementById("currentQuestion").value = currentQuestion;

    // loadInterviewPuzzle();
  }
}

function createDownloadLink(blob) {
  var url = URL.createObjectURL(blob);
  var au = document.createElement("audio");
  var li = document.createElement("li");
  var link = document.createElement("a");

  //name of .wav file to use during upload and download (without extendion)
  var filename = new Date().toISOString();

  //add controls to the <audio> element
  au.controls = true;
  au.src = url;

  //save to disk link
  link.href = url;
  link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
  link.innerHTML = "Save to disk";

  //add the new audio element to li
  li.appendChild(au);
  li.style.alignItems = "center";
  li.style.justifyContent = "flex-start";
  li.style.display = "flex";

  //add the filename to the li
  //li.appendChild(document.createTextNode(filename+".wav "))

  //add the save to disk link to li
  // li.appendChild(link);

  //upload link
  var upload = document.createElement("button");
  //   upload.href = "#";
  upload.classList.add("btn", "btn-light");
  upload.innerHTML = "Click Here To Submit Your Answer";
  upload.addEventListener("click", function (event) {
    event.preventDefault();

    var nextQuesBtn = document.getElementById("nextQuestion");
    nextQuesBtn.disabled = true;

    var skipQuesBtn = document.getElementById("skipQuestion");
    skipQuesBtn.disabled = true;

    console.log("Submit Ans clicked");
    upload.innerHTML = "Uploading... Please Wait";
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      if (this.readyState === 4) {
        upload.innerHTML = "Successfully Uploaded";
        upload.disabled = true;
        recordingSubmitted = true;
        nextQuesBtn.disabled = false;
        console.log("Server returned: ", e.target.responseText);
      }
    };

    var t1 = new Date(document.getElementById("endTime").value);
    var t2 = new Date(document.getElementById("startTime").value);
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

    var fd = new FormData();
    fd.append("file", blob, filename);
    fd.append("Candidate", document.getElementById("token").value);
    fd.append("questionId", document.getElementById("currentQuestionId").value);
    fd.append("attemptTime", Seconds_Between_Dates);
    xhr.open("POST", "https://mycvtracker.com:8080/interviews/answer", true);
    xhr.send(fd);
  });
  li.appendChild(document.createTextNode(" ")); //add a space in between
  li.appendChild(upload); //add the upload link to li

  //add the li element to the ol
  recordingsList.appendChild(li);
}
