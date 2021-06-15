import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { store } from './app/store';
import { Provider } from 'react-redux';
import MapScene from './ui/components/MapScene';

ReactDOM.render(
    <Provider store={store}>
      <MapScene />
    </Provider>,
    document.getElementById('root')
)