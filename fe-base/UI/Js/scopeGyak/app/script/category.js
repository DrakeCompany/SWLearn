/**
 * Created by sa on 2016.12.02..
 */

(function () {
    angular.module('myApp')

        .directive('category',function () {
            return{

                restrict: 'A',//element = div element E , A attributom -topic, C class -ként is meg lehet adni
                templateUrl:'template/category.html',
                // link: /*..*/ ,
                scope: {
                    category: '<', //oneWayBinding
                    categoryName : '@',//literalBinding
                    topicDelete : '=',//twoWayBinding
                    openTopic : '=',
                    likeCount: '='
                    // topic: '&',// igy egy függvény, = objektum!
                    // openTopic: '=',
                    // topicDelete: '=',
                    // likeCount: '='

                }
            }
        });

})();