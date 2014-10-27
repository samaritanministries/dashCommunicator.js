describe("DashCommunicator.Receivers.InfiniteScrollReceiver", function() {
  var infiniteScrollReceiver = function(selector, callback, origin, _window) {
    if (_window === undefined) { _window = {}; };
    return new DashCommunicator.Receivers.InfiniteScrollReceiver(selector, callback, origin, _window);
  };

  it("does nothing if the payload origin is not the same as the injected origin", function() {
    var isCalled = false;
    var callback = function() { isCalled = true };
    var payload = {
      origin: 'https://malicious-user.org',
      data:   JSON.stringify({})
    };

    infiniteScrollReceiver(callback, 'http://example.com').handle(payload);

    expect(isCalled).toBeFalsy();
  });

  it("does nothing if the payload type is not infiniteScroll", function() {
    var isCalled = false;
    var callback = function() { isCalled = true };
    var payload = {
      origin: 'http://example.com',
      data:   JSON.stringify({type: 'not-my-type'})
    };

    infiniteScrollReceiver(callback, 'http://example.com').handle(payload);

    expect(isCalled).toBeFalsy();
  });

  it("calls the callback if from the allowed origin and the type of infiniteScroll and we are at the bottom of the page", function() {
    var isCalled = false;
    var callback = function() { isCalled = true };
    var payload = {
      origin: 'http://example.com',
      data:   JSON.stringify({type: 'infiniteScroll', pixelsToTopFromCurrentLocation: 20, totalHeightOfWindow: 20})
    };

    spyOn(DashCommunicator.DomManipulator, 'documentHeight').andReturn(20);
    infiniteScrollReceiver(callback, 'http://example.com').handle(payload);

    expect(isCalled).toBeTruthy();
  });

  it("will not call the callback if not at the bottom of the page", function() {
    var isCalled = false;
    var callback = function() { isCalled = true };
    var payload = {
      origin: 'http://example.com',
      data:   JSON.stringify({type: 'infiniteScroll', pixelsToTopFromCurrentLocation: 20, totalHeightOfWindow: 20})
    };

    spyOn(DashCommunicator.DomManipulator, 'documentHeight').andReturn(200);
    infiniteScrollReceiver(callback, 'http://example.com').handle(payload);

    expect(isCalled).toBeFalsy();
  });

  it("registers its handler", function() {
    var postMessageConnector = new DashCommunicator.PostMessageConnector({}, function(){});
    var postMessageConnectionSpy = spyOn(DashCommunicator, 'PostMessageConnector').andReturn(postMessageConnector);  
    var registerSpy = spyOn(postMessageConnector, 'register');
    
    var mockWindow = {};
    var receiver = infiniteScrollReceiver(function(){}, 'http://example.com', mockWindow);
    receiver.register();

    expect(postMessageConnectionSpy).toHaveBeenCalledWith(mockWindow, receiver.handle);
    expect(registerSpy).toHaveBeenCalled();
  });

  it("deregisters its handler", function() {
    var postMessageConnector = new DashCommunicator.PostMessageConnector({}, function(){});
    var postMessageConnectionSpy = spyOn(DashCommunicator, 'PostMessageConnector').andReturn(postMessageConnector);  
    var deregisterSpy = spyOn(postMessageConnector, 'deregister');
    
    var mockWindow = {};
    var receiver = infiniteScrollReceiver(function(){}, 'http://example.com', mockWindow);
    receiver.deregister();

    expect(postMessageConnectionSpy).toHaveBeenCalledWith(mockWindow, receiver.handle);
    expect(deregisterSpy).toHaveBeenCalled();
  });

});
