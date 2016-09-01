angular.
  module('jobsApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/jobs', {
          template: '<job-list></job-list>'
        }).
        when('/jobs/add', {
          template: '<job-add></job-add>'
        }).
        when('/jobs/:jobID', {
          template: '<job-detail></job-detail>'
        }).
        otherwise('/jobs');
    }
  ]);