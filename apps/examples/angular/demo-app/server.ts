import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    index: 'index.html',
    maxAge: '1y',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { baseUrl, headers, originalUrl, protocol } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        publicPath: browserDistFolder,
        url: `${protocol}://${headers.host}${originalUrl}`,
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
