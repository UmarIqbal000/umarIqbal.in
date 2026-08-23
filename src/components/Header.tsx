import React from 'react';
import YashPortfolioScroller from './yash/YashPortfolioScroller';

interface HeaderProps {
  onViewProjects: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewProjects }) => {
  const handleExploreTabs = () => {
    const tabElement = document.getElementById('tab-navigation-bar');
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <YashPortfolioScroller
      onViewProjectsTab={onViewProjects}
      onExploreTabs={handleExploreTabs}
    />
  );
};

export default Header;