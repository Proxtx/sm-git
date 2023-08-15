export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.button = this.document.getElementById("button");
    this.button.addEventListener("click", async () => {
      let res = await run("sm-git", "pull");
      if (!res) alert("Error pulling");
    });
  }

  setData(data) {
    this.data = data;
  }
}
