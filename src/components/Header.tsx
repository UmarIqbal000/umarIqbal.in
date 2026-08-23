import React from 'react';
import Scroll3DHero from './3d/Scroll3DHero';

interface HeaderProps {
  onViewProjects: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewProjects }) => {
  const handleExploreMore = () => {
    const tabElement = document.getElementById('tab-navigation-bar');
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Scroll3DHero
      onViewProjects={onViewProjects}
      onExploreMore={handleExploreMore}
    />
  );
};

export default Header;