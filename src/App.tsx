import GlobalProvider from "Provider/GlobalStyleProvider";
import RouterProvider from "Provider/RouterProvider";
import ToastProvider from "Provider/ToastProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider />
      <ToastProvider />
      <RouterProvider />
    </QueryClientProvider>
  );
}

export default App;
