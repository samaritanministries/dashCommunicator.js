namespace('DashCommunicator');

DashCommunicator.DomManipulator = {
  addPixelsToTop: function(selector, pixelsFromTop) {
    $(selector).animate({top: pixelsFromTop}, 30);
  },

  documentHeight: function(_window) {
    return $(_window.document).height();
  }
};
