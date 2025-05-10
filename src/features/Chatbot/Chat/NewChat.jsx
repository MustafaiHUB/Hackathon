import { useEffect } from "react";
import { useSidebar } from "../../../context/SidebarContext";
import TextareaField from "../TextareaField/TextareaField";
import SpecialText from "../../../ui/SpecialText";
import { useSelector } from "react-redux";

function NewChat() {
  const { handleCloseSettings, closeSidebar } = useSidebar();
  const firstName = useSelector((state) => state.user.user.firstName);

  useEffect(
    function () {
      closeSidebar();
      handleCloseSettings();
    },
    [handleCloseSettings, closeSidebar]
  );

  return (
    <>
      <SpecialText>Hello, {firstName}</SpecialText>

      <TextareaField />
    </>
  );
}
export default NewChat;
