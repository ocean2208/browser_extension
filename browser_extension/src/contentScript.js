console.log('checki 6666666');

function getText(){
    return document.body.innerText
}

// chrome.extension.onRequest.addListener(
//     function(request, sender, sendResponse) {
        
//         if(request.method == "getText"){
//             sendResponse({data: document.all[0].innerText, method: "getText"});
//         }
//     }
// );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('request :: 9696', request, request.method, request.method === "getText");
    if (request.method === "getText") {
      const textData = document.body.innerText;
    //   console.log('textData :: ', textData)
      try {
        console.log('sending data')
        sendResponse({ method: "getText", data: textData });
      } catch(error) {
        console.log('problem there:', error)
      }
    }
});
  

// chrome.runtime.sendMessage({ action: "getTabText" }, function(response) {
//     console.log('response 12343 :: ', response);
//     if (response && response.text) {
//       chrome.runtime.sendMessage({ action: "sendTabText", text: response.text });
//     }
// });
  