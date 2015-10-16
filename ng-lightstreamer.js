angular.module('ng-lightstreamer',[]).provider('lightstreamer',[function(){

	var lsClient;

	var configuration = {};

	return {
		setConfiguration:function(config){
			configuration = config;
		},
		$get:function(){
			define("js/lsClient",["LightstreamerClient"],function(LightstreamerClient) {
				lsClient = new LightstreamerClient(config.url,config.channel);	
			});
			
			return {
				connect:lsClient.connect
			};
		}
	};
}]);