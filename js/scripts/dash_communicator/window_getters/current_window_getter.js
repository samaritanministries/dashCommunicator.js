namespace('DashCommunicator.WindowGetters');

(function() {
  'use strict';

DashCommunicator.WindowGetters.CurrentWindowGetter = function(_window) {
  this.execute = function() {
    if (_window === undefined) {
      return window;
    } else {
      return _window;
    }
  };
};

}());
