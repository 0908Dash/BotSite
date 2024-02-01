const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 9000;

app.post('/deploy-commands', (req, res) => {
  // Execute the deploy-commands script using exec
  exec('node ./bot/deploy-commands.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing deploy-commands script: ${error.message}`);
      res.status(500).json({ error: error.message });
      return;
    }
    console.log(`deploy-commands script executed: ${stdout}`);
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
