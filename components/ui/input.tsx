import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(
            "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <input
            type={type}
            // className={cn(
            //   "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            //   className,
            // )}
            className="h-full w-full border-none bg-transparent outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
          />
          {suffix ? <p className="text-xs font-semibold">{suffix}</p> : <></>}
        </div>
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
