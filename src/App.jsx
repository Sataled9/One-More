import useAppController from "./logic/AppController";

function App() {
  const { CurrentPage, pageProps } = useAppController();

  return <CurrentPage {...pageProps} />

}

export default App;