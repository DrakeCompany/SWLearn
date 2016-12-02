/**
 * Created by Sa on 2016.11.28..
 */
(function () {
    angular.module('myApp')

        .directive('topic',function () {
            return{

                restrict: 'A',//element = div element E , A attributom -topic, C class -ként is meg lehet adni
                templateUrl:'template/topic.html',
                // link: /*..*/ ,
                scope: {
                    topic: '&',// igy egy függvény, = objektum!
                    openTopic: '=',
                    topicDelete: '=',
                    likeCount: '='

                }
            }
        });

})();
