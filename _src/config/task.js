// options -> /_app/gulpfile.babel.js/task/config.js

const START_PATH = `/`;
const FILE_NAME = ``;// default index.html

const ASSETS_PATH = `${START_PATH}assets/`

let meta = require(`./page.js`);

module.exports = {

  tasks: {
    styleguide: true,
    iconfont: true,
    mass_production: false,
  },

  /* common */
  common: {
    // lint: false,// true || gulp --lint
    // minify: false,// true || gulp --min
    delete: true,// false || gulp --del

    // convert: {
    //   linefeedcode: 'LF',// CRLF || LF || CR
    //   replace: [
    //     {from: '〜', to: '～'}
    //   ],
    //   find: ['dev', 'pre', 'test'],
    //   encode: {
    //     to: 'utf8'// https://github.com/ashtuchkin/iconv-lite#supported-encodings
    //   }
    // },

    options: {
      // development | production || none
      mode: 'none',
    },
  },

  /* serv @browserSync */
  serv: {
    options: {
      // port: 8080
      // notify: false,
      // open: 'local',// argv.no = false(ex: gulp watch --no)
      startPath: `${START_PATH}${FILE_NAME}`,
      // ghostMode: false,
      // server: {
      //   baseDir: define.path.dest
      // }
    }
  },

  /* html @pug */
  html: {
    path_type: 'absolute',// relative | absolute
    // ex: https://github.com/kangax/html-minifier/
    // minify_options: {},
    // ex: https://github.com/yaniswang/HTMLHint/wiki/Rules
    // lint_options: {},
    root_path: `${START_PATH}`//base absolute path
  },

  /* css @stylus */
  css: {
    // autoprefixer_options: {
    //   browsers: ['last 2 versions', '> 2%'],
    // },
    // ex: https://github.com/CSSLint/csslint/wiki/Rules
    // lint_options: {},
  },

  /* js @webpack */
  js: {
    // ex: https://github.com/mishoo/UglifyJS2#minify-options
    // minify_options: {},
    // ex: http://eslint.org/docs/rules/
    // lint_options: {},
    options: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          meta: {
            p: JSON.stringify(meta.p)
          }
        }),
        new licenseInfoWebpackPlugin({
          glob: '{LICENSE,license,License}*'
        })
      ]
    },
  },

  /* img @imagemin */
  img: {
    // plugins: [
    //   imageminPngquant({
    //     quality: [0.5, 1.0]
    //   }),
    //   imageminMozjpeg({
    //     quality: 85,
    //     progressive: true
    //   }),
    //   imageminGifsicle(),
    //   imageminOptipng(),
    //   imageminSvgo()
    // ],
    // options: {
    //   interlaced: true,
    //   verbose: true,
    //   progressive: true,
    //   optimizationLevel: 7
    // }
  },

  /* copy */
  copy: { // other filetype
  },

  /* delete */
  delete: { // all
  },

  /* styleguide */
  styleguide: {
    src: [`${define.path.config}tasks/styleguide/src/aigis_config.yml`],
  },

  /* iconfont */
  /* ../tasks/iconfont/src/uF001-hoge1.svg */
  /* ../tasks/iconfont/src/uF002-huga1.svg */
  iconfont: {
    src: [`${define.path.config}tasks/iconfont/**/*.svg`],
    dest: `${define.path.dest}${ASSETS_PATH}font/`,
    options: {
      startUnicode: 0xF001,
      fontName: 'icon1',
      normalize: true,
      fontHeight: 500,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
    }
  },

  /* mass_production */
  mass_production: {
    src: `${define.path.htdocs}_layouts/default.pug`,
    dest: define.path.dest,

    itemsfile: `${define.path.config}tasks/mass_production/src/items`,

    extension: '.html',

    options: {
      pretty: true
    },

    meta,

    assets_path: `${ASSETS_PATH}`,//base path
    htdocsdir: define.path.htdocs
  }
};

