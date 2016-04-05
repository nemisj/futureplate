import React from 'react';

import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import serialize from 'serialize-javascript';
import routes from './routes';
import IndexStore from './stores/index';
import { getDependencies } from './utils/index';
import { FluxContext } from './utils/wrappers';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const HOT_MODULE_REPLACEMENT = DEVELOPMENT && process.env.HMR;

export default (req, res, next) => {
  const location = req.url;
  match({ routes, location }, (error, redirect, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);

    } else if (renderProps) {
      const store = new IndexStore();
      const dependencies = getDependencies(renderProps.routes,
                                           store,
                                           renderProps.params);
      Promise.all(dependencies)
        .then(() => {
          const content = renderToString((
            <FluxContext store={store}>
              <RouterContext {...renderProps} />
            </FluxContext>
          ));
          const data = serialize(store.serialize());
          res.render('index', {
            content,
            data,
            development: DEVELOPMENT,
            base: HOT_MODULE_REPLACEMENT ? 'http://localhost:8080' : '',
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send('Not found');
        });
    } else {
      console.log(location);
      res.status(404).send('Not found');
    }
  });
}
