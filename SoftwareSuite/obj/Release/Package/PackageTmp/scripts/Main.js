require.config({
    waitSeconds: 90,
    paths: {
        'jQuery': '/scripts/jquery-3.3.1.min',
        'momentjs': "/scripts/moment.min",
        'bootstrap': '/scripts/bootstrap.min',

        // Angular
        'angular': '/scripts/angular.min',
        'angularroute': '/scripts/angular-route.min',
        'angularuiroute': '/scripts/angular-ui-router',
        'localstorage': '/scripts/ngStorage',
        'spin': "/scripts/spinner/spin.min",
        'angularspinner': "/scripts/spinner/angular-spinner.min",
        'angularloadingspinner': "/scripts/spinner/angular-loading-spinner",
        'authInterceptorService': '/app/services/authInterceptorService',
        'underscorejs': "/scripts/underscorejs",
        

        'AppSettings': '/app/services/AppSettings',
        'DataAccessService': '/app/services/DataAccessService',

        //Date Time Picker
        'uibootstraptpls': '/scripts/ui-bootstrap-tpls',
        'datetimepicker': '/scripts/datetime-picker'

         //Syncfusion
        //'ej.core.min':'/scripts/syncfusion/scripts/ej.core.min',
        //'jsrender': '/scripts/syncfusion/scripts/jsrender.min',
        //'ej': '/scripts/syncfusion/scripts/ej.web.all.min',
        //'ejwidgetangular': '/scripts/syncfusion/scripts/ej.widget.angular.min',
        //'ejunobtrusive': '/scripts/syncfusion/scripts/ej.unobtrusive.min',
        //'properties': '/scripts/syncfusion/scripts/properties',
        //'jquery-validation': '/scripts/syncfusion/scripts/jquery.validate.min',
        //'jqueryvalidateunobtrusive': '/scripts/syncfusion/scripts/jquery.validate.unobtrusive.min',
    },
    shim: {
        'jQuery': { exports: '$' },

        //Angular
        'angular': { deps: ["jQuery"] },
        'momentjs': { deps: ["jQuery"] },
        'angular': { exports: "angular" },
        'angularroute': { deps: ["angular"] },
        'angularuiroute': { deps: ["angular"] },
        'localstorage': { deps: ["angularroute"] },
        'bootstrap': { deps: ["jQuery"]},
        'angularspinner': { deps: ["angular"] },
        'angularloadingspinner': { deps: ["angular"] },
        'underscorejs': { deps: ["angular"] },
       

        //Date Time Picker
        'uibootstraptpls': { deps: ["jQuery", "angular"] },
        'datetimepicker': { deps: ["uibootstraptpls"] }

        // Syncfusion
        //'ej.core.min': { deps: ["jQuery"] },
        //'jsrender': { deps: ["jQuery"] },
        //'jquery-validation': { deps: ["jQuery"] },
        //'ej': {deps: ["jQuery", "jsrender","jquery-validation"] },
        //'ejwidgetangular': { deps: ["angular", "ej.core.min"] },
        //'ejunobtrusive': { deps: ["angular", "ej.core.min"] },
        //'properties': { deps: ["jQuery", "ej"] },
        //'jqueryvalidateunobtrusive': {deps: ["jQuery","jquery-validation"] },
    },
    deps: ['app']
});

require
(
    [
    'jQuery',
    'app',
    'angular',
    'angularroute',
    'angularuiroute',
    'localstorage',
    'bootstrap',
    'uibootstraptpls',
    'datetimepicker',
    'spin',
    'angularspinner',
    'angularloadingspinner',
    'authInterceptorService',
    'AppSettings',
    'DataAccessService'
  //  'jsrender',
   // 'jquery-validation',
   // 'ej',
   // 'ej.core.min',
   // 'ejwidgetangular',
   // 'properties',
    //'jqueryvalidateunobtrusive',
    ],
    function () {
        angular.bootstrap(document, ['app']);
    }
);