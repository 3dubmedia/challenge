angular.
  module('jobAdd').
  component('jobAdd', {
    templateUrl: 'app/job-add/job-add.template.html',
    controller: function($location,$scope,JobService){  
        $scope.saveURL = function(){  
          JobService.create(this.job).$promise.then(function (result) {
              $location.path('/jobs/');
          });
        }
      }
  });
