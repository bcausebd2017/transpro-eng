(function () {
    "use strict";
    function MessageService($q, $http, API_URL, $httpParamSerializer) {
        var vm = this;

        function sendMessage(obj) {
            return $http({
                url: API_URL.URL + "SendMessage/save",
                method: "POST",
                data: obj
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getSendMsgById(SenderID) {
            return $http({
                url: API_URL.URL + "message/getSendMsgById" + "/" + SenderID,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getReceiveMsgById(receiverID) {
            return $http({
                url: API_URL.URL + "message/getReceiveMsgById" + "/" + receiverID,
                method: "GET"
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getsendMsgDetailsbyId(msgId) {
            return $http({
                url: API_URL.URL + "msg/getbyid" + "/" + msgId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }

        function getreceiveMsgDetailsbyId(msgId) {
            return $http({
                url: API_URL.URL + "msg/getbyid" + "/" + msgId,
                method: "GET",
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return $q.reject(error.data.Message);
            });
        }


        var service =
            {
                sendMessage: sendMessage,
                getReceiveMsgById: getReceiveMsgById,
                getSendMsgById: getSendMsgById,
                getsendMsgDetailsbyId: getsendMsgDetailsbyId,
            }
        return service;
    }
    angular
    .module("app")
    .service("MessageService", MessageService);
    MessageService.$inject = ["$q", "$http", "API_URL", "$httpParamSerializer"]
})();