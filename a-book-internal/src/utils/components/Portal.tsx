import React from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};
const Portal = ({ children }: PortalProps) => {
  // const portalRoot = React.useMemo(
  //   () => document.getElementById("portal-root"),
  //   []
  // );

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
