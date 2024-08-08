import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = "Guest";

  const sort = (criteria) => {
    // Sorting logic based on the criteria
    console.log(`Sorting by ${criteria}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className="flex items-center">
            <span className={styles.link}>Dashboard</span>
            <span className={styles.link}>Welcome {user}</span>
          </div>
          <div className="flex items-center">
            <div className={styles.relativeContainer}>
              <button
                type="button"
                className={styles.dropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sort By
              </button>
              {isDropdownOpen && (
                <div
                  className={styles.dropdownMenu}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <button
                      className={styles.dropdownMenuItem}
                      role="menuitem"
                      onClick={() => {
                        sort("title");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Title
                    </button>
                    <button
                      className={styles.dropdownMenuItem}
                      role="menuitem"
                      onClick={() => {
                        sort("deadline");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Deadline
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
