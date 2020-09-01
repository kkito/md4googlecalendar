// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`============= inited md4google calendar`);

class MD4Gcalendar {
  readonly markDownDivId = 'md4g_markdown';
  protected calledTimes = 0;
  protected initedMardownDiv = false;
  protected lastMarkdown = ``;

  public intervalCall() {
    this.calledTimes++;
    console.log(`interval called ${this.calledTimes}`);
    if (this.hasEditorInPage()) {
      const mdDiv = this.getMardDownDiv();
      console.log(`inited!!!`);
      const mdc = this.getMarkdownContent();
      if (mdc !== this.lastMarkdown) {
        this.lastMarkdown = mdc;
        this.updateMarkdown2Html(mdc);
      }
    }
  }

  public hasEditorInPage() {
    const ele = this.getOriginEditorEle();
    return !!ele;
  }

  public updateMarkdown2Html(markDown: string) {
    const converter = new showdown.Converter({
      strikethrough: true,
      tasklists: true,
      simpleLineBreaks: true,
      tables: true,
      disableForced4SpacesIndentedSublists: true,
    }),
      html = converter.makeHtml(markDown);
    console.log(markDown);
    console.log(html);
    this.getMardDownDiv()!.innerHTML = html;
  }

  protected getMarkdownContent() {
    const markDown = this.getOriginEditorEle()!.innerHTML;
    const regex = /(<([^>]+)>)/gi;
    return markDown.replace(regex, '\n');
  }

  protected getOriginEditorEle() {
    const matches = document.querySelectorAll('div[contenteditable="true"]');
    if (matches.length === 1) {
      return matches[0];
    } else {
      return null;
    }
  }

  protected getMardDownDiv() {
    if (!this.initedMardownDiv) {
      const div = document.createElement(`div`);
      div.setAttribute(`id`, this.markDownDivId);
      div.setAttribute(`class`, `markdown-body`);
      const editor = this.getOriginEditorEle();
      const rect = editor!.getBoundingClientRect();
      div.setAttribute(
        `style`,
        `position:absolute;top:${rect.top - 120 }px;left:${
          rect.left + rect.width + 20
        }px;`
      );
      div.innerHTML = `not inited!!!!`;
      document.getElementsByTagName(`body`)[0].appendChild(div);
      this.initedMardownDiv = true;
    }
    return document.getElementById(this.markDownDivId);
  }
}

const md4g = new MD4Gcalendar();

setInterval(() => {
  md4g.intervalCall();
}, 700);

console.log(`'Allo 'Allo! Content script 234`);
