import express from "express";
import nunjucks from "nunjucks";

import { MermaidGraph } from "./graph.js";
import { find_deps } from "./find_deps.js";

var app = express();
const PORT = 4200;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (_req, res) {
  const graph = find_deps("package.json", new MermaidGraph("flowchart TD", []));

  res.render("index.html", {
    graph: graph.toString(),
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
