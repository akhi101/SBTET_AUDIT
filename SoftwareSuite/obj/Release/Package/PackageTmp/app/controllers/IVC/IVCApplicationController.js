define(['app'], function (app) {
    app.controller("IVCApplicationController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {

        $scope.GetCourses = [{ "Value": "Diploma in Automobile Engineering" },
            { "Value": "Diploma in Civil Engineering" },
            { "Value": "Diploma in Computer Science Engineering" },
            { "Value": "Diploma in Commercial & Computer Practice" },
            { "Value": "Diploma in Printing Technology" },
            { "Value": "Diploma in Electrical & Electronics Engineering" },
            { "Value": "Diploma in Electronics Communication Engineering" },]

        $scope.GetVocat = [{ "Value": "Electrical Wiring and Servicing of Electrical Appliances" },
            { "Value": "Water Supply and Sanitary Engineering Technician" },
            { "Value": "Construction Technology" },
        ]

        $scope.Values = [{ "Value": "Yes" },
        { "Value": "No" },
       
        ]

        $scope.passlst = [{ "Value": "Single attempt" },
            { "Value": "Compartment" },

        ]

        $scope.enterotp = true;
        $scope.verifyotp = true;

        
        $scope.Banlst = [{ "Value": "State Bank of India" },
            { "Value": "Punjab National Bank" },
            { "Value": "Bank of Baroda" },
            { "Value": "Canara Bank" },
        ]

        
    })
})