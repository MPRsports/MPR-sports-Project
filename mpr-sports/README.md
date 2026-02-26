# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

**Start Dev Server**

- **Prerequisites:** Node.js 22.12+ or 20.19+ (recommended: Node 22).
- **Quick start:**

```bash
# Make sure Homebrew Node 22 is linked (if you installed via Homebrew)
brew link --force --overwrite node@22
export PATH="$(brew --prefix node@22)/bin:$PATH"
node -v

# Install project dependencies (clean install)
rm -rf node_modules package-lock.json
npm ci

# Start the Vite dev server
npm run dev

# Stop the server: Ctrl+C
```

- **Notes / Troubleshooting:**
  - If Vite prints a Node version error or you see `TypeError: crypto.hash is not a function`, upgrade to a supported Node release (22.12+ or 20.19+). Using Homebrew, `nvm`, or `fnm` to manage Node versions works well.
  - If Homebrew linkage fails, try:

```bash
brew unlink node@22 && brew link --force node@22
```

- If `npm ci` fails, run `npm install` instead.

**Run Local Worker (Python)**

- **Prerequisites:** Wrangler CLI (supports Python Workers) and Python Workers enabled for your account/environment.
- **Install Wrangler (global or dev dependency):**

```bash
# Global
npm install -g wrangler

# Or as a dev dependency
npm i -D wrangler
```

- **Worker config:** the worker config lives at `workers/api-py/wrangler.jsonc` and should set `"main": "worker.py"`.
- **Start the worker locally:**

```bash
cd workers/api-py
wrangler dev
```

Wrangler runs a local worker at a URL like `http://127.0.0.1:8787`.

- **Test the worker directly:**

```bash
curl http://127.0.0.1:8787/health
# should return: ok
```

- **Proxy from frontend:** the dev server proxy routes `/api` to the local worker (configured in `vite.config.ts`). With both servers running you can call the worker via the frontend at `http://localhost:5173/api/health`.

- **Common errors:**
  - `Python entrypoint "worker.py" does not export a handler named "on_fetch"`: ensure `worker.py` exports `async def on_fetch(request, env, ctx)`.
  - `WorkerEntrypoint.__init__() missing ... 'ctx' and 'env'`: ensure `on_fetch` passes `ctx` and `env` into your entrypoint, e.g. `entry = Default(ctx, env)`.
