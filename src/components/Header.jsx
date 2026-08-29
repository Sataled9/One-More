//Displays the One More logo, an optional page title, and an optional back navigation button

import logo from "../assets/logo/one-more-logo.png";
import arrowLeft from "../assets/icons/arrow-left.svg";

function Header({
  title = "",
  showBackArrow = false,
  onBack,
}) {
  return (
    <header className="header">
      {showBackArrow ? (
        <button
          className="header__arrow"
          type="button"
          aria-label="Back"
          onClick={onBack}
        >
          <img src={arrowLeft} alt="" />
        </button>
      ) : (
        //Keeps logo in center when, back arrow is not displyed
        <span className="header__arrow" aria-hidden="true"></span>
      )}

      <div className="header__center">
        <img className="header__logo" src={logo} alt="One More" />
        {title && <p className="header__title">{title}</p>}
      </div>
    </header>
  );
}

export default Header;
