﻿

function Log(message)
{
    document.getElementById("lblResult").innerHTML = document.getElementById("lblResult").innerHTML + "<br/>" + err.message;
    //console.log(message);
    //LogArray.addMessage(message, "Log");
}


function Alert(message)
{
    alert(message);
    //LogArray.addMessage(message, "Alert");
}

function Info(message) {
    alert(message);
    document.getElementById("lblResult").innerHTML = document.getElementById("lblResult").innerHTML + "<br/>Info: " + err.message;
}



function startTimer()
{
    window.setTimeout(doTimeout, 10000);
}

function doTimeout() {
    //Navigator
    Alert('Fired');
}

function getDeviceInfo()
{
    LogArray.addMessage("getDeviceInfo start", "Info");

    var sRet = "";
    sRet+="cordova: " +device.cordova;
    sRet += "; model: " + device.model;
    sRet += "; platform: " + device.platform;
    sRet += "; uuid: " + device.uuid;
    sRet += "; version: " + device.version;
    sRet += "; manufacturer: " + device.manufacturer;
    sRet += "; isVirtual: " + device.isVirtual;
    sRet += "; serial: " + device.serial;
    LogArray.addMessage("getDeviceInfo end", "Info");
    return sRet;
}

function placeCall (num) {
    if (!num)
        return;

    if (window.cordova && cordova.InAppBrowser) {
        cordova.InAppBrowser.open('tel:' + num.replace(/\s/g, ''), '_system');
    }
    else
    {
        app.log("Unsupported call");
    }
}
