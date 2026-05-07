import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-inner shadow-slate-900/5',
          'placeholder:text-slate-400',
          'focus-visible:border-drm-blue-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drm-yellow-500/55 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
