import { Route, Routes, Navigate } from 'react-router-dom';
import SideBar from '../component/SideBar';
import "./styles.scss";
import { routes, DEFAULT_ROUTE } from '../route/appRoute';

const MainApplayouts = () => {
  return (
    <div className="main-layouts">
      <SideBar />
      <div className="main-content">
        <Routes>
          {/* Redirect từ root path đến default route */}
          <Route path="/" element={<Navigate to={DEFAULT_ROUTE.path} replace />} />
          
          {/* Tạo các routes động từ cấu hình */}
          {routes.map((route) => (
            <Route 
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
          
          {/* Route not found */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainApplayouts;