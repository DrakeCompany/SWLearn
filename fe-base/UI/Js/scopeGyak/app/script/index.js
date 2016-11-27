/**
 * Created by Sa on 2016.11.26..
 */

angular
    .module('myApp', [])
    .controller('firstController', alma);


function alma($scope, $http) {
    $scope.name = "Sanyi";
    function refresh() {
        $http.get('/topics')
            .then(
                function (response) {
                    console.log(response);
                    $scope.topics = response.data;
                }
            )
            .catch(function (err) {
                console.error(err);
            });

    }
    $http.get('/topics')
        .then(
            function (response) {
                console.log(response);
                $scope.topics = response.data;
            }
        )
        .catch(function (err) {
            console.error(err);
        });

    $scope.topicDelete=function (topicId) {
        $http.delete('/topics/'+topicId)
            .then(function() {
                refresh();
            })
            .catch (function (err) {
                console.error(err);
        })
    }
    $scope.newTopic={};
    $scope.addTopic=function () {
       $http.post('/topics',$scope.newTopic).then(function () {
           refresh();
           $scope.newTopic={};
       });
        $scope.closeModal();

    }

    $scope.displayModal = false;
    $scope.closeModal = function() {
        $scope.displayModal = false;

    }
    $scope.openTopic=function (topic) {
        $scope.displayModal= true;
        $scope.newTopic=topic;
        $scope.modify=true;

    }
    $scope.modTopic= function () {
        $http.put('/topics/'+$scope.newTopic.id,$scope.newTopic).then(function () {
            refresh();
            $scope.displayModal=false;
            $scope.newTopic={};
        })
        
    }
    $scope.displayModalSee = function () {
        $scope.modify=false;
        $scope.displayModal=true;
    }
}
console.log(angular);
