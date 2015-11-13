# ng-lightstreamer

Angular [Lightstreamer](http://www.lightstreamer.com/) Client. Check [this](https://github.com/francesco-strazzullo/ng-lightstreamer-example) repository for an example.

## Examples

### Configuration

Just add your Lighstreamer server URL and adapter

```js
angular.module('ng-lightstreamer-example', [
    'ng-lightstreamer'
]).config(['lightstreamerProvider',function(lightstreamerProvider){
	lightstreamerProvider.setConfiguration({
		server:'http://push.lightstreamer.com',
		adapter:'DEMO'
	});
}]);
```

### Connection

After you configured your lighstreamer service, you just to need to use the ```connect``` method to start receiving data. You can also check the status of your connection with a listener.

```js
lightstreamer.addStatusChangeListener(function(status){
	$scope.status = status;
});

lightstreamer.connect();
```

### Subscription

To subscribe to data push you need to use the ```addSubscriber``` method.

```js
var options = {
	items:Items,
	fields:Fields,
	dataAdapter:"ADAPTER",
	onUpdate:function(updateInfo) {
	    console.log(updateInfo);
	}
};

lightstreamer.addSubscriber(options);
```