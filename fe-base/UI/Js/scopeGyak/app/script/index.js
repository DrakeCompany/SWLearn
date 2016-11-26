/**
 * Created by Sa on 2016.11.26..
 */

angular
    .module('myApp',[])
    .controller('firstController', alma);

function alma($scope, $http) {
    $scope.name="Sanyi";

    $http.get('./topics')
        .then(
        function (response) {
            console.log(response);
            $scope.topics=response.data;
                            }
            )
        .catch(function (err) {
            console.error(err);
        })
}
console.log(angular);
