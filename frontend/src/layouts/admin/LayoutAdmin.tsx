import { Outlet } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-[256px_1fr]">
        <SidebarAdmin />
        <div>
          <Outlet />
        </div>
      </div>
      <FooterAdmin />
    </div>
  );
}

export default LayoutAdmin;
