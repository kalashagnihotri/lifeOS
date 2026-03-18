import { useState } from "react";
import {
  getSidebarStyles,
  getSidebarTitleStyles,
  getSidebarListStyles,
  getSidebarItemStyles,
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

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
    console.log(`Navigate to ${item}`);
  };

  return (
    <aside style={getSidebarStyles()}>
      <h2 style={getSidebarTitleStyles()}>LifeOS</h2>
      <nav>
        <ul style={getSidebarListStyles()}>
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
                })}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
