/**
 * Created by Hisham on 5/26/2015.
 */
angular.module('BlurAdmin.pages.notifications')
    .factory("PushNotificationsSvc", ['$q', '$timeout', 'Constants','$injector', function ($q, $timeout, Constants,$injector) {


        var connected = false;
        var service = {}, listener = $q.defer(), socket = {
            client: null,
            stomp: null
        }, messageIds = [];

        service.receive = function () {
            return listener.promise;
        };

        service.send = function (message) {
            if(connected){
                socket.stomp.send(Constants.websocket.sendUrl, {}, message);
            }
        };

        service.isConnected = function () {
            return connected;
        };

        var reconnect = function () {
            $timeout(function () {
                initialize();
            }, Constants.websocket.reconnect);
        };

        var getMessage = function (data) {
            return JSON.parse(data.body);
        };

        var startListener = function () {
            socket.stomp.subscribe(Constants.websocket.notificationsDestination, function (data) {
                listener.notify(getMessage(data));
                return getMessage(data);
            });
            return listener.promise;
            connected = true;
        };

        var initialize = function () {
            socket.client = new SockJS(Constants.websocket.webSocketUrl);
            socket.stomp = Stomp.over(socket.client);
            socket.stomp.connect({}, startListener);
            socket.stomp.onclose = reconnect;
            service.send('data');
        };

        initialize();
        return service;
    }]);