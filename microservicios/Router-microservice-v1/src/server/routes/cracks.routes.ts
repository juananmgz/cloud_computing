import express, { Router } from "express";
import fetch from "node-fetch";

const cracksRouter: Router = express.Router();

cracksRouter.get("/cracks", async (req, res) => {
  const response = await fetch("http://" + process.env.CRACKS_ROUTE + ":" + process.env.CRACKS_PORT + req.url);
  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.get("/cracks/:id", async (req, res) => {
  const response = await fetch("http://" + process.env.CRACKS_ROUTE + ":" + process.env.CRACKS_PORT + req.url);
  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.post("/cracks", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.CRACKS_ROUTE + ":" + process.env.CRACKS_PORT + req.url,
    {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const drinkUpdate = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + "/drinks/admin/cracks",
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.put("/cracks/:id/end", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.CRACKS_ROUTE + ":" + process.env.CRACKS_PORT + req.url,
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const drinkUpdate = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + "/drinks/admin/resetPrices",
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.delete("/cracks/:id", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.CRACKS_ROUTE + ":" + process.env.CRACKS_PORT + req.url,
    {
      method: "delete",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  res.header("X-version", "1");
  res.send(await response.json());
});

export default cracksRouter;
