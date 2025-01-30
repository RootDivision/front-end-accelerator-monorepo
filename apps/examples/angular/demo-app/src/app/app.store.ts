import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export const appInitialState = {
  products: {
    id: null as null | number,
  },
  ui: {
    container: { isActive: false },
    navbar: { isVisible: true },
    sidebar: { isOpen: true, isVisible: true },
    theme: '',
    title: '',
    topbar: { themeSwitcher: { isVisible: true } },
  },
};

export interface AppState {
  app: typeof appInitialState;
}

export const AppSignalStore = signalStore(
  { providedIn: 'root' },
  withState(appInitialState),
  withMethods((store) => ({
    setAppTitle(title: string) {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: { ...state.ui, title },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    setProductsId(id: null | number) {
      patchState(store, (state) => ({
        ...state,
        products: { ...state.products, id },
      }));
    },
    setTheme(theme: string) {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: { ...state.ui, theme },
        };
        document.documentElement.className = theme;
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    toggleContainer() {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: {
            ...state.ui,
            container: {
              ...state.ui.container,
              isActive: !state.ui.container.isActive,
            },
          },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    toggleNavbarVisibility() {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: {
            ...state.ui,
            navbar: {
              ...state.ui.navbar,
              isVisible: !state.ui.navbar.isVisible,
            },
          },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    toggleSidebarIsOpen() {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: {
            ...state.ui,
            sidebar: {
              ...state.ui.sidebar,
              isOpen: !state.ui.sidebar.isOpen,
            },
          },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    toggleSidebarVisibility() {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: {
            ...state.ui,
            sidebar: {
              ...state.ui.sidebar,
              isVisible: !state.ui.sidebar.isVisible,
            },
          },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
    toggleThemeSwitcherVisibility() {
      patchState(store, (state) => {
        const updatedState = {
          ...state,
          ui: {
            ...state.ui,
            topbar: {
              ...state.ui.topbar,
              themeSwitcher: {
                ...state.ui.topbar.themeSwitcher,
                isVisible: !state.ui.topbar.themeSwitcher.isVisible,
              },
            },
          },
        };
        localStorage.setItem('ui', JSON.stringify(updatedState.ui));

        return updatedState;
      });
    },
  })),
  withHooks({
    onInit(store) {
      effect(
        () => {
          if (typeof window === 'undefined') return;

          const ui = JSON.parse(
            window.localStorage.getItem('ui')!,
          ) as AppState['app']['ui'];
          const systemTheme = window.matchMedia('(prefers-color-scheme:dark)')
            .matches
            ? 'dark'
            : 'light';

          if (ui) {
            document.documentElement.className = ui.theme;
            patchState(store, (state) => ({ ...state, ui }));

            return;
          }

          document.documentElement.className = systemTheme;
          patchState(store, (state) => ({
            ...state,
            ui: { ...state.ui, theme: systemTheme },
          }));
        },
        { allowSignalWrites: true },
      );
    },
  }),
);
