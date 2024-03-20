import React from "react";

const H3 = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <h3 className={`text-2xl font-semibold tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

const H4 = ({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) => {
  return <h4 className={`text-xl ${className}`}>{children}</h4>;
};

export { H3, H4 };
