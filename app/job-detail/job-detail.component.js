angular.
  module('jobDetail').
  component('jobDetail', {
    templateUrl: 'app/job-detail/job-detail.template.html',
    controller: ['JobService','$routeParams','$http','$scope',
      function JobListController(Job,$routeParams,$http,$scope) {
        this.jobID = $routeParams.jobID;
        console.log('jobID: '+this.jobID);
        this.jobs = Job.get({id:this.jobID}).$promise.then(function (result) {

            this.job = result;
              $scope.jobID= this.job.id;
              $scope.state= this.job.state;
                
            if (this.job.state=="complete") {
                console.log('complete');
                
                var url = "/api/html/"+this.job.id;
        
                $http.get(url)
                .then(function(response){
                  console.log(response.data);
                  $scope.source= response.data.source;
                });
                
            }
        });
      }
    ]
  });