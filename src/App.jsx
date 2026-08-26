//Switch between the existing pages
import { useState } from "react";
import Dashboard from "./pages/Dashboard"; 
import Fitness from "./pages/Fitness";
import Statistics from "./pages/Statistics";



//all pages are stored here for bottom menu
const pages = {
    dashboard: Dashboard,
     fitness: Fitness,
    statistics: Statistics,
}; 

// Keeps track of which page is currently open in the app
function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const CurrentPage = pages[currentPage]; 

// Changes the current page when the user selects a different page
 function navigateToPage(pageName) {
    if (pages[pageName]) {
        setCurrentPage(pageName)
    }
} 
//Gives every page access to the same navigation function.
 return <CurrentPage onNavigation={navigateToPage} />;
}
export default App; 