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

$('#next2').click(function () {
    $('#onload2').modal('hide');
});

function downloadFile(data, fileName, type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    // Create an invisible A element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

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
    
    $("#fileExplorer").change(function (event) {
        $("#CVinput")[0].value = $("#fileExplorer")[0].files[0].name;
    })
    $("#CVinput").click(function (event) {
        $('#fileExplorer').trigger('click');
    });
    $("#closeSuccess").click(function (event) {
        $("loadSuccess").modal('hide');
    });
    $("#downloadCV").click(function (event) {
        downloadFile(holdCvResponse,holdNameOfCV.split('.')[0]);
    })
    $("#next2").click(function (event) {
        //make ajax and prepare request
        var userEmail = $("#eCVemail")[0].value;
        var file = $("#fileExplorer")[0].files[0];
        var resumeTitle = $("#fileExplorer")[0].files[0].name;
        var resumeType = $("#fileExplorer")[0].files[0].type;
        holdNameOfCV = resumeTitle;
        var fd = new FormData();
        fd.append('userEmail', userEmail);
        fd.append('file', file);
        fd.append('resumeTitle', resumeTitle);
        fd.append('resumeType', null);
        $.ajax({
            url: 'http://mycvtracker.com:20000/user/uploadQuickResume',
            type: 'POST',
            data: fd,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (data) {
                holdCvResponse = data;
                $("#loadSuccess").modal('show');
            },
            error: function (err) {
                $("#error").modal('show');
            }
        });
    })
    $('#basic-modal .basic').click(function (e) {
        $('#basic-modal-content').modal();

        return false;
    });
});
