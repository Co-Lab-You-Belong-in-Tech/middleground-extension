chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "send-h1") {
    var h1 = document.querySelector("h1");
    if (h1 === null) {
      sendResponse({ message: "no-h1" });
      return;
    } else {
      var query = h1.innerText;
      sendResponse({ h1: query, message: "sending-h1" });
    }
  }
});
