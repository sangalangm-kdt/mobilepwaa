import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../../features/page/pageSlice";
import { navbarStyles } from "../../styles/header";
import logo from "../../assets/svg/logo.svg";
import InstallationButton from "../../constants/InstallationButton";
import LanguageSwitcher from "../../constants/LanguageSwitcher";
import { languagess } from "../../styles/header";
import { useTranslation } from "react-i18next";
import { HomeIcon, ProfileIcon, QRScanIcon } from "../../assets/icons";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentPage = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1);
    dispatch(setPage(path));
  }, [location, dispatch]);

  if (currentPage === "scanned-result") {
    return null;
  }
  return (
    <div className="flex flex-col fixed w-full top-0 z-50">
      <div className={`${languagess.container} ${languagess.languageSwitcher}`}>
        <LanguageSwitcher />
      </div>
      {currentPage === "login" ? (
        <nav className={`${navbarStyles.topNavbar}`}>
          <div className={navbarStyles.navbarContainer}>
            <div className="flex flex-row justify-between m-2">
              <img src={logo} alt="Logo" className={navbarStyles.logo} />
              <div>
                <InstallationButton />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <>
          <nav className={`${navbarStyles.topNavbar} lg:flex md:flex hidden`}>
            <div className={navbarStyles.navbarContainer}>
              <div className="flex flex-row justify-between m-2">
                <img src={logo} alt="Logo" className={navbarStyles.logo} />
                {isAuthenticated && (
                  <div>
                    <ul className="flex space-x-4">
                      <li className={navbarStyles.navbarLink}>
                        <NavLink
                          to="/"
                          aria-label="Home"
                          className={({ isActive }) =>
                            isActive ? `${navbarStyles.activeLink}` : ""
                          }
                        >
                          {t("common:home")}
                        </NavLink>
                      </li>
                      <li className={navbarStyles.navbarLink}>
                        <NavLink
                          to="/qrscanner"
                          aria-label="QR Scanner"
                          className={({ isActive }) =>
                            isActive ? `${navbarStyles.activeLink}` : ""
                          }
                        >
                          {t("scanner")}
                        </NavLink>
                      </li>
                      <li className={navbarStyles.navbarLink}>
                        <NavLink
                          to="/profile"
                          aria-label="Profile"
                          className={({ isActive }) =>
                            isActive ? `${navbarStyles.activeLink}` : ""
                          }
                        >
                          {t("common:profile")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
                <div>
                  <InstallationButton />
                </div>
              </div>
            </div>
          </nav>
          {isAuthenticated ? (
            <>
              <nav
                className={`${navbarStyles.bottomNavbar} sm:flex xs:flex lg:hidden md:hidden`}
              >
                <div className={navbarStyles.navbarContainer}>
                  <ul className="flex space-x-14">
                    <li className={navbarStyles.bottomNavbarButton}>
                      <NavLink
                        to="/"
                        aria-label="Home"
                        className={({ isActive }) =>
                          isActive ? `${navbarStyles.activeLink}` : ""
                        }
                      >
                        {({ isActive }) => (
                          <div className="flex flex-col items-center">
                            <HomeIcon
                              className={`${navbarStyles.iconContainer} ${
                                isActive ? "fill-primary" : ""
                              }`}
                            />
                            {t("common:home")}
                          </div>
                        )}
                      </NavLink>
                    </li>
                    <li className={navbarStyles.bottomNavbarButton}>
                      <NavLink
                        to="/qrscanner"
                        aria-label="QR Scanner"
                        className={({ isActive }) =>
                          isActive ? `${navbarStyles.activeLink}` : ""
                        }
                      >
                        {({ isActive }) => (
                          <div
                            className={`flex flex-col items-center ${navbarStyles.qrContainer}`}
                          >
                            <QRScanIcon
                              className={`${navbarStyles.iconContainer} 
                               ${isActive ? "fill-primary" : ""}`}
                            />
                          </div>
                        )}
                      </NavLink>
                    </li>
                    <li className={navbarStyles.bottomNavbarButton}>
                      <NavLink
                        to="/profile"
                        aria-label="Profile"
                        className={({ isActive }) =>
                          isActive ? `${navbarStyles.activeLink}` : ""
                        }
                      >
                        {({ isActive }) => (
                          <div className="flex flex-col items-center">
                            <ProfileIcon
                              className={`${navbarStyles.iconContainer} ${
                                isActive ? "fill-primary" : ""
                              }`}
                            />
                            {t("common:profile")}
                          </div>
                        )}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          ) : (
            <nav
              className={`${navbarStyles.topNavbar} sm:flex md:flex lg:hidden`}
            >
              <div className={navbarStyles.navbarContainer}>
                <div className="flex flex-row justify-between m-2">
                  <img src={logo} alt="Logo" className={navbarStyles.logo} />
                  <div>
                    <InstallationButton />
                  </div>
                </div>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
