import GlobalProvider from "Provider/GlobalStyleProvider";
import RouterProvider from "Provider/RouterProvider";
import ToastProvider from "Provider/ToastProvider";

function App() {
  return (
    <>
      <GlobalProvider />
      <ToastProvider />
      <RouterProvider />
    </>
  );
}

export default App;
