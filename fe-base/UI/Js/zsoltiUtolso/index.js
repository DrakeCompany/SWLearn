/**
 * Created by sa on 2016.12.03..
 */
angular
    .module('app',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: 'mainController'
            })
            .when('/test/:id', { //placeholder, ez rá kerül a routeParams objectre
                templateUrl: 'test.html',
                controller: function ($http, $routeParams, $scope) {
                    $http({
                        url: 'http://localhost:1337/product/'+$routeParams.id,
                        method: 'GET',
                        headers: {
                           Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTQ4MDc3NDQ3Mn0.hRu4W1uqg8JqawBNx_twfuQAoWBj_B3GMfWm0gC_RNw"}

                    }).then(function (result) {
                        $scope.product=result.data;
                        console.log($scope.product);
                    })
                }
            });

    })
.controller('mainController',function ($http,$scope) {
    $http({
        url: 'http://localhost:1337/product/',
        method: 'GET',
        headers: {
            Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTQ4MDc3NDQ3Mn0.hRu4W1uqg8JqawBNx_twfuQAoWBj_B3GMfWm0gC_RNw"}

    }).then(function (result) {
        $scope.products=result.data;
        console.log($scope.products);
    });
    });


