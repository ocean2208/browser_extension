// if (chrome.contextMenus.menuItemId == 'dictionary-extension') {
//     console.log('check 1');
//     chrome.contextMenus.remove('dictionary-extension', function() {
//         chrome.contextMenus.create({
//             id: "dictionary-extension",
//             title: "Get Meaning",
//             contexts: ["selection"]
//         });
//       });
// } else {
//     console.log('check 2');
//     chrome.contextMenus.create({
//         id: "dictionary-extension",
//         title: "Get Meaning",
//         contexts: ["selection"]
//     });
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // chrome.contextMenus.onClicked.addListener((info, tab) => {
  //   console.log('info, tab ::', info, tab);
  //   if (info.menuItemId === "dictionary-extension") {
  //     chrome.scripting.executeScript({
  //       target: { tabId: tab.id },
  //       function: openPopup(info.selectionText)
  //     });
  //   }
  // });

  // function getText(){
  //   return document.body.innerText
  // }

  // chrome.extension.onMessage.addListener(
  //   function(request, sender, sendResponse) {
  //       if(request.method == "getText"){
  //           sendResponse({data: document.all[0].innerText, method: "getText"});
  //       }
  //   }
  // );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log('checki 9999999');
// console.log('checkitt', chrome.runtime.sendNativeMessage('getTabText', {
//   action: "getTabText",
//   text: response.text
// }))
// try {
//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log('request :: 8888090', request);
//     if (request.action === "getTabText") {
//       chrome.tabs.executeScript(
//         { code: "document.body.innerText" },
//         function(result) {
//           sendResponse({ text: result[0] });
//         }
//       );
//       return true;
//     }
//   });
// } catch(error) {
//   console.log('problem everywhere:', error)
// }


  // function openPopup() {
  //   // chrome.action.setPopup({ popup: './index.html'  });
  //   chrome.action.openPopup();
  //   // chrome.action.searchWord(word);
  // }
  