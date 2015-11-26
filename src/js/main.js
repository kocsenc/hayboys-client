'use strict';

/**
 * @ngdoc function
 * @name hayboys.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hayboys app
 */
var app = angular.module('hayboys', []);


app.controller('MainCtrl', function () {
  this.potato = "ARE YUMMY";
  console.log('potato');
});
