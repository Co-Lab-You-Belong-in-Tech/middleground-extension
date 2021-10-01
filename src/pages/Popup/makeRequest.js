// import STOPWORDS from "./test.json";
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   //   if (request.message === 'no-h1') return sender;
//   console.log('here');
//   console.log(request.message);

//   makeRequest(request.query);

//   sendResponse({ message: 'Received h1' });
// });
// async function makingRequest() {
//   var tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//   console.log(tabs, "is the tabs");
//   chrome.tabs.sendMessage(
//     tabs[0].id,
//     {
//       message: "send-h1",
//     },
//     function (response) {
//       console.log(response, "is the received response.");
//       if (response.h1) {
//         var res = makeRequest(response.h1);
//       } else {
//         return [];
//       }
//     }
//   );

//   //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   //     chrome.tabs.sendMessage(
//   //       tabs[0].id,
//   //       { message: "send-h1" },
//   //       function (response) {

//   //       }
//   //     );
//   //   });
// }

// export default makeRequest;
