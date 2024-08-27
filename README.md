# How to run

- Go to `/backend` and

  - `npm i`
  - `npm start`

- Go to `/client` and either
  - `node sync.js` for the sync version
  - or `node async.js` for the async one

## Want to see the difference in execution times between versions?

Then you can prepend `time` to each command to have the total time of execution and compare.

For instance, for the `async` version, you would use: `time node async.js` from the `client` folder and would get an output like:

`node client/async.js  0.35s user 0.07s system 7% cpu 5.895 total` where `total` is the total time we're after.
