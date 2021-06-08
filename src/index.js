import React from 'react'
import ReactDOM from 'react-dom'
import App from "./ui/components/App"
import initUi from "./ui/initUi"

initUi()

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
)