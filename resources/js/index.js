import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import JapanOmiya from './components/JapanOmiya'
import { store } from './reducers/reducer'

let applicationStore = createStore(store);
let rootElement = document.getElementById('root');

// ⑤
ReactDOM.render(
    <Provider store={applicationStore}>
        <JapanOmiya />
    </Provider>,
    rootElement
)