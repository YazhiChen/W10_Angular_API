
// Defining angularjs module
var app = angular.module('demoModule', []);
// Defining angularjs Controller and injecting ProductsService
app.controller('demoCtrl', function ($scope, $http, UnitService) {
    $scope.unitData = null;
    // Fetching records from the factory created at the bottom of the script file
    UnitService.GetAllRecords().then(function (d) {
        $scope.unitData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });
    
    $scope.Unit = {
        Id: '',
        UnitName: '',
        UnitCode: ''
    };
    // Reset unit details
    $scope.clear = function () {
        $scope.Unit.Id = '';
        $scope.Unit.UnitName = '';
        $scope.Unit.UnitCode = '';
    }
    //Add New Item
    $scope.save = function () {
        if ($scope.Unit.UnitName != "" &&
            $scope.Unit.UnitCode != "" ) {
            // Call Http request using $.ajax
            //$.ajax({
            // type: 'POST',
            // contentType: 'application/json; charset=utf-8',
            // data: JSON.stringify($scope.Book),
            // url: 'api/Book/PostBook',
            // success: function (data, status) {
            // $scope.$apply(function () {
            // $scope.bookData.push(data);
            // alert("Book Added Successfully !!!");
            // $scope.clear();
            // });
            // },
            // error: function (status) { }
            //});
            // or you can call Http request using $http
            $http({
                method: 'POST',
                url: 'api/Unit/PostUnit/',
                data: $scope.Unit
            }).then(function successCallback(response) {
// this callback will be called asynchronously
                // when the response is available
                $scope.unitData.push(response.data);
                $scope.clear();
                alert("Unit Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };
    // Edit unit details
    $scope.edit = function (data) {
        $scope.Unit = { Id: data.Id, UnitName: data.UnitName, UnitCode: data.UnitCode };
    }
    // Cancel unit details
    $scope.cancel = function () {
        $scope.clear();
    }
    // Update unit details
    $scope.update = function () {
        if ($scope.Unit.UnitName != "" &&
            $scope.Unit.UnitCode != "" ) {
            $http({
                method: 'PUT',
                url: 'api/Unit/PutUnit/' + $scope.Unit.Id,
                data: $scope.Unit
            }).then(function successCallback(response) {
                $scope.unitData = response.data;
                $scope.clear();
                alert("Unit Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };
    // Delete unit details
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Unit/DeleteUnit/' + $scope.unitData[index].Id,
        }).then(function successCallback(response) {
            $scope.unitData.splice(index, 1);
            alert("Unit Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});
// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.
app.factory('UnitService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('api/Unit/GetAllUnits');
    }
    return fac;
});
