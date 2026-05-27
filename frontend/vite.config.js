import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// custom plugin to serve /data/*.json files
function dataPlugin() {
  return {
    name: 'serve-data-json',
    configureServer(server) {
      server.middlewares.use('/data', (req, res, next) => {
        if (req.url.endsWith('.json')) {
          const filePath = path.resolve(__dirname, '..', 'data', req.url.slice(1));
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), dataPlugin()],
})
