angular.
  module('jobList').
  component('jobList', {
    templateUrl: 'app/job-list/job-list.template.html',
    controller: ['JobService',
      function JobListController(Job) {
        this.jobs = Job.query();
      }
    ]
  });