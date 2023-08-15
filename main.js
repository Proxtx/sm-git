import git from "simple-git";
import { exec } from "child_process";

export class Component {
  constructor(service, config) {
    this.service = service;
    this.config = config;
    this.git = new git(this.service.config.path);
  }

  functions = {
    pull: async () => {
      let res = Boolean((await this.git.pull()).summary.changes);
      if (res && this.config.additionalCommand) {
        exec(this.config.additionalCommand, { cwd: this.service.config.path });
      }

      return res;
    },
  };

  getData = () => {
    return {};
  };

  mainWidgets = ["main-widget"];

  configConfig = [
    {
      name: "additionalCommand",
      type: "text",
      value: "npm i",
    },
  ];
}
