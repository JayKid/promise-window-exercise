const express = require("express");
const app = express();
const port = 3000;

const secret =
  "This is the secret you are trying to retrieve that will unlock the door to Vault 76, if you can retrieve it completely that is :))";

app.get("/secret/:secretCharIndex", async (req, res) => {
  const { secretCharIndex } = req.params;
  if (secretCharIndex > 0 && secretCharIndex <= 130) {
    const shouldReturnCorrectPayload = Math.random() > 0.1;
    const shouldDelayResponse = Math.random() > 0.6;
    if (shouldDelayResponse) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return res.send(
      shouldReturnCorrectPayload ? secret[secretCharIndex - 1] : ""
    );
  }
  return res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
