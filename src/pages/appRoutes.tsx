import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from 'layouts/common/rootLayout';
import OverviewPage from './Overview';
import DashboardPage from './Dashboard';
import ParkingMapPage from './ParkingMap';
import BookingsPage from './Bookings';
import AnalyticsPage from './Analytics';
import NotificationsPage from './Notifications';
import SettingsPage from './Settings';
import { APP_ROUTES } from 'constants/ApiConstants';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to={APP_ROUTES.OVERVIEW} replace />} />
        <Route path={APP_ROUTES.OVERVIEW} element={<OverviewPage />} />
        <Route path={APP_ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={APP_ROUTES.PARKING_MAP} element={<ParkingMapPage />} />
        <Route path={APP_ROUTES.BOOKINGS} element={<BookingsPage />} />
        <Route path={APP_ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={APP_ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={APP_ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
