projectApp.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

projectApp.service('FileUpload', ['$http', function ($http) { 
    this.uploadFileToUrl = function(file, uploadUrl, name, succ){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         $http.post(uploadUrl, fd, { 
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(res){
			 console.log(res);
			var uID = {
				'user_id' : localStorage.getItem('userID')
			};
			 $http.post('endpoints/showImage.php', uID).success(function(res){
				 succ(res);
				 return res;
			 }).error(function(){
				 
			 })
         })
         .error(function(){
            console.log("error");
         });
     };
	 
	 this.getImgs = function(succ){
				var uID = {
					'user_id' : localStorage.getItem('userID')
				};
				 $http.post('endpoints/showImage.php', uID).success(function(res){
					succ(res);
				 })
		};
 }]);
 
projectApp.service('GetDataService', ["$http", function($http){
	 this.getData = function(succ){
			var uID = {
				'user_id' : localStorage.getItem('userID')
			};
			 $http.post('endpoints/getdata.php', uID).success(function(res){
				succ(res);
			}).error(function(){
				console.log("error");
			});
		};
}]);