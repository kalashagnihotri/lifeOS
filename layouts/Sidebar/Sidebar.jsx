import { useEffect, useState } from "react";
import { Brain, CheckSquare, Notebook, LayoutDashboard, Timer } from "lucide-react";
import {
  getSidebarItemContentStyles,
  getSidebarIconWrapStyles,
  getSidebarLabelStyles,
  getSidebarSectionLabelStyles,
  getSidebarBrandStyles,
  getSidebarHeaderStyles,
  getSidebarStyles,
  getSidebarListStyles,
  getSidebarItemStyles,
  getSidebarToggleStyles,
} from "./sidebar.styles";

const menuItems = [
  { label: "Dashboard", route: "#/dashboard", icon: LayoutDashboard },
  { label: "Tasks", route: "#/tasks", icon: CheckSquare },
  { label: "Focus", route: "#/focus", icon: Timer },
  { label: "Notes", route: "#/notes", icon: Notebook },
  { label: "Insights", route: "#/insights", icon: Brain },
];

const Sidebar = ({ isCompact = false }) => {
  const [activeRoute, setActiveRoute] = useState(window.location.hash || "#/dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
      window.location.assign(route);
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
        {showLabels ? <p style={getSidebarSectionLabelStyles()}>Workspace</p> : null}
        <ul style={getSidebarListStyles({ showLabels })}>
          {menuItems.map((item) => (
            <li key={item.route}>
              <button
                type="button"
                onClick={() => handleItemClick(item.route)}
                onMouseEnter={() => setHoveredItem(item.route)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseDown={() => setPressedItem(item.route)}
                onMouseUp={() => setPressedItem(null)}
                onBlur={() => setPressedItem(null)}
                style={getSidebarItemStyles({
                  isActive: activeRoute === item.route,
                  isHovered: hoveredItem === item.route,
                  isPressed: pressedItem === item.route,
                  showLabels,
                })}
              >
                <span style={getSidebarItemContentStyles({ showLabels })}>
                  <span
                    style={getSidebarIconWrapStyles({
                      isActive: activeRoute === item.route,
                      isHovered: hoveredItem === item.route,
                    })}
                  >
                    <item.icon size={16} strokeWidth={2.2} />
                  </span>
                  {showLabels ? <span style={getSidebarLabelStyles()}>{item.label}</span> : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
