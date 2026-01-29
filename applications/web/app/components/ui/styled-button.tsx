import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 shadow-sm hover:shadow-md active:brightness-95 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-500/30",
        secondary:
          "bg-white/80 backdrop-blur-md border border-slate-200/70 text-slate-900 hover:bg-white hover:border-slate-300 hover:shadow-slate-300/40 dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:border-slate-600",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-slate-100",
        copy:
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/30",
        destructive:
          "bg-gradient-to-r from-rose-600 to-red-600 text-white hover:from-rose-700 hover:to-red-700 hover:shadow-red-500/30",
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