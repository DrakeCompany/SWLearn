/**
 * Created by Sa on 2016.11.26..
 */

// (function () {
//     var apiService =function () {
//         angular.module('app').service('api',apiService)
//     }
// })();
(function () {
    angular
        .module('myApp', [])
        .controller('firstController', alma);

    function alma($scope, api) {
        $scope.name = "Fórum";

        function refresh() {
            api.getTopics()
                .then(
                    function (response) {
                        console.log(response);
                        loadTopics(response);
                    }
                )
                .catch(function (err) {
                    console.error(err);
                });
        };

        api.getTopics()
            .then(
                function (response) {
                    console.log(response);
                    loadTopics(response);
                }
            )
            .catch(function (err) {
                console.error(err);
            });
        $scope.topicDelete = function (topicId) {
            console.log("delete");
            api.deleteTopic(topicId)//    $http.delete('/topics/' + topicId)
                .then(function () {
                    refresh();
                })
                .catch(function (err) {
                    console.error(err);
                })
        }
        $scope.newTopic = {};
        $scope.addTopic = function () {

            $scope.modify = false;
            $scope.newTopic.created = new Date();
            $scope.newTopic.views = 0;
            $scope.newTopic.replay = 0;
            $scope.newTopic.leftTime = 0;
            $scope.newTopic.lastReplay = 0;
            $scope.newTopic.like = 0;
            api.newTopic($scope.newTopic)// $http.post('/topics', $scope.newTopic)
                .then(function () {
                    refresh();
                    $scope.newTopic = {};
                });
            $scope.closeModal();

        }
        $scope.categoris=['Audio', 'Video', 'General', 'Pictures'];


        $scope.displayModal = false;

        $scope.closeModal = function () {
            $scope.displayModal = false;
            $('#myModal').modal('hide');
            refresh();

        }
        $scope.openTopic = function (topic) {
            $scope.displayModal = true;
            $scope.newTopic = topic;
            $scope.modify = true;
            console.log("topic:");
            console.log(topic);

        }
        $scope.modify = false;
        $scope.modTopic = function () {
            api.editTopic($scope.newTopic)// $http.put('/topics/' + $scope.newTopic.id, $scope.newTopic)
                .then(function () {
                    refresh();
                    $scope.displayModal = false;
                    $scope.newTopic = {};
                    $scope.closeModal();
                })
        }
        $scope.openNewTopic = function () {
            $scope.newTopic = {};
            $scope.modify = false;
        }
        $scope.likeCount = function (topic) {
            topic.like++;
            // $scope.likeCountTopic = topic;
            // $scope.likeCountTopic.like++;
            api.editTopic(topic)     //$scope.likeCountTopic)
                .then(function () {
                    refresh();
                })
        }

        function loadTopics(response) {
            $scope.topics = response.data;
            angular.forEach($scope.topics, function (value, key) {
                var leftTimeUnit = "Minutes";
                var leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60);
                if (leftTimeCount > 60) {
                    leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60 / 60);
                    leftTimeUnit = "Hours";
                    if (leftTimeCount > 24) {
                        leftTimeCount = Math.floor((new Date() - new Date(value.created)) / 1000 / 60 / 60 / 24);
                        leftTimeUnit = "Days";
                    }
                }

                value.leftTime = leftTimeCount;
                value.leftTimeUnit = leftTimeUnit;
                if (!value.like) {
                    value.like = 0;
                }

            });
            $scope.countCategoris = {};
                angular.forEach($scope.topics,function (topic) {
                    if(!$scope.countCategoris[topic.category]){
                        $scope.countCategoris[topic.category] = [];

                    }
                    $scope.countCategoris[topic.category].push(topic);
                });
            console.log("countCategoris");
            console.log($scope.countCategoris);

        }
    }
    console.log(angular);
})();