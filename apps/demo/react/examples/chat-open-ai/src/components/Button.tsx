import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

interface Props {
  [key: string]: unknown;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'icon';
  variant?: 'default' | 'ghost';
}

const buttonVariants = cva(
  'cw-inline-flex cw-items-center cw-justify-center cw-gap-2 cw-rounded-md cw-text-sm cw-font-medium cw-transition-colors disabled:cw-pointer-events-none disabled:cw-opacity-50 [&_svg]:cw-pointer-events-none [&_svg]:cw-size-4 [&_svg]:cw-shrink-0',
  {
    defaultVariants: {
      size: 'icon',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'cw-h-9 cw-px-4 cw-py-2',
        icon: 'cw-h-9 cw-w-9',
      },
      variant: {
        default:
          'cw-bg-primary cw-shadow hover:cw-bg-primary-hover dark:hover:cw-bg-primary-hover-dark',
        ghost: 'hover:cw-bg-primary',
      },
    },
  }
);

export function Button({
  children,
  className,
  size,
  variant,
  ...props
}: Props) {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    >
      {children}
    </button>
  );
}
