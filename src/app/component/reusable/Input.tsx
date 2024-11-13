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
      <div className="w-[300px] ">
        <label
          htmlFor={name}
          className=" text-sm dark:text-gray-500 text-left capitalize "
        >
          {name}
        </label>
        <input
  autoComplete="off"
  className={cn(
    "flex h-10 w-[300px] p-3  items-center bg-transparent outline-none border-[1px] border-black dark:border-white rounded-lg transition duration-500 dark:hover:border-violet-500 dark:focus:border-violet-700 focus:border-violet-700 focus:outline-none cursor-text",className, `${error ? 'mb-0' : 'mb-2'}`
  )}
          name={name}
          type={type}
          ref={ref}
          {...props}
        />
        {error && (
          <label
            htmlFor="email"
            className="text-left text-red-500 text-xs leading-none"
          >
            {error}
          </label>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
