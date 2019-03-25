function drawOnCanvas(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var dataURL = e.target.result,
            c = document.querySelector('canvas'), // see Example 4
            ctx = c.getContext('2d'),
            img = new Image();

        img.onload = function () {
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0);
        };

        img.src = dataURL;
    };

    reader.readAsDataURL(file);
}

function displayAsImage(file) {
    var imgURL = URL.createObjectURL(file),
        img = document.createElement('img');

    img.onload = function () {
        URL.revokeObjectURL(imgURL);
    };

    img.src = imgURL;
    document.body.appendChild(img);
}

$("#upfile1").click(function () {
    $("#file1").trigger('click');
});

$('#up-popup').click(function () {
    $('#onload').modal('show');
});

$('#next').click(function () {
    $('#onload').modal('hide');
    $('#onload2').modal('show');
});


function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

function downloadFile(data, fileName, type) {

    // Create an invisible A element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    data = base64ToArrayBuffer(data);
    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(
        new Blob([data], {
            type
        })
    );

    // Use download attribute to set set desired file name
    a.setAttribute("download", fileName);

    // Trigger the download by simulating click
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}
jQuery(function ($) {
    var holdCvResponse = null;
    var holdNameOfCV = null;
    $("#sizeError").hide();
    $("#closeSuccess").click(function (event) {
        $("#loadSuccess").modal('hide');
    });
    $("#downloadCV").click(function (event) {
        var type = '';
        if($("#fileExplorer")[0].files[0].type === 'application/pdf'){
            type = 'application/pdf';
        }else {
            type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }
        downloadFile(holdCvResponse,holdNameOfCV.split('.')[0], type);
    })
    $("#tryagain").click(function (event) {
        $("#error").modal('hide');
        $('#onload2').modal('show');
    })
    $("#next2").click(function (event) {
        //make ajax and prepare request
        var userEmail = $("#eCVemail")[0].value;
        var file = $("#fileExplorer")[0].files[0];
        var resumeTitle = $("#CVinput")[0].value;
        var resumeType = "landingpage";
        holdNameOfCV = resumeTitle;
        var fd = new FormData();
        fd.append('userEmail', userEmail);
        fd.append('file', file);
        fd.append('resumeTitle', resumeTitle);
        fd.append('resumeType', resumeType);
        if(file.size > 500000){
            $("#sizeError").show();
        }else {
            $.ajax({
                url: 'http://mycvtracker.com:20000/user/uploadQuickResume',
                type: 'POST',
                data: fd,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function (data) {
    
                    holdCvResponse = data.resumeFile;
                    $('#onload2').modal('hide');
                    $("#loadSuccess").modal('show');
                },
                error: function (err) {
                    $('#onload2').modal('hide');
                    $("#error").modal('show');
                }
            });
        }
        
    })
    $('#basic-modal .basic').click(function (e) {
        $('#basic-modal-content').modal();

        return false;
    });
});
