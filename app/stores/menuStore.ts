// store/menuStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MenuState {
  isMenuOpen: boolean;
  searchQuery: string;
  cartItemCount: number;
  favoriteCount: number;
}

interface MenuActions {
  // Menu actions
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  // Search actions
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;

  // Cart actions
  addToCart: () => void;
  removeFromCart: () => void;
  setCartItemCount: (count: number) => void;

  // Favorites actions
  addToFavorites: () => void;
  removeFromFavorites: () => void;
  setFavoriteCount: (count: number) => void;

  // Reset all
  resetMenuState: () => void;
}

type MenuStore = MenuState & MenuActions;

export const useMenuStore = create<MenuStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      isMenuOpen: false,
      searchQuery: "",
      cartItemCount: 0,
      favoriteCount: 0,

      // Menu actions
      openMenu: () => set({ isMenuOpen: true }, false, "openMenu"),
      closeMenu: () => set({ isMenuOpen: false }, false, "closeMenu"),
      toggleMenu: () =>
        set(
          (state) => ({ isMenuOpen: !state.isMenuOpen }),
          false,
          "toggleMenu",
        ),

      // Search actions
      setSearchQuery: (query: string) =>
        set({ searchQuery: query }, false, "setSearchQuery"),
      clearSearch: () => set({ searchQuery: "" }, false, "clearSearch"),

      // Cart actions
      addToCart: () =>
        set(
          (state) => ({ cartItemCount: state.cartItemCount + 1 }),
          false,
          "addToCart",
        ),
      removeFromCart: () =>
        set(
          (state) => ({
            cartItemCount: Math.max(0, state.cartItemCount - 1),
          }),
          false,
          "removeFromCart",
        ),
      setCartItemCount: (count: number) =>
        set({ cartItemCount: Math.max(0, count) }, false, "setCartItemCount"),

      // Favorites actions
      addToFavorites: () =>
        set(
          (state) => ({ favoriteCount: state.favoriteCount + 1 }),
          false,
          "addToFavorites",
        ),
      removeFromFavorites: () =>
        set(
          (state) => ({
            favoriteCount: Math.max(0, state.favoriteCount - 1),
          }),
          false,
          "removeFromFavorites",
        ),
      setFavoriteCount: (count: number) =>
        set({ favoriteCount: Math.max(0, count) }, false, "setFavoriteCount"),

      // Reset all
      resetMenuState: () =>
        set(
          {
            isMenuOpen: false,
            searchQuery: "",
            cartItemCount: 0,
            favoriteCount: 0,
          },
          false,
          "resetMenuState",
        ),
    }),
    {
      name: "menu-store", // nama untuk DevTools
    },
  ),
);

// Individual selectors (lebih optimal untuk performance)
export const useMenuOpen = () => useMenuStore((state) => state.isMenuOpen);
export const useToggleMenu = () => useMenuStore((state) => state.toggleMenu);
export const useCloseMenu = () => useMenuStore((state) => state.closeMenu);
export const useOpenMenu = () => useMenuStore((state) => state.openMenu);

export const useCartCount = () => useMenuStore((state) => state.cartItemCount);
export const useAddToCart = () => useMenuStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useMenuStore((state) => state.removeFromCart);

export const useFavoriteCount = () =>
  useMenuStore((state) => state.favoriteCount);
export const useAddToFavorites = () =>
  useMenuStore((state) => state.addToFavorites);
export const useRemoveFromFavorites = () =>
  useMenuStore((state) => state.removeFromFavorites);

export const useSearchQuery = () => useMenuStore((state) => state.searchQuery);
export const useSetSearchQuery = () =>
  useMenuStore((state) => state.setSearchQuery);
export const useClearSearch = () => useMenuStore((state) => state.clearSearch);
