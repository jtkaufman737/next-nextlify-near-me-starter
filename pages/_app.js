import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // console.log("PAGEPROPS", pageProps)
  return <Component {...pageProps} />
}

export default MyApp
