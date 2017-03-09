//https://github.com/katzer/cordova-plugin-local-notifications/wiki/11.-Samples
//https://github.com/evothings/phonegap-estimotebeacons/wiki/Background-notification-guide

var LocalNotification = {
    allowSedule: false,
    //id:
    //1 Objednavky
    //2 Spravy
    //3
    //...
    schedule: function (id, text, test) {
        if (!this.allowSedule) {
            app.log("LocalNotification.schedule: not allowSedule");
            return;
        }

        if (!test && !app.inBackground) { // || !app.allowNotification
            app.log("LocalNotification.schedule: app.inBackground");
            return;
        }

        this.hasPermission(function () {
            cordova.plugins.notification.local.get(id, function (notifications) {
                if (notifications.length === 0)
                    cordova.plugins.notification.local.schedule({ id: id, text: text });
                else
                    cordova.plugins.notification.local.update({ id: id, text: text });
            })
        });
    },
    clear: function (id, callback) {
        if (!this.allowSedule)
            return;

        cordova.plugins.notification.local.clear(id, callback);
        //cordova.plugins.notification.local.clear([10,20,30], callback);
    },
    clearAll: function (callback) {
        if (!this.allowSedule)
            return;

        cordova.plugins.notification.local.clearAll(callback);
    },
    hasPermission: function (callback) {
        var self = this;
        if (this.allowSedule) {
            app.log("LocalNotification.allowSedule: OK");
            if (callback)
                callback();
            return;
        }
        try{
            if (!cordova || !cordova.plugins || !cordova.plugins.notification) {
                this.allowSedule = false;
                app.log("LocalNotification.allowSedule: FALSE");
                return;
            }
        }
        catch (err) {
            this.allowSedule = false;
            app.log("LocalNotification.hasPermission: " + err);
            return;
        }

        cordova.plugins.notification.local.hasPermission(function (granted) {
            self.allowSedule = granted;
            //app.info(granted ? "Local Notification Granted" : "Local Notification Not Granted");

            if (granted) {

                app.log("LocalNotification.hasPermission: Granted");
                cordova.plugins.notification.local.setDefaults({
                    title: "Mobile test",
                    //icon: app.getPhoneGapPath() + 'img/cabs.png',
                    //smallIcon: 'res://cordova',
                    //sound: null,
                    //badge: 1,
                    //data: { test: id }
                });

                //cordova.plugins.notification.local.on('click', function (notification) {
                //    //self.clear(notification.id);
                //    switch (notification.id) {
                //        //case 1: app.route("orders");
                //        //case 2: app.route("messages");
                //        //default: app.home();
                //    }
                //    //a pod.
                //});

                if (callback)
                    callback();
            }
            else
            {
                app.log("LocalNotification.hasPermission: Not Granted");
            }
        });
    },
    registerPermission: function () {
        if (!cordova || !cordova.plugins || !cordova.plugins.notification) {
            this.allowSedule = false;
            return;
        }

        cordova.plugins.notification.local.registerPermission(function (granted) {
            app.info(granted ? "Local Notification Granted" : "Local Notification Not Granted");
        });
    }
}
