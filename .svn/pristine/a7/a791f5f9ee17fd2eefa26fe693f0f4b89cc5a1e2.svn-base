
(function () {
    'use strict';

    function TransproUtilityService($q, $http, API_URL, APP_SETTINGS, DELIVERY_TIMERANGE_TYPE) {

        function GetHumanReadableFileSizeInfo (FileSizeInBytes) {
            var i;
            var FileSize, SizeUnit;
            var A_KB = 1024, A_MB = A_KB * 1024, A_GB = A_MB * 1024;
            if (FileSizeInBytes >= A_GB) {
                FileSizeInBytes /= A_GB;
                SizeUnit = "GB";
            }
            else if (FileSizeInBytes >= A_MB) {
                FileSizeInBytes /= A_MB;
                SizeUnit = "MB";
            }
            else if (FileSizeInBytes >= A_KB) {
                FileSizeInBytes /= A_KB;
                SizeUnit = "KB";
            }
            else {
                SizeUnit = " Bytes";
            }
            FileSize = FileSizeInBytes.toLocaleString(undefined, { useGrouping: false, minimumFractionDigits: 0, maximumFractionDigits: 1 });
            FileSize = FileSize.concat(SizeUnit);
            return FileSize;
        }


        function UpdateOrderAnticipatedDelivery(DeliveryTime, DeliveryType) {
            var TimeStamp = Date.now();
            var Minutes = 1000 * 60;
            var Hours, Days;
            switch (DeliveryType) {
                case DELIVERY_TIMERANGE_TYPE.RangeInMinutes:
                    Minutes = Minutes * DeliveryTime;
                    TimeStamp += Minutes;
                    break;
                case DELIVERY_TIMERANGE_TYPE.RangeInHours:
                    Hours = Minutes * DeliveryTime * 60;
                    TimeStamp += Hours;
                    break;
                case DELIVERY_TIMERANGE_TYPE.RangeInDays:
                    Hours = Minutes * 60;
                    Days = Hours * DeliveryTime * 24;
                    TimeStamp += Days;
                    break;
            }
            var AnticipatedDate = new Date(TimeStamp);
            return AnticipatedDate;
        }

        var UtilityService = {
            GetHumanReadableFileSizeInfo: GetHumanReadableFileSizeInfo,
            UpdateOrderAnticipatedDelivery: UpdateOrderAnticipatedDelivery
        };
        return UtilityService;
    }

    angular.module("app").service("TransproUtilityService", TransproUtilityService);
    TransproUtilityService.$inject = ["$q", "$http", "API_URL", "APP_SETTINGS", "DELIVERY_TIMERANGE_TYPE"];
})()