import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold glassmorphism ring-offset-background transition-all duration-300 ease-out backdrop-blur-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:neon-glow disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:shadow-2xl hover:neon-glow",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98] hover:shadow-purple-500/25 ring-violet-500/30",
        ghost: "border-2 border-violet-200/50 bg-transparent/50 hover:bg-violet-50/80 hover:border-violet-400 hover:text-violet-700 hover:shadow-md hover:scale-[1.02] ring-violet-400/30",
        copy: "bg-gradient-to-r from-lime-500 to-emerald-500 text-white hover:from-lime-600 hover:to-emerald-600 hover:shadow-lime-500/50 border-transparent hover:scale-[1.05] shadow-xl ring-lime-400/30",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4",
        lg: "h-14 px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const StyledButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, children, disabled, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
)
StyledButton.displayName = "StyledButton"

export { StyledButton, buttonVariants }