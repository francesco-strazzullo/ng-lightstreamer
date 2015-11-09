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
					},
					addSubscriber:function(options){
						options = options || {};

						options.subscriptionMode = options.subscriptionMode || "MERGE";
						options.items = options.items || [];
						options.fields = options.fields || [];

						var subscription = new Lightstreamer.Subscription(options.subscriptionMode,options.items,options.fields);

						subscription.setDataAdapter(options.dataAdapter);
						if(options.requestedSnapshot){
							subscription.setRequestedSnapshot("yes");
						}

						subscription.addListener({
      						onItemUpdate:function(updateInfo){
      							var cb = options.onUpdate || angular.noop;
      							$rootScope.$apply(cb(_.slice(updateInfo.Sd,2)));
      						}
      					});

      					lsClient.subscribe(subscription);

					}
				};
			}
		]
	};
}]);