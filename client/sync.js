// Sequential version
const secretLength = 130;
const serverUrlTemplate = "http://localhost:3000/secret/";

const getCharacter = async (url) => {
  const response = await fetch(url);
  const responseContents = await response.text();
  return responseContents;
};

// Sequential / sync version
const fetchSecretSync = async () => {
  let secret = [];

  for (let i = 1; i <= secretLength; ++i) {
    const url = `${serverUrlTemplate}${i}`;
    let character = "";
    while (character === "") {
      //   console.log("trying index", i);
      character = await getCharacter(url);
    }
    secret.push(character);
  }

  console.log("Secret found");
  console.log(secret.join(""));
};

// fetchSecretSync();
