angular.module('ng-lightstreamer',[]).provider('lightstreamer',[function(){

	var lsClient;

	var configuration = {};

	return {
		setConfiguration:function(config){
			configuration = config;
		},
		$get:function(){
			lsClient = new LightstreamerClient(config.server,config.adapter);	

			return {
				connect:function(){
					return lsClient.connect();
				}
			};
		}
	};
}]);