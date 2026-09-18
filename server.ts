import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint: fetch PL sheet values from Google Sheets API
  app.get('/api/sheets/pl', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Falta el encabezado de autorización (token de Google).' });
      }

      const spreadsheetId = '1qmOvJqQ1YzREsO2pS18AAODuplAYE28pcJWcr-YC72A';
      const range = 'PL!A1:AR250';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueRenderOption=FORMATTED_VALUE`;

      console.log(`[Server] Fetching Google Sheets API: ${url}`);

      const googleRes = await fetch(url, {
        headers: {
          Authorization: authHeader,
        },
      });

      const data = await googleRes.json();

      if (!googleRes.ok) {
        console.error('[Server] Google Sheets API Error:', data);
        return res.status(googleRes.status).json({
          error: data.error?.message || 'Error al obtener datos de Google Sheets API.',
          details: data.error,
        });
      }

      return res.json(data);
    } catch (err: any) {
      console.error('[Server] Exception in /api/sheets/pl:', err);
      return res.status(500).json({ error: err.message || 'Error interno del servidor.' });
    }
  });

  // Vite middleware for development / static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
