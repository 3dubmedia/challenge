angular.
  module('jobAdd').
  component('jobAdd', {
    templateUrl: 'app/job-add/job-add.template.html',
    controller: function($location,$scope,JobService){  
        $scope.saveURL = function(){
          var jobJSON =
          {
            "type": "new job",
            "data": {
              "url": this.job.url
            }
          };
         
          JobService.create(jobJSON).$promise.then(function (result) {
              this.job = result;
              $scope.jobID= this.job.id;
              $scope.message= this.job.message;
          });
        }
      }
  });
