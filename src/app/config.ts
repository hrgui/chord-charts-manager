let _config: any = {};

export function setConfig(config) {
  _config = { ...config };
}

export function getConfig() {
  return _config;
}
