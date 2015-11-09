angular.module('ng-lightstreamer',[]).provider('lightstreamer',[function(){

	var lsClient;

	var configuration = {};

	return {
		setConfiguration:function(config){
			configuration = config;
		},
		$get:[
			'$rootScope',
			function(
				$rootScope){
				lsClient = new Lightstreamer.LightstreamerClient(configuration.server,configuration.adapter);

				return {
					connect:function(){
						return lsClient.connect();
					},
					addStatusChangeListener:function(cb){
						lsClient.addListener({
							onStatusChange:function(status){
								$rootScope.$apply(cb(status));
							}
						});
					}
				};
			}
		]
	};
}]);