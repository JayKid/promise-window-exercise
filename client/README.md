# Retrieve a secret string via a REST endpoint

## Specs

- URL pattern: `http://localhost:3000/<index>` where index is a number from 1 to 130
- Each of those URLs will return a character corresponding to the letter in that position in the secret.
- There is a 10% chance that the endpoint will fail to return the content of the response

## Requirements

- Do it simple
- Then, can you do it faster?
