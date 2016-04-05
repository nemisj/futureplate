import React, { PropTypes, createClass} from 'react';
import serialize from 'serialize-javascript';

export default createClass({

  propTypes: {
    content: PropTypes.string,
    data: PropTypes.object,
    base: PropTypes.string
  },

  render() {
    let base = this.props.base;
    let appState = `window.data = ${serialize(this.props.data)}`;
    let content = this.props.content;
    let HMR = (base === '') !== true;

    return (
      <html lang='en'>
        <head>
          <title>FuturePlate</title>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

          <meta name='description' content='' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          { !HMR ? <link rel='stylesheet' type='text/css' href={`${base}/static/main.css`} /> : null }
        </head>

        <body>
          <div id='app' dangerouslySetInnerHTML={ {__html: content }} />
          <script dangerouslySetInnerHTML={ {__html: appState }} />

          <script src={`${base}/static/vendor.js`} defer={true} />
          <script src={`${base}/static/main.js`}  defer={true} />
        </body>

      </html>
    );
  }
});
