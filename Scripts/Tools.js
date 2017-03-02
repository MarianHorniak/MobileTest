
var Logs = "";


function Log(message)
{
    console.log(message);
}


function Alert(message)
{
    alert(message);
}

function showerror(err)
{
    document.getElementById("demo").lblResult = err.message;
}

function startTimer()
{
    window.setTimeout(doTimeout, 10000);
}

function doTimeout() {
    Navigator
    Alert('Fired');
}

function getDeviceInfo()
{
    var sRet = "";
    sRet+="cordova: " +device.cordova;
    sRet += "; model: " + device.model;
    sRet += "; platform: " + device.platform;
    sRet += "; uuid: " + device.uuid;
    sRet += "; version: " + device.version;
    sRet += "; manufacturer: " + device.manufacturer;
    sRet += "; isVirtual: " + device.isVirtual;
    sRet += "; serial: " + device.serial;

    return sRet;
}
