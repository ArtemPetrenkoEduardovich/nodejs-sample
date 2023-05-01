const config = {
  port: 8888,
  address: 'localhost',
  consul: {
    server: {
      host: '127.0.0.1',
      port: '8500',
    },
    // how this service is going to provide info to consul
    service: {
      name: 'nodejs-sample',
      id: 'nodejs-sample',
      port: 8888,
      address: 'localhost',
      check: {
        http: 'http://localhost:8888/health',
        interval: '5s',
      },
    },
  },
  log4js: {
    appenders: {
      console: {
        type: 'console',
      },
      ms: {
        type: 'dateFile',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        filename: 'log/ms',
        maxLogSize: 1000000,
        compress: true,
      },
    },
    categories: {
      default: {
        appenders: ['ms', 'console'],
        level: 'debug',
      },
    },
  },
};

export default config;
