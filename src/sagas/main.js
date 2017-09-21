import { take, put, call, fork, select } from 'redux-saga/effects';
import { getToken } from '../reducers/selectors';
import {
    GET_SESSIONS,
    GET_FIRST_SESSIONS
} from '../actions/types';
import {
    getSessionsSuccess,
    getSessionsFailed
} from '../actions/MainActions';
import {
    getSessions
} from '../api';

function* watchSessionsRequest() {
    while (true) {
        const { excludeIds } = yield take(GET_SESSIONS);
        console.log(excludeIds);
        try {
            const payload = {
                n: 3,
                type: 'popular',
                excludeIds,
                token: yield select(getToken)
            };

            const response = yield call(getSessions, payload);

            if (response.status >= 200 && response.status < 300) {
                const data = yield response.json();

                yield put(getSessionsSuccess(data));
            } else {
                console.log('error in response');
                yield put(getSessionsFailed());
            }
        } catch (error) {
            yield put(getSessionsFailed());
        }
    }
}

function* watchFirstSessionsRequest() {
    while (true) {
        yield take(GET_FIRST_SESSIONS);

        try {
            const payload = {
                n: 5,
                type: 'popular',
                token: yield select(getToken)
            };

            const response = yield call(getSessions, payload);

            if (response.status >= 200 && response.status < 300) {
                const data = yield response.json();
                // // TODO: replace to local annonUser image
                console.log(data);
                yield put(getSessionsSuccess(data));
            } else {
                console.log('error in response');
                yield put(getSessionsFailed());
            }
        } catch (error) {
            yield put(getSessionsFailed());
        }
    }
}
export default function* root() {
    yield fork(watchSessionsRequest);
    yield fork(watchFirstSessionsRequest);
}
