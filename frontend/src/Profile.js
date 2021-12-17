import React from "react";
import { Logout } from "./Logout";

export function Profile() {
  return (
    <div className="profile">
      <span>anonymous@arla-sigl.fr</span>
      <Logout />
    </div>
  );
}
