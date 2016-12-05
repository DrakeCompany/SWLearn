/**
 * Created by sa on 2016.12.03..
 */
(function () {
    angular
        .module('myApp', [])
        .controller('firstController', alma);

    function alma($scope, api) {

        api.getProduct()
            .then(
                function (response) {
                    console.log(response);
                    })
            .catch(function (err) {
                    console.error(err);
                });

    }

})();
