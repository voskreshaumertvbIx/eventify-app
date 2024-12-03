import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import classNames from "classnames";

const cn = classNames;

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: `
          bg-white text-black border border-black hover:bg-gray-100
          dark:bg-black dark:text-white dark:border-gray-500 dark:hover:bg-gray-800
        `,
        destructive: `
          bg-red-500 text-white hover:bg-red-600
          dark:bg-red-600 dark:text-white dark:hover:bg-red-700
        `,
        outline: `
          bg-transparent border border-black text-black hover:bg-gray-100
          dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-gray-800
        `,
        subtle: `
          bg-gray-100 text-black hover:bg-gray-200
          dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
        `,
        ghost: `
          bg-transparent text-black hover:bg-gray-100
          dark:bg-transparent dark:text-white dark:hover:bg-gray-800
        `,
        link: `
          text-blue-500 underline-offset-4 hover:underline
          dark:text-blue-400 dark:hover:text-blue-300
        `,
      },
      size: {
        default: "h-10 w-[200px] py-2 px-4",
        sm: "h-9 px-2 w-[150px] rounded-md",
        lg: "h-11 px-8 w-[300px[ rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
