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
  { label: "Dashboard", route: "#/dashboard" },
  { label: "Tasks", route: "#/tasks" },
  { label: "Habits", route: "#/habits" },
  { label: "Focus", route: "#/focus" },
  { label: "Insights", route: "#/insights" },
];

const Sidebar = ({ isCompact = false }) => {
  const [activeRoute, setActiveRoute] = useState(window.location.hash || "#/dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isCompact) {
      setIsExpanded(false);
    }
  }, [isCompact]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(window.location.hash || "#/dashboard");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const showLabels = !isCompact || isExpanded;

  const handleItemClick = (route) => {
    if (window.location.hash !== route) {
      window.location.hash = route;
    }
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
            <li key={item.route}>
              <button
                type="button"
                onClick={() => handleItemClick(item.route)}
                onMouseEnter={() => setHoveredItem(item.route)}
                onMouseLeave={() => setHoveredItem(null)}
                style={getSidebarItemStyles({
                  isActive: activeRoute === item.route,
                  isHovered: hoveredItem === item.route,
                  showLabels,
                })}
              >
                {showLabels ? item.label : item.label[0]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
