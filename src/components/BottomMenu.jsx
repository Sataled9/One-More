import homeIcon from "../assets/icons/home.svg";
import heartIcon from "../assets/icons/heart.svg";
import statisticsIcon from "../assets/icons/statistics.svg";
import settingsIcon from "../assets/icons/settings.svg";

function BottomMenu({ activeItem, onNavigation }) {
    const homeItemClassName = activeItem === "home"
        ? "bottom-menu__item bottom-menu__item--active"
        : "bottom-menu__item";

    const fitnessItemClassName = activeItem === "fitness"
        ? "bottom-menu__item bottom-menu__item--active"
        : "bottom-menu__item";

    const statisticsItemClassName = activeItem === "statistics"
        ? "bottom-menu__item bottom-menu__item--active"
        : "bottom-menu__item";

    const settingsItemClassName = activeItem === "settings"
        ? "bottom-menu__item bottom-menu__item--active"
        : "bottom-menu__item";

        return (
            <nav className="bottom-menu" aria-label="Main navigation">
                <button 
                    className={homeItemClassName}
                    type="button"
                    aria-label="Dashboard"
                    aria-current={activeItem === "home" ? "page" :undefined}
                    onClick={() => onNavigation("dashboard")}
                    >
                    <img src={homeIcon} alt="" />
                </button>

                <button
                    className={fitnessItemClassName}
                    type="button"
                    aria-label="Fitness"
                    aria-current={activeItem === "fitness" ? "page" : undefined}
                    onClick={() => onNavigation("fitness")} 
                    >
                    <img src={heartIcon} alt="" />
                </button>

                <button
                className={statisticsItemClassName}
                type="button"
                aria-label="Statistics"
                aria-current={activeItem === "statistics" ? "page" : undefined}
                onClick={() => onNavigation("statistics")}
                >
                    <img src={statisticsIcon} alt="" />
                </button>

                <button 
                className={settingsItemClassName}
                type="button"
                aria-label="Settings"
                aria-current={activeItem === "settings" ? "page" : undefined}
                onClick={() => onNavigation("settings")}
                >
                    <img src={settingsIcon} alt="" />
                </button>
            </nav>
        );
}


export default BottomMenu;

