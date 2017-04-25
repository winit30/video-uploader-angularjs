projectApp.service('AuthenticationService', ["$http", function($http){
	var self = this;
	self.checkToken = function(token){
		var data = {token: token};
		$http.post("endpoints/checktoken.php", data).success(function(response){ 
			if (response.trim() == ""){
				console.log("Logged out"+ response);
				mainView.router.load({url: 'views/login-screen.html', animatePages:false});
				return true;
			} else {
				console.log(response.trim());
				console.log("Logged In");
				mainView.router.load({url: 'views/app.html', animatePages:true});
				localStorage.setItem('userID',parseInt(response));
				return response.trim();
			}
		}).error(function(error){
			mainView.router.load({url: 'views/login-screen.html', animatePages:true});
		})
	}
}]);
