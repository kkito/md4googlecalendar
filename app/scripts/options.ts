// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Options3`);
let ele;
try {
  ele = document.getElementById('test');
  console.log(ele);
} catch (e) {
  console.log('err');
  console.log(e);
}
if (ele) {
  ele.addEventListener('click', () => {
    console.log('Popup DOM fully loaded and parsed');

    // function modifyDOM() {
    //     //You can play with your DOM here or check URL against your regex
    //     console.log('Tab script:');
    //     console.log(document.body);
    //     return document.body.innerHTML;
    // }

    // //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: 'alert(1);' // argument here is a string but function.toString() returns function's code
    }, (results) => {
        // Here we have just the innerHTML and not DOM structure
        console.log('Popup script:');
        console.log(results[0]);
    });
  });
}
