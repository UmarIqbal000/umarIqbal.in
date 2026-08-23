import React from 'react';
import YashStyleScroller from './cyber/YashStyleScroller';

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
    <YashStyleScroller
      onViewProjectsTab={onViewProjects}
      onExploreTabs={handleExploreTabs}
    />
  );
};

export default Header;