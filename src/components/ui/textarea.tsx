import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[96px] w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-inner shadow-slate-900/5',
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
Textarea.displayName = 'Textarea'

export { Textarea }
