namespace('DashCommunicator.Receivers');

(function() {
  'use strict';

DashCommunicator.Receivers.InfiniteScrollReceiver = function(callback, originToReceiveFrom, _window) {
  this._window = new DashCommunicator.WindowGetters.CurrentWindowGetter(_window).execute();

  this.hasScrolledToBottomOfPage = function(payload) {
    return payload.pixelsToTopFromCurrentLocation > DashCommunicator.DomManipulator.documentHeight(this._window) - payload.totalHeightOfWindow;
  };

  var _this = this;
  this.handle = function(event) {
    var payload = {};
    try { payload = JSON.parse(event.data); } catch(e) {}

    if (event.origin === originToReceiveFrom && payload.type === "infiniteScroll") {
      if (_this.hasScrolledToBottomOfPage(payload)) { callback(); }
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
