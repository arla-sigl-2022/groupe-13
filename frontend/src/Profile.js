import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Logout } from "./Logout";

export function Profile() {
  const { user } = useAuth0();
  const userMail = user ? user.email : "-";
  return (
    <div className="profile">
      <span>{userMail}</span>
      <Logout />
    </div>
  );
}
