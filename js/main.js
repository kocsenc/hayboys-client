'use strict';

/**
 * @ngdoc function
 * @name hayboys.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hayboys app
 */
var app = angular.module('hayboys', ['ngResource']);


angular
  .module('hayboys')
  .controller('main', MainCtrl);

function MainCtrl($resource, $scope) {
  var url = 'http://couch.kocsen.com/hayboys/_design/default/_view/default';
  var QuotesResource = $resource(url);
  var vm = $scope;

  vm.loading = true;
  QuotesResource.get({}, function (data) {
    vm.loading = false;
    vm.quotes = data.rows;
  }, function (err) {
    alert(err);
    vm.loading = false;
  });
}
