(function () {
    'use strict';
    angular.module("app").controller("penaltyController", function ($scope, $state, $rootScope, $uibModal, APP_SETTINGS, STORAGE_TYPE, USER_TYPE, appStorageFactory, transproService, alertMsg)
    {
        $scope.penalty = {};
        $scope.onInit = function ()
        {
            transproService.getPenaltyList().then(function (response) {
                $scope.penalty = response;

            }).catch(function (error) {
                alertMsg.show('error', error);
            });
        }

   
        function buildTableBody(data, columns) {
            var body = [];

            body.push(columns);

            data.forEach(function (row) {
                var dataRow = [];

                columns.forEach(function (column) {
                    dataRow.push(row[column].toString());
                })

                body.push(dataRow);
            });

            return body;
        }

        $scope.makepdf = function()
        {
          var arrays = document.getElementsByClassName("penalty");
            var docDefinition = {
               
                
                header: {
                    columns: [
                        {
                             margin: [200, 20, 0, 0], 
                             text: 'Trans-pro penalty list',
                        }
                    ]
                },
                content: [
                  {
                      

                      table: {

                          headerRows: 1,
                          widths: ['*', 'auto', 100, '*'],
                          body: buildTableBody($scope.penalty, ['Score', 'Name', 'Contents', 'Response']),
                          //body: [
                          //  ['Score', 'Item', 'Contents', 'Response'],
                          //  ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                          //  ['Value 1', 'Val 2', 'Val 3', 'Val 4']
                          //]
                      }
                  }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true
                    },
                    quote: {
                        italics: true
                    },
                    small: {
                        fontSize: 8
                    }
                }
            };
            pdfMake.createPdf(docDefinition).download('Penalty.pdf');

            //angular.element(document).ready(function () {
            //    var arrays = document.getElementsByClassName("penalty-table");
            //    console.log(arrays[2]);
            //});
        }
       

    })

})()