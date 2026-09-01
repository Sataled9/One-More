import useAppController from "./logic/useAppController";

function App() {
  const { CurrentPage, pageProps } = useAppController();

  return <CurrentPage {...pageProps} />

}

export default App;