Framework7.prototype.plugins.angular = function(app, params) {
    function compile(newPage) {
        try {
            var $page = $(newPage);
            var injector = angular.element("[ng-app]").injector();
            var $compile = injector.get("$compile");
            var $timeout = injector.get("$timeout");
            var $scope = injector.get("$rootScope");
            //$scope = $scope.$$childHead;
            $timeout(function() {
                $compile($page)($scope);
            })
        } catch (e) {
           // console.error("Some Error Occured While Compiling The Template", e);
        }
    }

    return {
        hooks: {
            pageInit: function(pageData) {
                compile(pageData.container);
            }
        }
    }

};

// Initialize your app
var myApp = new Framework7({
	material: true, //enable Material theme
	precompileTemplates: true,
	angular:true,
	materialRipple:true,
	smartSelectOpenIn: 'page'
});

// Export selectors engine
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
   // domCache: true //enable inline pages
});



jQuery(document).ready(function($){ 
		$('#fileToUpload').change(function(){
			alert();
		});
});



