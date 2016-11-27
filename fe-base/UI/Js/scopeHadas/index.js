/**
 * Created by Sa on 2016.11.27..
 */
(function() {
    angular
        .module('app', [])
        .controller('ctrl', Ctrl);

    function Ctrl($scope, $sce, $http) {
        $scope.value = false;
        $scope.value2 = true;
        $scope.style = {
            backgroundColor: 'blue'
        };
        $scope.lekerdezes = lekerdezes;
        $scope.valtssss = function($event) {
            console.log($event);
            $scope.value = !$scope.value;
        };
        $scope.name = 'Vicces vagy Zsolti!';
        $scope.html = $sce.trustAsHtml('<ul><li>ala</li><li>fsdd</li></ul>');

        function lekerdezes() {
            $http.get($scope.alma)
                .then(function(result) {
                    console.log('sikeres');
                    console.log(result);
                })
                .catch(function(err) {
                    console.error(err);
                })
                .finally(function() {
                    console.log(arguments)
                });
        }

        $http.post('/topics', {
            title: 'szia'
        });
        $http.get('/topics')
            .then(function(result) {
                console.log(result);
            })
    }
})();