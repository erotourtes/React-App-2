import React from "react";

const PopupIcon = ({ icon }: { icon: React.ReactElement }) => {
  const copied = React.cloneElement(icon, {
    className: "mr-2 w-4 h-4",
  });
  return <>{copied}</>;
};

export { PopupIcon };
