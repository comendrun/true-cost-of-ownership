import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div className="m-auto flex w-full h-full">{children}</div>;
}
