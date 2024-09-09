import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Procesos from './pages/Procesos';  
import Dashboard from './pages/Dashboard'; 
import AcceptTaskPage from './pages/taskPages/AcceptTaskPage'; // Add these components for the static pages
import RejectTaskPage from './pages/taskPages/RejectTaskPage';
import RequestChangesPage from './pages/taskPages/RequestChangesPage';

function App() {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <Router>
            <div>
                <Navbar />
                <div className="content">
                <Routes>
                    <Route 
                        path="/procesos" 
                        element={<Procesos selectedTask={selectedTask} setSelectedTask={setSelectedTask} />} 
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Procesos selectedTask={selectedTask} setSelectedTask={setSelectedTask} />} />
                    <Route path="/complete-task/accept/:taskId" element={<AcceptTaskPage />} />
                    <Route path="/complete-task/reject/:taskId" element={<RejectTaskPage />} />
                    <Route path="/complete-task/request-changes/:taskId" element={<RequestChangesPage />} />
                </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
