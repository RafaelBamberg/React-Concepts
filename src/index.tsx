import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container!);
const HomeLazy = lazy(() => import("./pages/Home/Home"));
const CharactersLazy = lazy(() => import("./pages/Characters/Characters"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomeLazy />} />
            <Route path="/characters" element={<CharactersLazy />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
