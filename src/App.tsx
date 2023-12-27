import GlobalProvider from "Provider/GlobalStyleProvider";
import RouterProvider from "Provider/RouterProvider";
import ToastProvider from "Provider/ToastProvider";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: "always",
    },
  },
});
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider />
        <ToastProvider />
        <RouterProvider />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
