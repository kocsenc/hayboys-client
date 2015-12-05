'use strict';

/**
 * @ngdoc function
 * @name hayboys.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hayboys app
 */
var app = angular.module('hayboys', ['ngResource', 'ngAnimate']);


angular
  .module('hayboys')
  .controller('main', MainCtrl);

function MainCtrl($resource, $scope) {
  var url = 'http://couch.kocsen.com/hayboys';
  var QuotesResource = $resource(url + '/_design/default/_view/default');
  var Quote = $resource(url);
  var vm = $scope;

  fetchQuotes();
  function fetchQuotes() {
    vm.loading = true;
    QuotesResource.get({descending: true}, function (data) {
      vm.loading = false;
      vm.quotes = data.rows;
    }, function (err) {
      alert(err);
      vm.loading = false;
    });
  }

  vm.newQuote = {
    form: {
      //quote: '',
      //author: '',
      kk: 15
    },
    showError: false,
    error: '',
    show: false
  };

  vm.create = function () {
    if (!vm.newQuote.form.quote) {
      showError('Please fill out the quote!');
      return
    }
    if (!vm.newQuote.form.author) {
      showError('Who said that? Please fill out an author!');
      return
    }
    if (!vm.newQuote.form.kk) {
      showError('Please put only a number greater than 15 in 2K!');
      return
    }

    var quote = new Quote({
      quote: vm.newQuote.form.quote,
      author: vm.newQuote.form.author,
      created_at: new Date()
    });
    quote['2k'] = vm.newQuote.form.kk;

    console.log(quote);
    quote.$save().then(
      function () {
        fetchQuotes();
        vm.newQuote.show = false;
        vm.newQuote.showError = false;
      }
    )
  };

  function showError(message) {
    vm.newQuote.error = message;
    vm.newQuote.showError = true;
  }
}
