namespace('DashCommunicator.WindowGetters');

(function() {
  'use strict';

DashCommunicator.WindowGetters.TopWindowGetter = function(_window) {
  this.execute = function() {
    if (_window === undefined) {
      return window.top;
    } else {
      return _window;
    }
  };
};

}());
