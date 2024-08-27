const express = require("express");
const app = express();
const port = 3000;

const secret =
  "This is the secret you are trying to retrieve that will unlock the door to Vault 76, if you can retrieve it completely that is :))";

app.get("/secret/:secretCharIndex", (req, res) => {
  const { secretCharIndex } = req.params;
  if (secretCharIndex > 0 && secretCharIndex <= 130) {
    const randomness = Math.random() > 0.1;
    return res.send(randomness ? secret[secretCharIndex - 1] : "");
  }
  return res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
