import config from "@proxtx/config";

export class Component {
  constructor(service, config) {
    this.service = service;
    this.config = config;
  }

  functions = {
    pull: async () => {},
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
      name: "file",
      type: "text",
      value: "config.json",
    },
  ];
}
