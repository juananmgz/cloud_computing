import express, { Router } from "express";
import fetch from "node-fetch";

const drinksRouter: Router = express.Router();

drinksRouter.get("/drinks", async (req, res) => {
  const response = await fetch(`http://${process.env.DRINKS_ROUTE}:4000/drinks`);
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.get("/drinks/:id", async (req, res) => {
  const response = await fetch(`http://${process.env.DRINKS_ROUTE}:4000/drinks/${req.params.id}`);
  res.header("X-version", "1");
  res.send(await response.json());
});

drinksRouter.post("/drinks", async (req, res) => {
  const response = await fetch(
    `http://${process.env.DRINKS_ROUTE}:4000/drinks`,
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
    `http://${process.env.DRINKS_ROUTE}:4000/drinks/${req.params.id}`,
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
    `http://${process.env.DRINKS_ROUTE}:4000/drinks/admin/crack`,
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
    `http://${process.env.DRINKS_ROUTE}:4000/drinks/admin/resetPrices`,
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