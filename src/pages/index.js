import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const SignIn = lazy(() => import("./signIn/SignIn"));
const LinkDashboard = lazy(() => import("./link-editor/LinkDashboard"));

function Pages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LinkDashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}

export default Pages;
