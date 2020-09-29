const path = require('path');
const {
  version
} = require('./package.json');
const {
  generateAttributes,
  generateCSSReferences,
  generateJSReferences
} = require('mini-html-webpack-plugin');

module.exports = {
  title: `React Style-guide ${version}`,
  serverPort: 3000,
  usageMode: 'expand',
  theme: 'styleguide.theme.js',
  styles: 'styleguide.styles.js',
  template: ({
    css,
    js,
    publicPath,
    title,
    htmlAttributes,
    cssAttributes,
    jsAttributes
  }) => {
    const htmlAttrs = generateAttributes(htmlAttributes);

    const cssTags = generateCSSReferences({
      files: css,
      attributes: cssAttributes,
      publicPath
    });

    const jsTags = generateJSReferences({
      files: js,
      attributes: jsAttributes,
      publicPath
    });

    return `<!DOCTYPE html>
    <html${htmlAttrs}>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="https://use.typekit.net/lbp2sai.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">    
        <style type="text/css">
          /* Icons style overrides  */
          #Icon-container article { display: flex; flex-wrap: wrap; }
          #Icon-container article > div:first-child, #Icon-container article p { width: 100%; flex-basis: 100%; }
          #Icon-container article > div[class*='rsg--root'] { margin-right: 2rem; }
          #Icon-container article > div[class*='rsg--root'] [class*='rsg--preview'] { text-align: center; font-size: 1.5rem; }
          #Icon-container article > div[class*='rsg--root'] [class*='rsg--toolbar'] { display: none; }
          /* Codemirror overrides */
          .CodeMirror.CodeMirror.CodeMirror pre { padding: 0.25em }
        </style>
        ${cssTags}
      </head>
      <body>
        <div id="rsg-root"></div>
        ${jsTags}
      </body>
    </html>`;
  },
  sections: [{
    name: '',
    content: 'src/components/readme.md',
  },
  {
    name: 'Components',
    components: () => [
      path.resolve(__dirname, 'src/components/Button', 'index.tsx'),
    ],
  },
  ],
  getComponentPathLine(componentPath) {
    const dir = path.dirname(componentPath);
    const name = dir.split('/').slice(-1)[0];
    return `import ${name} from '${dir}';`;
  },
  exampleMode: 'expand',
};