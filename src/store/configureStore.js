import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import createSagaMiddleware from 'redux-saga';
import filter from 'redux-storage-decorator-filter';
import reducers from '../reducers';
import sagas from '../sagas';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
});


export default function configureStore(onComplete,onError) {
    let engine = createEngine('JamlyAppTree');

    engine = filter(engine, [
        'whitelisted-key',
        ['auth', 'token'],
        ['auth', 'isAuthenticated'],
        ['auth', 'user']
    ], [
        'blacklisted-key',
        []
    ]);

    const storeMiddleware = storage.createMiddleware(engine);
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        storage.reducer(reducers), //Apply redux-storage so we can persist Redux state to disk
        compose(
            applyMiddleware(
                sagaMiddleware,
                storeMiddleware,
                logger
            )
        ),
    );

    // if (isDebuggingInChrome) {
    //   window.store = store;
    // }

    const load = storage.createLoader(engine);
     load(store)
        .then(onComplete)
        .catch(onError);

    sagaMiddleware.run(sagas);

   // const store = createStore(((state, action) => state), {}, {});

    return store;
}
