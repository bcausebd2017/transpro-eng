angular.module('app').component('resetPasswordWindow', {
    templateUrl: 'app/resetpassword/resetPassword.tmpl.html',
    bindings: {
        modalInstance: "<",
        resolve: "<"
    },
    controller: resetPasswordController
});

function resetPasswordController() {

}