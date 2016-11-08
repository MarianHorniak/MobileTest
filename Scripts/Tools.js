
var Logs = "";


function Log(message)
{
    console.log(message);
}


function Alert(message)
{
    alert(message);
}


function startTimer()
{
    window.setTimeout(doTimeout, 10000);
}

function doTimeout() {
    Alert('Fired');
}
