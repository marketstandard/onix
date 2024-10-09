The `utils` folder is our own internal library of functions.

The `client` folder is meant for functionality that will only ever be used on the client. It should not use private keys, and it is able to use browser APIs.

The `constants` folder holds constants that are used throughout the application. It is meant to be a single source of truth for all constants and can be used on the client and server.

The `mobile` is typically used for mobile-specific code, such as Ionic/Capacitor or React Native.

The `server` folder is meant for functionality that will only ever be used on the server. These are safe to use private keys and interact with the database.

The `shared` folder is for functionality that can be used on the client or server. This ensures we don't have to duplicate code between the two, and we will the way we calculate data output will be the exact same on the client and the server.
