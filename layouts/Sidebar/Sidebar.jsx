import { useEffect, useState } from "react";
import {
  getSidebarBrandStyles,
  getSidebarHeaderStyles,
  getSidebarStyles,
  getSidebarListStyles,
  getSidebarItemStyles,
  getSidebarToggleStyles,
} from "./sidebar.styles";

const menuItems = [
  "Dashboard",
  "Tasks",
  "Habits",
  "Focus",
  "Notes",
  "Mood",
  "Analytics",
];

const Sidebar = ({ isCompact = false }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isCompact) {
      setIsExpanded(false);
    }
  }, [isCompact]);

  const showLabels = !isCompact || isExpanded;

  const handleItemClick = (item) => {
    setActiveItem(item);
    console.log(`Navigate to ${item}`);
  };

  return (
    <aside style={getSidebarStyles({ isCompact, isExpanded })}>
      <div style={getSidebarHeaderStyles()}>
        <h2 style={getSidebarBrandStyles({ showLabels })}>{showLabels ? "LifeOS" : "LO"}</h2>
        {isCompact ? (
          <button
            type="button"
            style={getSidebarToggleStyles({ isExpanded })}
            onClick={() => setIsExpanded((previousExpanded) => !previousExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        ) : null}
      </div>
      <nav>
        <ul style={getSidebarListStyles({ showLabels })}>
          {menuItems.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                style={getSidebarItemStyles({
                  isActive: activeItem === item,
                  isHovered: hoveredItem === item,
                  showLabels,
                })}
              >
                {showLabels ? item : item[0]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
