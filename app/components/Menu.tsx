"use client";

import { useEffect, useRef, useCallback } from "react";
import MenuItem from "./MenuItem";
import {
  useMenuOpen,
  useToggleMenu,
  useCloseMenu,
  useCartCount,
  useFavoriteCount,
} from "@/app/stores/menuStore";
import IconHeader from "./IconHeader";

const Menu = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Ambil state dan actions dari store menggunakan individual selectors
  const isMenuOpen = useMenuOpen();
  const toggleMenu = useToggleMenu();
  const closeMenu = useCloseMenu();
  const cartItemCount = useCartCount();
  const favoriteCount = useFavoriteCount();

  // Memoize event handlers untuk mencegah re-creation
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    },
    [closeMenu],
  );

  // Handle click outside dan escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isMenuOpen, handleClickOutside, handleEscapeKey]);

  return (
    <div>
      <div className="flex items-center gap-x-4 sm:gap-x-11">
        {/* User Profile Icon */}
        <IconHeader className="hidden sm:block">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12V7H22V13H20M20 17H22V15H20M10 13C12.67 13 18 14.34 18 17V20H2V17C2 14.34 7.33 13 10 13ZM10 4C11.0609 4 12.0783 4.42143 12.8284 5.17157C13.5786 5.92172 14 6.93913 14 8C14 9.06087 13.5786 10.0783 12.8284 10.8284C12.0783 11.5786 11.0609 12 10 12C8.93913 12 7.92172 11.5786 7.17157 10.8284C6.42143 10.0783 6 9.06087 6 8C6 6.93913 6.42143 5.92172 7.17157 5.17157C7.92172 4.42143 8.93913 4 10 4M10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H16.1V17C16.1 16.36 12.97 14.9 10 14.9M10 5.9C9.44305 5.9 8.9089 6.12125 8.51508 6.51508C8.12125 6.9089 7.9 7.44305 7.9 8C7.9 8.55695 8.12125 9.0911 8.51508 9.48492C8.9089 9.87875 9.44305 10.1 10 10.1C10.557 10.1 11.0911 9.87875 11.4849 9.48492C11.8788 9.0911 12.1 8.55695 12.1 8C12.1 7.44305 11.8788 6.9089 11.4849 6.51508C11.0911 6.12125 10.557 5.9 10 5.9V5.9Z"
              fill="#302E2E"
            />
          </svg>
        </IconHeader>

        {/* Search Icon */}
        <IconHeader>
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5 24.5L19.2663 19.257M22.1666 12.25C22.1666 14.88 21.1219 17.4024 19.2621 19.2621C17.4024 21.1219 14.88 22.1666 12.25 22.1666C9.61992 22.1666 7.09757 21.1219 5.23784 19.2621C3.3781 17.4024 2.33331 14.88 2.33331 12.25C2.33331 9.61992 3.3781 7.09757 5.23784 5.23784C7.09757 3.3781 9.61992 2.33331 12.25 2.33331C14.88 2.33331 17.4024 3.3781 19.2621 5.23784C21.1219 7.09757 22.1666 9.61992 22.1666 12.25V12.25Z"
              stroke="#302E2E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </IconHeader>

        {/* Favorites Icon with Counter */}
        <IconHeader className="relative">
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.16668 3.5C4.94551 3.5 2.33334 6.08533 2.33334 9.275C2.33334 11.8498 3.35418 17.9608 13.4027 24.1383C13.5827 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6667 11.8498 25.6667 9.275C25.6667 6.08533 23.0545 3.5 19.8333 3.5C16.6122 3.5 14 7 14 7C14 7 11.3878 3.5 8.16668 3.5Z"
              stroke="#302E2E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {favoriteCount > 99 ? "99+" : favoriteCount}
            </span>
          )}
        </IconHeader>

        {/* Cart Icon with Counter */}
        <IconHeader className="relative">
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.2355 19.1926H8.95234L9.76991 17.5273L23.3543 17.5027C23.8137 17.5027 24.2074 17.1746 24.2894 16.7207L26.1707 6.19062C26.2199 5.91445 26.1461 5.63008 25.9656 5.41406C25.8764 5.30775 25.7652 5.22211 25.6396 5.16309C25.514 5.10407 25.377 5.07308 25.2383 5.07227L7.95702 5.01484L7.80937 4.32031C7.7164 3.87734 7.31718 3.55469 6.86328 3.55469H2.63867C2.38267 3.55469 2.13716 3.65638 1.95614 3.8374C1.77513 4.01841 1.67343 4.26393 1.67343 4.51992C1.67343 4.77592 1.77513 5.02143 1.95614 5.20245C2.13716 5.38346 2.38267 5.48516 2.63867 5.48516H6.08124L6.72656 8.55312L8.31523 16.2449L6.26992 19.5836C6.1637 19.727 6.09972 19.8972 6.08523 20.075C6.07073 20.2528 6.10629 20.4312 6.18788 20.5898C6.35195 20.9152 6.68281 21.1203 7.04921 21.1203H8.7664C8.40032 21.6065 8.20258 22.1988 8.20312 22.8074C8.20312 24.3551 9.46093 25.6129 11.0086 25.6129C12.5562 25.6129 13.8141 24.3551 13.8141 22.8074C13.8141 22.1977 13.6117 21.6043 13.2508 21.1203H17.6559C17.2898 21.6065 17.092 22.1988 17.0926 22.8074C17.0926 24.3551 18.3504 25.6129 19.898 25.6129C21.4457 25.6129 22.7035 24.3551 22.7035 22.8074C22.7035 22.1977 22.5012 21.6043 22.1402 21.1203H25.2383C25.7687 21.1203 26.2035 20.6883 26.2035 20.1551C26.2019 19.8994 26.0993 19.6546 25.9179 19.4743C25.7366 19.294 25.4913 19.1927 25.2355 19.1926ZM8.35898 6.91797L24.1035 6.96992L22.5613 15.6051L10.1937 15.627L8.35898 6.91797ZM11.0086 23.6715C10.5328 23.6715 10.1445 23.2832 10.1445 22.8074C10.1445 22.3316 10.5328 21.9434 11.0086 21.9434C11.4844 21.9434 11.8726 22.3316 11.8726 22.8074C11.8726 23.0366 11.7816 23.2564 11.6196 23.4184C11.4575 23.5805 11.2378 23.6715 11.0086 23.6715ZM19.898 23.6715C19.4223 23.6715 19.034 23.2832 19.034 22.8074C19.034 22.3316 19.4223 21.9434 19.898 21.9434C20.3738 21.9434 20.7621 22.3316 20.7621 22.8074C20.7621 23.0366 20.6711 23.2564 20.509 23.4184C20.347 23.5805 20.1272 23.6715 19.898 23.6715Z"
              fill="#302E2E"
            />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          )}
        </IconHeader>
      </div>

      {/* Floating Menu Button */}
      <div
        className="fixed right-3 bottom-5 flex flex-col items-end gap-y-5"
        ref={menuRef}
      >
        <MenuItem isMenuOpen={isMenuOpen} />
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-white">
          <button
            type="button"
            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          />
          <svg
            width="32"
            height="20"
            viewBox="0 0 32 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="1"
              width="28"
              height="5"
              rx="3.2"
              fill="#302E2E"
              className={`origin-center transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "-translate-x-1 translate-y-[6px] rotate-45"
                  : "translate-0 rotate-0"
              }`}
            />
            <rect
              x="2"
              y="12"
              width="28"
              height="5"
              rx="3.2"
              fill="#302E2E"
              className={`origin-center transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "-translate-[2.5px] -translate-y-1 -rotate-45"
                  : "translate-x-0 translate-y-0 rotate-0"
              }`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Menu;
