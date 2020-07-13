# Redux Persist Swarm Storage Adapter

[Redux Persist](https://github.com/rt2zz/redux-persist) storage adapter for Swarm.
## Installation

`npm install --save redux-persist-swarm-storage`

You will also need fds.js: 
`npm install --save fds.js`


## Usage

### Browser


```js
import { persistStore, persistCombineReducers } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import FDS from 'fds.js'

const fds = new FDS()

const account = {
    address: "",
    privateKey: ""
}

const persistConfig = {
    key: "rppt",
    storage: new SwarmStorage(
        fds,
        account,
        {
            keyPrefix: "..."
        }
    )
}

const rootReducer = persistCombineReducers(persistConfig, reducers)

const store = createStore(rootReducer, undefined)

const persistor = persistStore(store, {})
```

## Development

### Running tests

`npm test`
