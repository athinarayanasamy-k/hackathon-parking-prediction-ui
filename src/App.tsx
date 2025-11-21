import { ConfigProvider } from 'antd';
import { smartTheme } from 'constants/Themes';
import AppRoutes from 'pages/appRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <ConfigProvider theme={smartTheme}>
        <Router>
          <AppRoutes />
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
