$(function () {
	'use strict';
	angular.module('app')
        .factory('applicationService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$window', '$rootScope',
            function ($http, $q, localStorageService, ngAuthSettings, $window, $rootScope) {

            	var serviceBase = ngAuthSettings.apiServiceBaseUri;
            	var applicationService = {};
            	var _transcribe = function (file,actual) {

            	    return $http.get(serviceBase + 'transcribe?file='+file+'&actual='+actual).then(function (results) {
            			return results;
            		});

            	};

            	var _convert = function (data) {

            	    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
            	    //    return results;
            	    //});
            	    return $http({
            	        url: serviceBase + 'transcribe',
            	        method: "POST",
            	        data: { audio: data },
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};
            	
            	var _convertScript = function (data) {

            	    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
            	    //    return results;
            	    //});
            	    return $http({
            	        async: true,
            	        crossDomain: true,
            	        url: serviceBase + 'transcribe',
            	        method: "POST",
            	        data: data,
            	        headers: { 'Content-Type': "application/x-www-form-urlencoded" }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _getScripts = function () {
            	    return $http({
            	        url: ngAuthSettings.dataPath + 'scripts.json',
            	        type: 'GET',
            	        dataType: "json"
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _getRecordings= function () {
            	    return $http({
            	        url: ngAuthSettings.dataPath + 'recordings.json',
            	        type: 'GET',
            	        dataType: "json"
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _enroll = function (data) {

            	    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
            	    //    return results;
            	    //});
            	    return $http({
            	        url: serviceBase + 'enroll',
            	        method: "POST",
            	        data: data,
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _voiceTest = function (data) {

            	    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
            	    //    return results;
            	    //});
            	    return $http({
            	        url: serviceBase + 'test',
            	        method: "POST",
            	        data: data,
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _enrollmentStatus= function () {

            	    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
            	    //    return results;
            	    //});
            	    return $http({
            	        url: serviceBase + 'EnrollmentStatus',
            	        method: "POST",
            	        data: { 'email-id': localStorageService.get('email') },
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _resetEnrollment = function () {
            	  
            	    return $http({
            	        url: serviceBase + 'ResetEnrollment',
            	        method: "POST",
            	        data: { 'email-id': localStorageService.get('email') },
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

            	var _getVoiceBioScripts = function () {

            	    return $http({
            	        url: serviceBase + 'LoadScripts',
            	        method: "POST",
            	        data: { 'num_scripts': '0' },
            	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	    }).then(function (results) {
            	        return results;
            	    });
            	};

                var _ttp = function (data) {

                    //return $http.post(serviceBase + 'transcribe', data).then(function (results) {
                    //    return results;
                    //});
                    return $http({
                        url: serviceBase + 'ttp',
                        method: "POST",
                        data: { audio: data },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (results) {
                        return results;
                    });
                };


            	applicationService.getRecordings = _getRecordings;
            	applicationService.getScripts = _getScripts;
            	applicationService.transcribe = _transcribe;
            	applicationService.convert = _convert;
            	applicationService.convertScript = _convertScript;

            	applicationService.enroll = _enroll;
            	applicationService.enrollmentStatus = _enrollmentStatus;
            	applicationService.getVoiceBioScripts = _getVoiceBioScripts;
            	applicationService.voiceTest = _voiceTest;
                applicationService.resetEnrollment = _resetEnrollment;

                applicationService.ttp = _ttp;

            	return applicationService;
            }]);
}());