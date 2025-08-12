import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Helper to manually handle API routes during development
function apiPlugin() {
  return {
    name: 'api-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const path = req.url.split('?')[0];
          const apiPath = resolve(`./api${path.slice(4)}.js`);
          
          try {
            if (fs.existsSync(apiPath)) {
              // Import the API handler
              const { default: handler } = await import(apiPath);
              
              // Parse JSON body
              let body = {};
              if (req.method === 'POST') {
                const chunks = [];
                for await (const chunk of req) {
                  chunks.push(chunk);
                }
                const data = Buffer.concat(chunks).toString();
                try {
                  body = JSON.parse(data);
                } catch (e) {
                  console.error('Error parsing JSON body:', e);
                }
              }
              
              // Mock request/response objects
              const mockReq = {
                method: req.method,
                url: req.url,
                headers: req.headers,
                body,
              };
              
              const mockRes = {
                status: (code) => {
                  res.statusCode = code;
                  return mockRes;
                },
                json: (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return mockRes;
                },
                send: (data) => {
                  res.end(data);
                  return mockRes;
                },
                setHeader: (name, value) => {
                  res.setHeader(name, value);
                  return mockRes;
                },
              };
              
              // Call the handler
              await handler(mockReq, mockRes);
              return;
            }
          } catch (err) {
            console.error(`API Error (${path}):`, err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
          }
        }
        
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    open: true,
  },
  assetsInclude: ['**/*.json', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.mp4', '**/*.webp'],
});
