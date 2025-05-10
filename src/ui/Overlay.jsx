import { useSidebar } from "../context/SidebarContext";

function Overlay() {
  const { openSettings, handleCloseSettingsAndSidebar } = useSidebar();

  return (
    <div
      onClick={handleCloseSettingsAndSidebar}
      className={`absolute w-full h-full inset-0 bg-black opacity-55 ${
        openSettings ? "z-50" : "z-20"
      }`}
    ></div>
  );
}

export default Overlay;
