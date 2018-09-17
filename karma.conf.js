module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js',
      'test/css/index.css',
      'tags/**/*',
      'test/spec/**/*'
    ],
    preprocessors: {
      'test/spec/**/*.js': ['browserify'],
      'tags/**/*.tag': ['webpack', 'coverage']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.tag$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'riotjs-loader',
                options: {
                  type: 'es6', // transpile the riot tags using babel
                  hot: true
                }
              }
            ]
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
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/'
      }, {
        type: 'text-summary'
      }],
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
      reporters: ['coverage', 'coveralls'],
      coverageReporter: {
        reporters: [{
          type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
          dir: 'coverage/'
        }],
      }
    }
    config.set(configuration);
  }
}