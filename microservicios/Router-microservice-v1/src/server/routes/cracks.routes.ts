import express, { Router } from "express";
import fetch from "node-fetch";

const cracksRouter: Router = express.Router();

cracksRouter.get("/cracks", async (req, res) => {
  const response = await fetch(`http://${process.env.CRACKS_ROUTE}:4001/cracks`);
  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.get("/cracks/:id", async (req, res) => {
  const response = await fetch(`http://${process.env.CRACKS_ROUTE}:4001/cracks/${req.params.id}`);
  res.header("X-version", "1");
  res.send(await response.json());
});

cracksRouter.post("/cracks", async (req, res) => {
  const response = await fetch(
    `http://${process.env.CRACKS_ROUTE}:4001/cracks`,
    {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const drinkUpdate = await fetch(
    `http://${process.env.DRINKS_ROUTE}:4000/drinks/admin/cracks`,
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
    `http://${process.env.CRACKS_ROUTE}:4001/cracks/${req.params.id}/end`,
    {
      method: "put",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const drinkUpdate = await fetch(
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

cracksRouter.delete("/cracks/:id", async (req, res) => {
  const response = await fetch(
    `http://${process.env.CRACKS_ROUTE}:4001/cracks/${req.params.id}`,
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
