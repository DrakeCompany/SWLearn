/**
 * Created by Sa on 2016.11.28..
 */
/**
 *
 * @param {Object} $http A http service
 */
(function() {
    var apiService = function ($http) {

        this.loginUser=function (userEmail, password) {


        }

        this.newProduct=function (product) {
            return $http.post('10.254.254.42:1337/product',product);

        }
        /**
         * @param {Object}topic
         * @returns {Promise.<Object>}
         */
        this.editProduct = function(product) {
            var id = product.id;
            return $http.put('10.254.254.42:1337/product' + id, product);
        };

        // /**
        //  * @param {Object} topic
        //  * @returns {Promise.<Object>}
        //  */
        // this.newTopic = function(topic) {
        //     return $http.post('/topics', topic);
        // };

        /**
         * @returns {Promise.<Array.<Object>}
         */
        this.getProduct = function () {

            return $http.get('http://localhost:1337/product',
                {
                    headers:{Authorization: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTQ4MDc3NDQ3Mn0.hRu4W1uqg8JqawBNx_twfuQAoWBj_B3GMfWm0gC_RNw"}
                });

        }
    };

    angular
        .module('myApp')
        .service('api', apiService);
})();
