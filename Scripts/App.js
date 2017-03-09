var app = {
    isDevice: false,
    geolocation: null,
    userAgent: "",
    platform: "",
    inBackground: false,
    
    registerEvents: function () {
        app.log("app.registerEvents");
        var self = this;

        //$('body').on('touchmove', function (event) { event.preventDefault(); });
        //$('body').on(app.clickEvent, '[data-route]', function (event) { app.route($(this).attr("data-route")); });
        //$('body').on('app.clickEvent, '#newOrder', function (event) { Service.autoOrder(); });
        //$('body').on(app.clickEvent, '#unbreakButton', function (event) { $("#unbreakButton").hide(); Service.unBreak(); });
        //$('body').on(app.clickEvent, '#unalarmButton', function (event) { $("#unalarmButton").hide(); Service.unAlarm(); });
        //$('body').on(app.clickEvent, '#taxiAlarm', function (event) { Service.alarmConfirm(); });
        //$('body').on(app.clickEvent, '#btnRecallMe', function (event) { Service.recallme(); });
        //$('body').on(app.clickEvent, '#btnSubmenu', function (event) { app.submenu(); });
        //$('body').on(app.clickEvent, '#btnNewsClose', function (event) { app.hideNews(); });

        //$('#unbreakButton').hide();
        //$('#unalarmButton').hide();

        try {
            document.addEventListener('pause', function () { app.info("Pause"); self.inBackground = true; }, false);
            document.addEventListener('resume', function () { app.info("Resume"); self.inBackground = false; }, false);
            document.addEventListener("offline", function () { app.info("Offline"); }, false);
            document.addEventListener("online", function () { app.info("Online"); }, false);
            document.addEventListener("unload", function () {
                app.info("Unload");
                if (cordova) {
                    cordova.require('cordova/plugin/powermanagement').release(
                                function () { app.info("powermanagement Release"); },
                                function () { app.info("powermanagement Error Release"); }
                        );
                }
                LocalNotification.clearAll();
            }, false);
            //document.addEventListener("menubutton", function () { e.preventDefault(); app.settings(); }, false);
            //document.addEventListener("backbutton", function (e) {
            //    if (app.currentPageName != "orders") {
            //        e.preventDefault();
            //        app.home();
            //    }
            //}, false);

        } catch (err) {
            app.log(err);
        }

        try {
            LocalNotification.registerPermission();
        }
        catch (err) {
            app.log("LocalNotification.registerPermission(): " + err);
        }

        //try {
        //    if (app.isDevice)
        //        self.mediaNew = new Media(app.getPhoneGapPath() + "audio/sound_order.mp3");
        //    else
        //        self.mediaNew = new Audio("audio/sound_order.mp3");
        //}
        //catch (err) {
        //    app.log("Media: " + err);
        //}
    },
    info: function (message) {
        Info(message);
    },
    log: function (message) {
        Log(message);
    },
    initialize: function () {
        app.log("app.initialize");

        app.log("app.userAgent: " + app.userAgent);
        app.log("app.platform: " + app.platform);
        app.log("app.isDevice: " + app.isDevice);
        var self = this;
        this.pages = {};

        if (!app.geolocation) {
            app.geolocation = navigator.geolocation; // cordova geolocation plugin
        }

        this.registerEvents();

        //Service.initialize(function () {
        //    self.home();
        //});
    },
    onLoad: function () {

        app.geolocation = false;
        if (navigator.geolocation) {
            app.geolocation = navigator.geolocation;
        }

        app.userAgent = navigator.userAgent;
        app.isDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
        app.platform = navigator.platform;


        if (app.isDevice) {
            app.clickEvent = "tap";
            document.addEventListener("deviceready", function () { app.initialize(); }, false);
        } else {
            app.clickEvent = "click";
            app.initialize();
        }

    }
};

