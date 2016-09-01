angular.
  module('jobDetail').
  component('jobDetail', {
    templateUrl: 'app/job-detail/job-detail.template.html',
    controller: ['JobService','$routeParams',
      function JobListController(Job,$routeParams) {
        this.jobID = $routeParams.jobID;
        this.jobs = Job.get({jobID:this.jobID});
      }
    ]
  });