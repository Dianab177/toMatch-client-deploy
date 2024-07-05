import Drawer from "../atome/drawer/Drawer";
import AtomHour from "../atome/header/AtomHour";
import AtomLogin from "../atome/header/AtomLogin";

function Layout({ children }) {
  return (
    <>
      <div className="flex justify-between w-full">
        <div>
          <Drawer />
        </div>
        <div>
          <div className="w-full h-20 flex justify-end">
            <AtomHour />
            <AtomLogin />
          </div>
          <div className="w-full mr-10">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
