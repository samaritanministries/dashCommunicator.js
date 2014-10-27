describe("DashCommunicator.Sender", function() {                                                            
  var sender = function(_mockWindow) {
    return new DashCommunicator.Sender(_mockWindow);
  };

  var assertSetsWindowByDefault = function() {
    expect(sender().topWindow.top).toBeDefined();
  };

  it("gets the parent window if none is passed in", function() {
    assertSetsWindowByDefault();
  });

  it("sets the top window if passed in", function() {
    var mockWindow = {};
    expect(sender(mockWindow).topWindow).toEqual(mockWindow);
  });

  var assertScrollToPayloadSent = function(postMessageSpy, mockWindow) {
    sender(mockWindow).sendScrollToMessage(0, 'https://www.target-origin.com');
    expect(postMessageSpy).toHaveBeenCalledWith('{"type":"scrollTo","verticalPixelPoint":0}', 'https://www.target-origin.com');
  };

  it("sends scrollTo messages to the parent window", function() {
    var mockWindow = { postMessage: function() {} };
    assertScrollToPayloadSent(spyOn(mockWindow, 'postMessage'), mockWindow);
  });
});
