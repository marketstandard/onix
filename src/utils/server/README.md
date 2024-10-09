Vercel introduced edge functions to run code for the server. This is powered by the V8 engine which typically runs in browsers which makes it faster and more lightweight. However, this means can be slightly counterintuitive in that you don't have access to anything related to Node, and the browser APIs actually run on the server. It is believed that these are faster and dont' suffer from the cold boot problem, but this needs to be confirmed.

The other option for Vercel APIs is serverless functions which use AWS Lambda functions with Node. The major pain point here is that Lambda functions suffer from cold boot which means that it can be slow to start up if a route hasn't been called recently.

Since we have these two options for APIs, we have broken the utils down into `edge` which are valid in the new edge functions (nothing can use native Node functionality), and `serverless` which work in the serverless functions (it can use native Node functionality but not browser APIs).

There are some libraries that have Node and browser capabilities, and in this case, you can use them in both the `edge` and `serverless` folders. However, some libraries are only for Node or only for the browser, and in this case, we need to understand this and use them appropriately.

**NOTE: This can cause challening bugs where you get a strange error from an edge route since it may try to use native Node functionality that doesn't exist. Vercel tries to detect this, but it's not always gauranteed.**

TODO: Get links
