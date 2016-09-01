angular.
  module('core.job').
  factory('JobService', ['$resource',
    function($resource) {
      return $resource('api/jobs', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        get: {
          method: 'GET',
          params: {jobID: this.jobID},
          isArray: false
        },
        create: {
          method: "POST",
          isArray: false
        }

      });
    }
  ]);