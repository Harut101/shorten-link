import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const SignIn = lazy(() => import("./signIn/SignIn"));
const OauthRedirect = lazy(() => import("./oauthRedirect/OauthRedirect"));
const LinkEditor = lazy(() => import("./link-editor/LinkEditor"));

function Pages() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/redirect" element={<OauthRedirect />} />
                <Route path="/link-editor" element={<LinkEditor />} />
            </Routes>
        </Suspense>
    );
}

export default Pages;
