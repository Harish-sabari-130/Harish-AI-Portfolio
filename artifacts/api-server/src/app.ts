import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resolve static assets path dynamically from possible filesystem layouts
const currentDir = import.meta.dirname || path.dirname(fileURLToPath(import.meta.url));
const possibleStaticPaths = [
  path.resolve(currentDir, "..", "..", "harish-portfolio", "dist", "public"),     // relative to dist/index.mjs
  path.resolve(currentDir, "..", "harish-portfolio", "dist", "public"),          // relative to src/app.ts
  path.resolve(process.cwd(), "artifacts", "harish-portfolio", "dist", "public"), // starting from root /app
  path.resolve(process.cwd(), "..", "harish-portfolio", "dist", "public"),        // starting from api-server dir
];

let staticPath = "";
for (const p of possibleStaticPaths) {
  if (fs.existsSync(p)) {
    staticPath = p;
    logger.info({ staticPath: p }, "Resolved frontend static assets path successfully");
    break;
  }
}

if (staticPath) {
  app.use(express.static(staticPath));
} else {
  logger.warn("Could not resolve frontend static assets path. Frontend will not be served statically.");
}

app.use("/api", router);

// Fallback to index.html for React SPA router
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  if (staticPath) {
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) {
        next();
      }
    });
  } else {
    res.status(404).send("Not Found");
  }
});

export default app;
