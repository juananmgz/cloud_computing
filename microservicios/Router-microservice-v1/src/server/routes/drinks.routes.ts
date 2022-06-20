import express, { Router } from "express";
import fetch from "node-fetch";

const drinksRouter: Router = express.Router();

drinksRouter.get("/drinks", async (req, res) => {
  const response = await fetch("http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url);
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.get("/drinks/:id", async (req, res) => {
  const response = await fetch("http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url);
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.post("/drinks", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url,
    {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.delete("/drinks/:id", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url,
    {
      method: "delete",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.put("/drinks/admin/crack", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url,
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.put("/drinks/admin/resetPrices", async (req, res) => {
  const response = await fetch(
    "http://" + process.env.DRINKS_ROUTE + ":" + process.env.DRINKS_PORT + req.url,
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );
  res.header("X-version", "1");
  res.send(await response.json());
});


export default drinksRouter;