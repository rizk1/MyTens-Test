import { Provider } from 'react-redux'
import reduxStore from '../redux/store'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}
