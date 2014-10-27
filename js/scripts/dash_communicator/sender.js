namespace('DashCommunicator');

(function() {
  'use strict';

DashCommunicator.Sender = function(_topWindow) {
  this.topWindow = new DashCommunicator.WindowGetters.TopWindowGetter(_topWindow).execute();

  this.sendScrollToMessage = function(verticalPixelPoint, targetOrigin) {
    var scrollToPayload = JSON.stringify({
      type: 'scrollTo',
      verticalPixelPoint: verticalPixelPoint
    });

    this.topWindow.postMessage(scrollToPayload, targetOrigin);
  };
};

}());
