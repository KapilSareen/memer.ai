import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MemeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function MemeButton({ children, className, ...props }: MemeButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

