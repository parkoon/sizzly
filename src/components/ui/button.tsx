import { IconLoader } from '@tabler/icons-react'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex select-none items-center justify-center whitespace-nowrap rounded font-medium leading-none transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white shadow',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm',
        ghost: '',
        outlined: 'border border-gray-300 bg-white text-gray-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded px-3 text-xs',
        lg: 'h-12 rounded px-8',
        icon: 'h-9 w-9',
      },
      danger: {
        true: 'border-danger-foreground bg-danger text-white',
      },
      loading: {
        true: 'pointer-events-none opacity-50',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, loading, danger, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, danger, className, block, loading }))}
        ref={ref}
        {...props}
      >
        {loading && <IconLoader className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
