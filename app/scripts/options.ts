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

function updateMarkdown2Html(markDown: string): boolean {
  const regex = /(<([^>]+)>)/ig;
  markDown = markDown.replace(regex, '\n');

  const converter = new showdown.Converter(),
  html      = converter.makeHtml(markDown);
  console.log(markDown);
  console.log(html);
  const ele = document.getElementById('markdown');
  if (ele) {
    ele.innerHTML = html;
    return true;
  } else {
    return false;
  }
}

const execFun = function() {
  const matches = document.querySelectorAll('div[contenteditable="true"]');
  if (matches.length === 1) {
    return matches[0].innerHTML;
  } else {
    return '';
  }
};

function execMarkdown() {
  chrome.tabs.executeScript(
    {
      code: `(${execFun.toString()})()`,
    },
    (results) => {
      // Here we have just the innerHTML and not DOM structure
      console.log('Popup script:');
      if (results.length === 1) {
        updateMarkdown2Html(results[0]);
      }
    }
  );
}

setTimeout(execMarkdown, 100);

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
    execMarkdown();
  });
}
