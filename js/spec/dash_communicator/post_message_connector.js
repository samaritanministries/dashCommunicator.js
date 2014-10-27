describe("DashCommunicator.PostMessageConnector", function() {                                                            
  var connector = function(_window, callback) {
    return new DashCommunicator.PostMessageConnector(_window, callback);
  };

  var assertMessageListenerForInternetExplorer = function(_window) {
    var callback = function(){};
    var eventListenerSpy = spyOn(_window, 'attachEvent');
    connector(_window, callback).register();
    expect(eventListenerSpy).toHaveBeenCalledWith('onmessage', callback);
  };

  var assertMessageListenerForOtherBrowsers = function(_window) {
    var callback = function(){};
    var eventListenerSpy = spyOn(_window, 'addEventListener');
    connector(_window, callback).register();
    expect(eventListenerSpy).toHaveBeenCalledWith('message', callback, false);
  };

  it("registers a callback if IE", function() {
    assertMessageListenerForInternetExplorer({attachEvent: function(){}});
  });

  it("registers a callback if not IE", function() {
    assertMessageListenerForOtherBrowsers({addEventListener: function(){}});
  });

  var assertMessageDeregisteredForInternetExplorer = function(_window) {
    var callback = function(){};
    var eventDeregisterSpy = spyOn(_window, 'removeEventListener');
    connector(_window, callback).deregister();
    expect(eventDeregisterSpy).toHaveBeenCalledWith('onmessage', callback);
  };

  var assertMessageDeregisteredForOtherBrowsers = function(_window) {
    var callback = function(){};
    var eventDeregisterSpy = spyOn(_window, 'removeEventListener');
    connector(_window, callback).deregister();
    expect(eventDeregisterSpy).toHaveBeenCalledWith('message', callback, false);
  };

  it("deregisters a callback if IE", function() {
    assertMessageDeregisteredForInternetExplorer({attachEvent: function(){}, removeEventListener: function(){}});
  });

  it("deregisters a callback if not IE", function() {
    assertMessageDeregisteredForOtherBrowsers({removeEventListener: function(){}});
  });
});
