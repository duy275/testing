import "./style.scss"
import logo from '../../../public/f78eed01cc7ed0b31e02a98cabaa3221.jpg'
import user_avatar from '../../../public/user-avatar.jpg'
import logout from '../../../public/logout-svgrepo-com.svg'
import { useRouteNavigation } from "../../variables/hooks/hooks";

const SideBar = () => {
  const { activePage, navigateTo, routes } = useRouteNavigation();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sidebar-menu">
          {routes.map((route, index) => (
            <div 
              key={index} 
              className={`sidebar-menu-item ${activePage === route.key ? 'active' : ''}`}
              onClick={() => navigateTo(route.key)}
            >
              <img src={route.icon} alt={`${route.key} icon`} />
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-avatar">
          <img src={user_avatar} alt="User Avatar" />
        </div>
        <div className="sidebar-footer-logout">
          <img src={logout} alt="Logout" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;