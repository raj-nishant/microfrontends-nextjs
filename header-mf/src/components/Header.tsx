import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NavbarMenu: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("username");
      setUser(username);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("username");
      localStorage.removeItem("posts");
      window.location.reload();
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.navLeft}>
            Dashboard
            {user && <span className={styles.welcomeText}>Welcome {user}</span>}
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout & Clear
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;
