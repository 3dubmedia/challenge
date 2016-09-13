angular.
  module('core.job').
  factory('JobService', ['$resource',
    function($resource) {
      return $resource('queue/job/:id', {id: this.jobID}, {
        query: {
          method: 'GET',
          isArray: true
        },
        get: {
          method: 'GET',
          params: {id: this.jobID},
          isArray: false
        },
        create: {
          method: "POST",
          isArray: false
        }

      });
    }
  ]);