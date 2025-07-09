import React from "react";

type ProtectedRouteProps = { children: React.ReactNode };

function ProtectedRoute({ children }: ProtectedRouteProps) {
    return <>{children}</>;
}

export default ProtectedRoute;