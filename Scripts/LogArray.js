
var LogArray =
    {

        a_Array: new Array(),

        addMessage: function (message, level) {
            LogArray.a_Array[LogArray.a_Array.length] = Date() + " - " + level + " - " + message;
        },

        getLog: function () {
            return LogArray.a_Array;
        },

        clearLog: function () {
            LogArray.a_Array = new Array();
        }

    }

