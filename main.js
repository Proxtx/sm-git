import git from "simple-git";
import { exec } from "child_process";

export class Component {
  loopEnabled = true;

  constructor(service, config) {
    this.service = service;
    this.config = config;
    this.git = new git(this.service.config.path);
    if (this.config.loop) {
      this.gitLoop();
    }
  }

  gitLoop() {
    if (!this.loopEnabled) return;
    this.functions.pull();
    setTimeout(() => {
      this.gitLoop();
    }, 1000 * 60 * 5);
  }

  functions = {
    pull: async () => {
      let res = Boolean((await this.git.pull()).summary.changes);
      if (res) {
        if (this.config.additionalCommand)
          exec(this.config.additionalCommand, {
            cwd: this.service.config.path,
          });
        for (let component of this.service.components)
          if (component.name == "sm-process") {
            await component.import.functions.stop();
            await component.import.functions.start();
          }
      }

      return res;
    },
  };

  getData = () => {
    return {};
  };

  unload = () => {
    this.loopEnabled = false;
  };

  mainWidgets = ["main-widget"];

  configConfig = [
    {
      name: "additionalCommand",
      type: "text",
      value: "npm i",
    },
    {
      name: "loop",
      type: "bool",
      value: "true",
    },
  ];
}
