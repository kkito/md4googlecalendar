// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

chrome.runtime.onInstalled.addListener((details) => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'google' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

console.log(`'Allo 'Allo! Event Page4`);

