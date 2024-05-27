import React, { useContext } from "react";
import routesConfig from "../../routesConfig";
import { Link, useRoutes } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import RequireActivate from "../../components/Auth/RequireActivate";
import RequireAuth from "../../components/Auth/RequireAuth";
import "./Sitemap.css";

const flattenRoutes = (routes, parentPath = '') => {
	return routes.flatMap(route => {
	  if (route.element.type === RequireAuth || route.element.type === RequireActivate) {
		return route.children ? flattenRoutes(route.children, parentPath) : [];
	  }
	  const fullPath = `${parentPath}${route.path}`.replace(/\/+/g, '/'); // Normalize the path
	  const children = route.children ? flattenRoutes(route.children, fullPath) : [];
	  return [{ path: fullPath, name: route.name || fullPath }, ...children];
	});
  };

const Sitemap = () => {
	const { isDarkMode } = useContext(ThemeContext);
	const flattenedRoutes = flattenRoutes(routesConfig);
	return (
		<section
			aria-label="sitemap"
			className="text-greeli-emphasis bg-greeli-subtle d-flex flex-column p-5 gap-2"
			data-bs-theme={isDarkMode ? "dark" : "light"}
		>
    <div>
      <h1>Sitemap</h1>
      <ul>
        {flattenedRoutes.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
		</section>
	);
};

export default Sitemap;