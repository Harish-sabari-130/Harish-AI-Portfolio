import path from "node:path";
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

// Serve static assets from the frontend compiled dist folder
const staticPath = path.resolve(process.cwd(), "..", "harish-portfolio", "dist", "public");
app.use(express.static(staticPath));

app.use("/api", router);

// Fallback to index.html for React SPA router
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(staticPath, "index.html"), (err) => {
    if (err) {
      next();
    }
  });
});

export default app;
