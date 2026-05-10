import { ChevronRight } from 'lucide-react'

import { Button } from './button'
import { cn } from '../../lib/utils'

export function GetStartedButton({
  label = 'Saiba mais',
  onClick,
  className,
}: {
  label?: string
  onClick?: () => void
  className?: string
}) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      className={cn('group relative overflow-hidden pr-14', className)}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {label}
      </span>
      <i className="absolute bottom-1 right-1 top-1 z-10 grid w-12 place-items-center rounded-lg bg-white/20 text-white transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  )
}

