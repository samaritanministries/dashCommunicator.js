namespace('DashCommunicator.Receivers');

(function() {
  'use strict';

DashCommunicator.Receivers.FixedPositionReceiver = function(selector, originToReceiveFrom, _window) {
  this._window = new DashCommunicator.WindowGetters.CurrentWindowGetter(_window).execute();

  this.handle = function(event) {
    var payload = {};
    try { payload = JSON.parse(event.data); } catch(e) {}

    if (event.origin === originToReceiveFrom && payload.type === "fixedPositionOffset") {
      var pixelsFromTop = parseFloat(payload.pixelsFromTop);
      DashCommunicator.DomManipulator.addPixelsToTop(selector, pixelsFromTop);
    }
  };

  this.postMessageConnector = new DashCommunicator.PostMessageConnector(this._window, this.handle);

  this.register = function() {
    this.postMessageConnector.register();
  };

  this.deregister = function() {
    this.postMessageConnector.deregister();
  };

};
}());
