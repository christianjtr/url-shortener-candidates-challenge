import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 shadow-md hover:shadow-lg active:brightness-95 active:scale-98 p-4 text-white",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 hover:bg-blue-600",
        secondary:
          "bg-white border border-blue-200 text-blue-900 hover:bg-blue-50",
        ghost:
          "bg-transparent text-blue-700 hover:bg-blue-100",
        copy:
          "bg-green-500 hover:bg-green-600",
        destructive:
          "bg-red-500 hover:bg-red-600",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 px-4 py-1.5 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        buttonVariants({ variant, size, fullWidth, className }),
        variant === "secondary" && "backdrop-blur-sm bg-white/75 dark:bg-slate-900/75"
      )}
      ref={ref}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
);

StyledButton.displayName = "StyledButton";

export { StyledButton, buttonVariants };