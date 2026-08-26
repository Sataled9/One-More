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


function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const CurrentPage = pages[currentPage]; 

//cchanges the current page when the user selects a different page
 function navigateToPage(pageName) {
    if (pages[pageName]) {
        setCurrentPage(pageName)
    }
} 

 return <CurrentPage onNavigation={navigateToPage} />;
}
export default App; 