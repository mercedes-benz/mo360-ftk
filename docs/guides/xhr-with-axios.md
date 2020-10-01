# XHR with axios

[Axios](https://github.com/axios/axios) is an easy to use http request client.
Instead of developing and managing an own request client it is more reliable to use existing well-tested libraries like axios.

## How to use

You can install axios easily with:

```bash
// If you use yarn
yarn add axios

// If you use npm
npm install --save axios
```

After installation you can directly use it in your app.
For example using a simple GET request:

```ts
import axios from "axios";

// returns an promise

axios
  .get("http://some-address.de/get")
  .then(result => {
    // Do something with result
    console.log(result);
  })
  .catch(err => {
    // Process the error
    console.err(err);
  });

// or handle it via async/await

try {
  const result = await axios.get("http://some-address.de/get");
  console.log(result);
} catch (e) {
  // In case of failure
  console.err(e);
}
```

## More examples and documentation

For POST, PATCH, DELETE, Credential usage, etc please visit the official github page: https://github.com/axios/axios
