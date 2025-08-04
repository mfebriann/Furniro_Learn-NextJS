import { useEffect, useRef, useState } from "react";

interface UseClickOutsideReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

/**
 * Custom hook for handling click outside detection and menu state
 * @param initialState - Initial open/close state (default: false)
 * @param onClose - Optional callback when menu closes
 * @returns Object with ref, state, and control functions
 */
export const useClickOutside = (
  initialState: boolean = false,
  onClose?: () => void,
): UseClickOutsideReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  const open = () => setIsOpen(true);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return {
    ref,
    isOpen,
    toggle,
    close,
    open,
  };
};
