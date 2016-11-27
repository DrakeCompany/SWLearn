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
                // for (var i = 0; i < $scope.topics.length; i++) {
                //
                //     var leftTimeUnit = "Minutes";
                //     var leftTimeCount = Math.floor((new Date() - new Date($scope.topics[i].created)) / 1000 / 60);
                //     if (leftTimeCount > 60) {
                //         leftTimeCount = Math.floor((new Date() - new Date($scope.topics[i].created)) / 1000 / 60 / 60);
                //         leftTimeUnit = "Hours";
                //         if (leftTimeCount > 24) {
                //             leftTimeCount = Math.floor((new Date() - new Date($scope.topics[i].created)) / 1000 / 60 / 60 / 24);
                //             leftTimeUnit = "Days";
                //         }
                //     }
                //     ;
                //     $scope.topics[i].leftTimeUnit = leftTimeUnit;
                //     $scope.topics[i].leftTime = leftTimeCount;
                // }
                angular.forEach($scope.topics,function (value,key) {
                        var leftTimeUnit = "Minutes";
                        var leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60);
                        if (leftTimeCount > 60) {
                            leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60 / 60);
                            leftTimeUnit = "Hours";
                            if (leftTimeCount > 24) {
                                leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60 / 60 / 24);
                                leftTimeUnit = "Days";
                            }
                        };
                        value.leftTime=leftTimeCount;
                        value.leftTimeUnit=leftTimeUnit;
                    
                })
            }
        )
        .catch(function (err) {
            console.error(err);
        });

    $scope.topicDelete = function (topicId) {
        $http.delete('/topics/' + topicId)
            .then(function () {
                refresh();
            })
            .catch(function (err) {
                console.error(err);
            })
    }
    $scope.newTopic = {};
    $scope.addTopic = function () {
        $scope.newTopic.created = new Date();
        $scope.newTopic.views = 0;
        $scope.newTopic.replay = 0;
        $scope.newTopic.leftTime = 0;
        $scope.newTopic.lastReplay = 0;
        $http.post('/topics', $scope.newTopic).then(function () {
            refresh();
            $scope.newTopic = {};
        });
        $scope.closeModal();

    }

    $scope.displayModal = false;
    $scope.closeModal = function () {
        $scope.displayModal = false;

    }
    $scope.openTopic = function (topic) {
        $scope.displayModal = true;
        $scope.newTopic = topic;
        $scope.modify = true;

    }
    $scope.modTopic = function () {
        $http.put('/topics/' + $scope.newTopic.id, $scope.newTopic).then(function () {
            refresh();
            $scope.displayModal = false;
            $scope.newTopic = {};
        })

    }
    $scope.displayModalSee = function () {
        $scope.modify = false;
        $scope.displayModal = true;
    }
}
console.log(angular);
