var videoApp = angular.module('videoUploader',[]);

videoApp.controller('videoCtrl', function($scope, $window, $http, videoUploadService){
	
var calendarDefault = myApp.calendar({
    input: '#calendar-default',
}); 
	
	var dataString = null;
	function getBase64() {
		var files = document.getElementById('fileToUpload').files;
		if (files.length <= 0) {
			return false;
		  }
	   var reader = new FileReader();
	   var fileName =  files[0].name;
	   reader.readAsDataURL(files[0]);
	   reader.onload = function () {
		var enc = $window.btoa(reader.result);
		 dataString = enc;
		$scope.splitText(dataString, function(res){
			videoUploadService.resumeUpload(res, fileName);
		});
	   };
	   reader.onerror = function (error) {
		 console.log('Error: ', error);
	   };
	}
	
	var dataArray;
	$scope.splitText = function(string, success){
		var dArray = [];
		for(i = 0; i<=string.length;i+=100000){
			var str = string.slice(i,i+100000);
			dArray.push(str);
			dataArray = dArray;
		}
		success(dataArray);
	}
	
	$scope.uploadFile = function() { 
			getBase64();
	}
	
	
	$scope.stopUpload = function(){
		videoUploadService.stopUpload();
	}
	
	$scope.getImage = function(){
		videoUploadService.getData(function(res){
			var rec = $window.atob(res.trim());
			document.getElementById('image').innerHTML = '<img src="'+rec+'">';
		});
	}

	$scope.isUpload = false;
	$scope.fileNameChanged = function(files) {
		var files = document.getElementById('fileToUpload').files;
		if (files.length <= 0) {
			return false;
		  }
		var reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = function () {
			var imgCode = reader.result;
			document.getElementById('pullimage').innerHTML = '<img src="'+imgCode+'"/>';
			document.getElementById("bar").style.width = 0;
			$scope.$apply(function(){
				$scope.isUpload = true;
			})
		};
	}
	
});


