# ONE MORE - Fitness App

One More is a responsive multi-sport fitness, training, nutrition, and performance application designed to bring different aspects of an active lifestyle into a single ecosystem.

The application allows different types of training to be organized, performed, recorded, and analyzed within the same environment.

The current development focuses primarily on the core application structure, Fitness and Running, while additional activities and features will be progressively introduced.

## Core Sports & Activities

One More is designed to support multiple sports and training disciplines:

* Fitness
* Running
* HIIT
* Cycling
* Swimming
* And More...

Rather than creating separate applications for each activity, One More provides a unified environment where different types of training can work together.

## Fitness

The Fitness section provides structured workout programs divided into training days, muscle groups and exercises.

Users can select workout days, navigate between muscle groups, view exercises and their previews, check sets, repetitions and weights, and mark exercises as completed.

Training programs are organized around 8-week cycles. The application manages workout progression and records completed activities.

Future development will expand Fitness with training history, personal records, progression analysis, training volume, recovery information and AI-assisted program adaptation.

## Running

The Running section provides structured running programs and scheduled training sessions.

Users can select running days, view session information, navigate through warm-up exercises and record completed running activities.

Running programs are organized into training cycles and allow different types of sessions to be managed within the same application.

Future development will include more detailed information about distance, pace, heart rate, training load, recovery and performance, together with wearable integration and AI-assisted program adaptation.

## HIIT

The HIIT section is designed to manage high-intensity interval training within the One More ecosystem.

It will organize training sessions according to exercises, intervals, intensity, duration and recovery periods.

Completed HIIT activities will contribute to the same training history and statistics used by the other disciplines.

Future development will include detailed session management, performance tracking, recovery information and integration with wearable data.

## Cycling

The Cycling section is designed to integrate cycling activities into the same training environment.

It will track information such as distance, duration, speed, heart rate, training load, performance and recovery.

Cycling activities will contribute to the athlete's overall activity history and statistics.

Future development will include compatible wearable integration, detailed performance analysis and AI-assisted training adaptation.

## Swimming

The Swimming section is designed to integrate swimming activities into the One More ecosystem.

It will track sessions, distance, duration, intensity, performance, heart rate where available and recovery.

Swimming activities will contribute to the overall training history together with the other supported disciplines.

Future development will include more detailed performance analysis and integration with compatible devices.

## Fasting

The Fasting section will track fasting periods, eating windows, duration and fasting history.

Fasting information will be analyzed together with training, nutrition, activity and recovery to provide a more complete overview of the athlete's routine and goals.

## Nutrition & Sports Diet

Nutrition will be integrated with training, recovery, goals, activity level and physiological characteristics.

The objective is to combine nutritional information with data from Fitness, Running, HIIT, Cycling, Swimming, Fasting and compatible wearable devices.

Future development will use this information to support personalized sports nutrition and dietary planning.

## Dashboard

The Dashboard is the central hub of One More.

It provides access to the main training activities, daily training information and the different areas of the application.

Future development will expand the Dashboard with activity summaries, training recommendations, recovery information, upcoming workouts, goals and personalized insights.

## Statistics

The Statistics section provides a visual overview of completed activities and training progress.

Recorded activity data is used to display information about the user's training history.

Future development will expand Statistics with weekly, monthly and yearly trends, training volume, intensity, personal records, performance progression, recovery and training load.

## Settings

The Settings section provides control over application and training-related options.

Settings information is stored and retrieved through the local backend.

Future development will expand this section with additional training preferences, connected devices, data synchronization and application personalization.

## Technologies Used

The project uses:

* **React** – components, props, state, events and hooks
* **JavaScript** – application logic and interactions
* **Vite** – development environment and build tool
* **Sass / SCSS** – modular styling
* **json-server** – local backend simulation and data storage
* **Fetch API** – communication with the backend
* **Git** – version control
* **GitHub** – repository management
* **Responsive Design** – adaptation to different screen sizes

## Project Structure

The project is organized by separating components, pages, application logic, styles and backend data.

```text
src/
├── assets/
├── components/
├── logic/
├── pages/
└── styles/

database/
└── db.json
```

The `components` folder contains reusable React interface components.

The `pages` folder contains the main presentation pages.

The `logic` folder contains controllers, services and helper functions responsible for application state, behavior and data management.

The `styles` folder contains modular Sass/SCSS files.

The `database/db.json` file contains the data used by the local backend.

This structure keeps the application logic separated from the graphical interface.

## React

The application uses React components, `props`, state, events and hooks.

`useState` is used to manage application state, while `useEffect` is used where data or application behavior must be synchronized.

Data and functions are passed to presentation components through `props`.

## Backend & json-server

One More uses **json-server** to simulate a local backend.

Application data is stored in:

```text
database/db.json
```

The application communicates with json-server through the **Fetch API**.

The backend runs locally at:

```text
http://localhost:3000
```

## Sass & Responsive Design

The application uses Sass/SCSS with a modular structure for styling.

Responsive rules are used to adapt the interface, navigation and training elements to different screen sizes.

## Git & GitHub

Git is used for version control and GitHub for repository management.

Development changes are tracked through commits, and `.gitignore` is used to exclude files and directories that should not be included in the repository.

# Run the Project Locally

## Requirements

Before starting, make sure you have installed:

* Node.js version 18 or newer: https://nodejs.org/
* npm
* Git: https://git-scm.com/

## 1. Download the Project

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project folder:

```bash
cd One-More
```

Alternatively, download the project from GitHub using:

**Code → Download ZIP**

## 2. Install Dependencies

Inside the project folder, run:

```bash
npm install
```

This installs all dependencies required by the application.

## 3. Start the Backend

Start json-server:

```bash
npm run server
```

The backend will run at:

```text
http://localhost:3000
```

Keep this terminal open.

## 4. Start the Application

Open a second terminal inside the project folder and run:

```bash
npm start
```

Vite will display the local application address, normally:

```text
http://localhost:5173
```

Both json-server and Vite must be running while using the application.

## Current Features & Future Development

One More is being developed as a continuously evolving platform.

Future development will expand the existing training system with additional sports, advanced statistics, nutrition, fasting, wearable integration and AI-assisted training.

Compatible devices are planned to include platforms such as Garmin and Apple Watch, allowing training, recovery and physiological data to contribute to performance analysis.

## Development Roadmap

The long-term objective is to develop One More into a complete multi-platform sports ecosystem.

The project is planned to expand from the current web application to **iOS**, followed by **Android**, and later to compatible smartwatches and sports watches.

The goal is to create one connected platform where training, nutrition, recovery, activity and performance can work together.

---

**One More — One platform. Every activity. Keep moving.**
