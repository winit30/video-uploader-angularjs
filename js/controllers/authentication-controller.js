var projectApp = angular.module('projectApp', ['videoUploader']);

projectApp.controller('SignupController', function($scope, $http, $rootScope){
	//Variables
	$scope.signUpInfo = {
		name: undefined,
		email: undefined,
		phone: undefined,
		password: undefined
	}
	
	$scope.signUserUp = function (){ 
		var data = {
			name: $scope.signUpInfo.name,
			email: $scope.signUpInfo.email,
			phone: $scope.signUpInfo.phone,
			password: $scope.signUpInfo.password
		}
		
		$http.post("endpoints/signup.php", data).success(function(response){
			localStorage.setItem("token", JSON.stringify(response));
			console.log(localStorage.getItem("token"));
			mainView.router.load({url: 'index.html', animatePages:false});
		}).error(function(error){
			console.error(error);
		});
	};
});

projectApp.controller('LoginController', function($scope, $http, AuthenticationService){ 
	
	$scope.loginInfo = {
        email: undefined,
        password: undefined
    }
	
	$scope.loginUser = function (){ 
         var data = {
            email: $scope.loginInfo.email,
            password: $scope.loginInfo.password
        }
        
        $http.post("endpoints/login.php", data).success(function(response){
            localStorage.setItem("token", JSON.stringify(response));
			console.log(localStorage.getItem("token"));
			mainView.router.load({url: 'index.html', animatePages:false});
        }).error(function(error){
            console.error(error);
        });
    }
});

projectApp.controller("checkTokenController", function(AuthenticationService){
	  //If user is not logged in
	var token;
	if (localStorage['token']){
		token = JSON.parse(localStorage['token']);
		token = token.token;
		if(token == undefined) {
			token = "something stupid";
		}
	} else {
		token = "something stupid";
	}
	AuthenticationService.checkToken(token);
	
});

projectApp.controller("MainController", function ($scope, $http, AuthenticationService, $timeout, GetDataService){
    //If user is not logged in
	var token;
	if (localStorage['token']){
		token = JSON.parse(localStorage['token']);
		token = token.token;
		if(token == undefined) {
			token = "something stupid";
		}
	} else {
		token = "something stupid";
	}
	AuthenticationService.checkToken(token);
	$scope.data = '';
	GetDataService.getData(function(res){
		$scope.data = res;
	});

	$scope.logout = function(){ 
		var data = {
			token: token
		}
		$http.post('endpoints/logout.php', data).success(function(response){
			console.log(response)
			localStorage.clear();
			$timeout(function(){
				mainView.router.load({url: 'views/login-screen.html', animatePages:true});
			}, 270);
		}).error(function(error){
			console.error(error);
		})
	}
});

projectApp.controller("fileUploadCtrl", function($scope, $http, FileUpload){

		$scope.uploadFile = function(){
			var file = $scope.myFile;
			console.log('file is ' );
			console.dir(file);
			var uploadUrl = "endpoints/upload.php";
			var text = localStorage.getItem('userID');
			FileUpload.uploadFileToUrl(file, uploadUrl, text, function(res){
				$scope.imageData = res;
			});
		};	
		
		$scope.imageData = '';
		FileUpload.getImgs(function(res){
			$scope.imageData = res;
		});
});


projectApp.filter('reverse', function() {
  return function(items) {
	  try {
	return items.slice().reverse();
	}catch(err) {
		console.log(err.message);
	}
  };
});
 