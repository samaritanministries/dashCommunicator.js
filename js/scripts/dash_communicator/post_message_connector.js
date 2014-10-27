namespace('DashCommunicator.PostMessage');

(function() {
  'use strict';

DashCommunicator.PostMessageConnector = function(_window, callback) {
  this.isInternetExplorer = function() {
    return _window.attachEvent;
  };

  this.register = function() {
    if (this.isInternetExplorer()){
      _window.attachEvent('onmessage', callback);
    } else {
      _window.addEventListener('message', callback, false);
    }
  };

  this.deregister = function() {
    if (this.isInternetExplorer()){
      _window.removeEventListener('onmessage', callback);
    } else {
      _window.removeEventListener('message', callback, false);
    }
  };
};
}());
