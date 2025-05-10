import { createContext, useCallback, useContext, useState } from "react";

const sidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
    setOpenAccountMenu(false);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setOpenSettings(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setOpenSettings(false);
  }, []);
  const handleCloseSettingsAndSidebar = useCallback(() => {
    setOpenSettings(false);
    setIsOpen(false);
    setOpenAccountMenu(false);
  }, []);

  function handleOpenAccountMenu() {
    setOpenAccountMenu((prev) => !prev);
  }

  return (
    <sidebarContext.Provider
      value={{
        isOpen,
        openSettings,
        openAccountMenu,
        openSidebar,
        closeSidebar,
        handleOpenSettings,
        handleCloseSettings,
        handleOpenAccountMenu,
        handleCloseSettingsAndSidebar,
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(sidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

export { SidebarProvider, useSidebar };
