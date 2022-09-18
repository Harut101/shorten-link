import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const SignIn = lazy(() => import("./signIn/SignIn"));
const OauthRedirect = lazy(() => import("./oauthRedirect/OauthRedirect"));

function Pages() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/redirect" element={<OauthRedirect />} />
            </Routes>
        </Suspense>
    );
}

export default Pages;
