import * as React from "react";
import classNames from "classnames";

const cn = classNames;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-[300px]">
        <label
          htmlFor={name}
          className="text-left text-sm capitalize dark:text-gray-500"
        >
          {name}
        </label>
        <input
          autoComplete="off"
          className={cn(
            "main-input",
            className,
            `${error ? "mb-0" : "mb-2"}`,
          )}
          name={name}
          type={type}
          ref={ref}
          {...props}
        />
        {error && (
          <label
            htmlFor="email"
            className="text-left text-xs leading-none text-red-500"
          >
            {error}
          </label>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
