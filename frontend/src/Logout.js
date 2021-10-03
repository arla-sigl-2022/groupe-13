import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function Logout() {
  const { logout } = useAuth0();
  return (
    <a
      className="logout"
      onClick={() => {
        logout({ returnTo: document.location.origin });
      }}
    >
      Déconnexion
    </a>
  );
}
