// src/App.tsx
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import theme from "./styles/theme";
import globalStyles from "./styles/globalStyles";
import router from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
