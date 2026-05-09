import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ConsumerAnalysis from './pages/ConsumerAnalysis';
import ModelPerformance from './pages/ModelPerformance';
import ActiveAlerts from './pages/ActiveAlerts';
import AnomalyLogs from './pages/AnomalyLogs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analysis" element={<ConsumerAnalysis />} />
          <Route path="/model" element={<ModelPerformance />} />
          <Route path="/alerts" element={<ActiveAlerts />} />
          <Route path="/logs" element={<AnomalyLogs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
