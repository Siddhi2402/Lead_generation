const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const leads = [];

// Home page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Lead Dashboard</title>
        <meta http-equiv="refresh" content="2">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          pre {
            background: #f4f4f4;
            padding: 10px;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        <h1>Generated Leads (${leads.length})</h1>
        <pre>${JSON.stringify(leads, null, 2)}</pre>
      </body>
    </html>
  `);
});

// API to view leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// Receive leads
app.post("/api/leads", (req, res) => {
  leads.unshift(req.body);

  // keep latest 100 leads only
  if (leads.length > 100) {
    leads.pop();
  }

  console.log(
    `Received Lead: ${req.body.UNIQUE_QUERY_ID}`
  );

  res.status(200).json({
    success: true,
    message: "Lead received",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});