import express from 'express';
import _ from 'lodash';
import favicon from 'serve-favicon';

import renderer from './renderer.js';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HOT_MODULE_REPLACEMENT = DEVELOPMENT && process.env.HMR;

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.set('views', 'src/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/images/favicon.ico'));
app.use('/images', express.static(__dirname + '/images'));

// Mock API endpoints!
// TODO(dbow): Remove when API exists!
import mockApi from './mock-api';
app.use('/api', mockApi);

process.env.API_URL = process.env.API_URL || `http://127.0.0.1:${PORT}/api/`;

// Serve up /build directory statically when not doing hot module replacement.
if (!HOT_MODULE_REPLACEMENT) {
  app.use('/static', express.static('build/client'));
}

app.get('/*', renderer);

const server = app.listen(app.get('port'), function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

