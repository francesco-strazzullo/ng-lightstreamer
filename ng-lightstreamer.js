angular.module('ng-lightstreamer',[]).provider('lightstreamer',[function(){

	var lsClient;

	var configuration = {};

	return {
		setConfiguration:function(config){
			configuration = config;
		},
		$get:function(){
			lsClient = new Lightstreamer.LightstreamerClient(configuration.server,configuration.adapter);

			return {
				connect:function(){
					return lsClient.connect();
				}
			};
		}
	};
}]);