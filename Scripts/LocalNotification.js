//https://github.com/katzer/cordova-plugin-local-notifications/blob/9a13f4e/README.md

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
            try {

                window.plugin.notification.local.isScheduled(id, function (isScheduled) {
                    app.log('Notification with ID ' + id + ' is scheduled: ' + isScheduled);

                    if (isScheduled)
                        cordova.plugins.notification.local.cancel(id);

                    cordova.plugins.notification.local.add({ id: id, text: text });
                    app.log("cordova.plugins.notification.local.add id:" + id + " text:" + text);
                    
                });

                /*
                window.plugin.notification.local.add({
                    id:         String,  // A unique id of the notifiction
                    date:       Date,    // This expects a date object
                    message:    String,  // The message that is displayed
                    title:      String,  // The title of the message
                    repeat:     String,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                    badge:      Number,  // Displays number badge to notification
                    sound:      String,  // A sound to be played
                    json:       String,  // Data to be passed through the notification
                    autoCancel: Boolean, // Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing:    Boolean, // Prevent clearing of notification (Android only)
                });
                
                */

               
            } catch (err) {
                app.log("cordova.plugins.notification.local.isScheduled: " + err);
                    return;
                }
        });
    },
    clear: function (id, callback) {
        if (!this.allowSedule)
            return;

        cordova.plugins.notification.local.cancel(id);
    },
    clearAll: function (callback) {
        if (!this.allowSedule)
            return;

        cordova.plugins.notification.local.cancelAll();
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
            //app.info(granted ? "Local Notification Granted" : "Local Notification Not Granted");

            if (granted) {
                LocalNotification.allowSedule = true;
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
            LocalNotification.allowSedule = true;
            return;
        }

        cordova.plugins.notification.local.registerPermission(function (granted) {
            LocalNotification.allowSedule = true;
            app.log(granted ? "Local Notification Granted" : "Local Notification Not Granted");
        });
    }
}
