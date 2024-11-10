import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IncomeFlowchart from './IncomeFlowchart';
import ContainerSection from './ContainerSection';
import PrimaryHome from './PrimaryHome';
import ScoreCard from './ScoreCard';
import Summary from './Summary';
import Articles from './Articles';
import './UserDashboard.css';

const UserDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('My Plan');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const navigationItems = [
        { id: 'plan', label: 'My Plan', icon: 'dashboard' },
        { id: 'edit', label: 'Edit My Plan', icon: 'edit' },
        { id: 'assumptions', label: 'Assumptions', icon: 'assignment' },
        { id: 'income-tax', label: 'Income Tax Brackets', icon: 'account_balance' },
        { id: 'estate-tax', label: 'Estate Tax Brackets', icon: 'real_estate_agent' },
        { id: 'refer', label: 'Refer a Friend', icon: 'share' },
        { id: 'terms', label: 'Terms & Conditions', icon: 'gavel' },
        { id: 'disclaimer', label: 'Disclaimer', icon: 'info' }
    ];

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">
                        {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
                    </span>
                </button>
                
                <nav className="sidebar-nav">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.id}
                            to={`#${item.id}`}
                            className={`nav-item ${activeSection === item.label ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.label)}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="content-wrapper">
                    <header className="dashboard-header">
                        <h1>{activeSection}</h1>
                    </header>

                    <div className="dashboard-grid">
                        <div className="grid-item">
                            <IncomeFlowchart />
                        </div>

                        <div className="grid-item">
                            <ContainerSection />
                        </div>

                        <div className="grid-item">
                            <PrimaryHome />
                        </div>

                        <div className="grid-item">
                            <ScoreCard />
                        </div>

                        <div className="grid-item">
                            <Summary />
                        </div>

                        <div className="grid-item">
                            <Articles />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;