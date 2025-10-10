import express from "express";
import client from "prom-client";

const app = express();

// Histogram สำหรับ REST API
export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

// Histogram สำหรับ Database
export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  client.collectDefaultMetrics({ timeout: 5000 });

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.send(await client.register.metrics());
  });

  app.listen(9091, "0.0.0.0", () => {
    console.log("Metrics server started at http://0.0.0.0:9091");
  });
}
