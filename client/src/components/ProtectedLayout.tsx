/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedLayout() {
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(["current-user"]);
  const isValid = data && data.role === "admin";
  return isValid ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedLayout;
