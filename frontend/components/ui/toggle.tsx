"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className={cn(
            "toggle toggle-primary", // change to toggle-success, toggle-error, etc. if you want
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };