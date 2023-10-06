import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import { store } from './store/store'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
