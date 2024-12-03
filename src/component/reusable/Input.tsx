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
            "flex h-10 w-[300px] cursor-text items-center rounded-lg border-[1px] border-black bg-transparent p-3 outline-none transition duration-500 focus:border-violet-700 focus:outline-none dark:border-white dark:hover:border-violet-500 dark:focus:border-violet-700",
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
