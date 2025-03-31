// src/App.tsx
import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import theme from "./styles/theme";
import globalStyles from "./styles/globalStyles";
import router from "./routes";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
