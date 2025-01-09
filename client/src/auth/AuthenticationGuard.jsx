import { withAuthenticationRequired } from "@auth0/auth0-react";
import SpinnerLoading from "../utils/SpinnerLoading";
import React from "react";

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <SpinnerLoading />,
  });
  return <Component />;
};

export default AuthenticationGuard;
