describe("DashCommunicator.WindowGetters.CurrentWindowGetter", function() {                                                            
  var getter = function(_window) {
    return new DashCommunicator.WindowGetters.CurrentWindowGetter(_window);
  };

  var assertSetsWindowByDefault = function() {
    expect(getter().execute().top).toBeDefined();
  };

  var assertOverridesWindow = function(_window) {
    expect(getter(_window).execute()).toEqual(_window);
  };

  it("gets the window if none is passed in", function() {
    assertSetsWindowByDefault()
  });

  it("sets the window if passed in", function() {
    var mockWindow = {};
    assertOverridesWindow(mockWindow);
  });
});
