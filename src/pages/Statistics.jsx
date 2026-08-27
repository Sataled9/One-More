import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

function Statistics({ onNavigation }) {
  function goBackToFitness() {
    onNavigation("fitness");
  }

  return (
    <div className="app-shell">
      <Header
        title="Statistic"
        showBackArrow={true}
        onBack={goBackToFitness}
      />

      <main className="statistics">
        <h1 className="visually-hidden">Statistics</h1>

        <section className="statistics__summary" aria-label="Workout summary">
          <article className="statistic-card">
            <span className="statistic-card__icon" aria-hidden="true">
              TIME
            </span>

            <div className="statistic-card__information">
              <h2>Workout time</h2>
              <p>
                <strong>7h 40min</strong>
                <span className="statistic-card__change statistic-card__change--positive">
                  +4.4%
                </span>
              </p>
            </div>

            <div
              className="statistic-card__progress statistic-card__progress--time"
              role="img"
              aria-label="Workout time goal: 66 percent"
            >
              <span>66%</span>
            </div>
          </article>

          <article className="statistic-card">
            <span className="statistic-card__icon" aria-hidden="true">
              KCAL
            </span>

            <div className="statistic-card__information">
              <h2>Calories burned</h2>
              <p>
                <strong>1,745 kcal</strong>
                <span className="statistic-card__change statistic-card__change--positive">
                  +1.7%
                </span>
              </p>
            </div>

            <div
              className="statistic-card__progress statistic-card__progress--calories"
              role="img"
              aria-label="Calories goal: 74 percent"
            >
              <span>74%</span>
            </div>
          </article>

          <article className="statistic-card">
            <span className="statistic-card__icon" aria-hidden="true">
              EFF
            </span>

            <div className="statistic-card__information">
              <h2>Training efficiency</h2>
              <p>
                <strong>84%</strong>
                <span className="statistic-card__change statistic-card__change--positive">
                  +3.2%
                </span>
              </p>
            </div>

            <div
              className="statistic-card__progress statistic-card__progress--efficiency"
              role="img"
              aria-label="Training efficiency: 84 percent"
            >
              <span>84%</span>
            </div>
          </article>
        </section>

        <section className="statistics__chart" aria-labelledby="chart-title">
          <div className="statistics__chart-header">
            <h2 id="chart-title">Weekly progress</h2>
            <p>
              <strong>1,745</strong>
              <span>kcal</span>
            </p>
          </div>

          <svg
            className="statistics-chart"
            viewBox="0 0 360 210"
            role="img"
            aria-labelledby="chart-title chart-description"
          >
            <desc id="chart-description">
              Static weekly calories chart from Monday to Sunday.
            </desc>

            <defs>
              <linearGradient
                id="statistics-chart-area"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="42"
                x2="0"
                y2="190"
              >
                <stop offset="0%" stopColor="#ff202a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff202a" stopOpacity="0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="25" x2="360" y2="25" />
            <line x1="0" y1="80" x2="360" y2="80" />
            <line x1="0" y1="135" x2="360" y2="135" />
            <line x1="0" y1="190" x2="360" y2="190" />

            <path
              className="statistics-chart__area"
              d="M0 168 L55 126 L110 142 L165 96 L220 116 L275 68 L330 84 L360 42 L360 190 L0 190 Z"
              fill="url(#statistics-chart-area)"
            />

            <polyline
              className="statistics-chart__line"
              points="0,168 55,126 110,142 165,96 220,116 275,68 330,84 360,42"
            />

            <circle className="statistics-chart__point" cx="275" cy="68" r="7" />
          </svg>

          <div className="statistics__days" aria-hidden="true">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </section>
      </main>

      <BottomMenu activeItem="statistics" onNavigation={onNavigation} />
    </div>
  );
}

export default Statistics;
