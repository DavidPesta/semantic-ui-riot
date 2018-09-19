const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'test/css/index.css',
      'test/spec/rating/*'
    ],
    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'post',
            include: path.resolve('dist/tags/'),
            use: ['istanbul-instrumenter-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },

    },
    logLevel: config.LOG_ERROR,
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  })
  if (process.env.TRAVIS) {
    var configuration = {
      customLaunchers: {
        chromeTravisCi: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },
      browsers: ['chromeTravisCi'],
      reporters: ['coverage-istanbul', 'coveralls'],
      coverageIstanbulReporter: {
        reports: ['lcov'],
      },
    }
    config.set(configuration);
  }
}