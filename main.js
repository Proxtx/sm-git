import config from "@proxtx/config";
import git from "simple-git";

export class Component {
  constructor(service, config) {
    this.service = service;
    this.config = config;
    this.git = new git(this.service.config.path);
  }

  functions = {
    pull: async () => {
      await this.git.pull();
    },
  };

  getData = () => {
    return {
      host: config.smConfig.host,
      file: this.config.file,
      path: this.service.config.path,
    };
  };

  mainWidgets = ["main-widget"];

  configConfig = [
    {
      name: "additional commands",
      type: "text",
      value: "npm i",
    },
  ];
}
