describe("DashCommunicator.Receivers.FixedPositionReceiver", function() {
  var fixedPositionReceiver = function(selector, origin, _window) {
    if (_window === undefined) { _window = {}; };
    return new DashCommunicator.Receivers.FixedPositionReceiver(selector, origin, _window);
  };

  it("does nothing if the payload origin is not the same as the injected origin", function() {
    var topChangeSpy = spyOn(DashCommunicator.DomManipulator, 'addPixelsToTop');
    var payload = {
      origin: 'https://malicious-user.org',
      data:   JSON.stringify({})
    };

    fixedPositionReceiver('#test', 'http://example.com').handle(payload);

    expect(topChangeSpy).not.toHaveBeenCalled();
  });

  it("does not error if the event data is not parsable by JSON", function() {
    var topChangeSpy = spyOn(DashCommunicator.DomManipulator, 'addPixelsToTop');
    var payload = {
      origin: 'https://malicious-user.org',
      data:   "[Test]:Bad:Data"
    };

    fixedPositionReceiver('#test', 'http://example.com').handle(payload)
    expect(topChangeSpy).not.toHaveBeenCalled();
  });

  it("does nothing if the payload type isnt 'fixedPositionOffset'", function() {
    var topChangeSpy = spyOn(DashCommunicator.DomManipulator, 'addPixelsToTop');
    var payload = {
      origin: 'http://example.com',
      data:   JSON.stringify({})
    };

    fixedPositionReceiver('#test', 'http://example.com').handle(payload);

    expect(topChangeSpy).not.toHaveBeenCalled();
  });

  it("adds pixels to the top", function() {
    var topChangeSpy = spyOn(DashCommunicator.DomManipulator, 'addPixelsToTop');
    var payload = {
      origin: 'http://example.com',
      data:   JSON.stringify({ type: 'fixedPositionOffset', pixelsFromTop: 10})
    };
    var selector = '#test'
    fixedPositionReceiver(selector, 'http://example.com').handle(payload);

    expect(topChangeSpy).toHaveBeenCalledWith(selector, 10);
  });

  it("registers its handler", function() {
    var postMessageConnector = new DashCommunicator.PostMessageConnector({}, function(){});
    var postMessageConnectionSpy = spyOn(DashCommunicator, 'PostMessageConnector').andReturn(postMessageConnector);  
    var registerSpy = spyOn(postMessageConnector, 'register');
    
    var mockWindow = {};
    var receiver = fixedPositionReceiver('#test', 'http://example.com', mockWindow);
    receiver.register();

    expect(postMessageConnectionSpy).toHaveBeenCalledWith(mockWindow, receiver.handle);
    expect(registerSpy).toHaveBeenCalled();
  });

  it("deregisters its handler", function() {
    var postMessageConnector = new DashCommunicator.PostMessageConnector({}, function(){});
    var postMessageConnectionSpy = spyOn(DashCommunicator, 'PostMessageConnector').andReturn(postMessageConnector);  
    var deregisterSpy = spyOn(postMessageConnector, 'deregister');
    
    var mockWindow = {};
    var receiver = fixedPositionReceiver('#test', 'http://example.com', mockWindow);
    receiver.deregister();

    expect(postMessageConnectionSpy).toHaveBeenCalledWith(mockWindow, receiver.handle);
    expect(deregisterSpy).toHaveBeenCalled();
  });
});
