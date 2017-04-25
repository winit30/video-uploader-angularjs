videoApp.service('videoUploadService', function($http){
	var self = this;
	var uploading = true;
	var codeArray;
	var filename;
	
	self.checkUpload = function(success){
		var data = {
				chunkLength:codeArray.length,
				filename:filename,
				user:localStorage.getItem('userID')
			}
		$http.post("endpoints/checkUpload.php", data).success(function(response){
				success(response);
			}).error(function(error){
				console.error(error);
			});
	}
	
	self.uploadCodes = function(a){
		if(a<=codeArray.length && uploading){ 
		
		var progress = (parseInt(a)*100)/codeArray.length;
		document.getElementById("bar").style.width = progress+"%";
		
		console.log(a);
			var data = {
				chunk:codeArray[a],
				chunkLength:codeArray.length,
				chunkNum: a+1,
				filename:filename,
				user:localStorage.getItem('userID')
			}
			$http.post("endpoints/upload.php", data).success(function(response){
				self.uploadCodes(a);
				//console.log(response);
				return response;
			}).error(function(error){
				console.error(error);
			});
			a++;
		}
	}
	
	self.stopUpload = function(){
		 uploading = false;
	}
	
	self.resumeUpload = function(codes, fileName){
		codeArray = codes;
		filename = fileName;
		 uploading = true;
		 self.checkUpload(function(res){
			 var a = res;
			 self.uploadCodes(a);
		 });
	}
	
	self.getData = function(success){
		$http.post("endpoints/download.php").success(function(response){
			success(response);
		}).error(function(error){
			console.error(error);
		});
	}
});






