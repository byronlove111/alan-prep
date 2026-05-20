import express from "express";

const app = express();

app.use(express.json());

// TODO: wire the claims summary controller here.

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const statusCode = typeof err?.statusCode === "number" ? err.statusCode : 500;
  const message = typeof err?.message === "string" ? err.message : "Internal server error";

  res.status(statusCode).json({ error: message });
});

export default app;
