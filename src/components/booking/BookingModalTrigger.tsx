'use client';

import { ReactNode, useState } from 'react';

import Button from '@/components/ui/button/Button';

import BookingModal from './BookingModal';

type BookingModalTriggerProps = {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export default function BookingModalTrigger({
  className,
  children,
  ariaLabel,
}: BookingModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        className={className}
        aria-label={ariaLabel}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
