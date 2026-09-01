//Manages navigation back to the previous page
function usePageController(onNavigation, previousPage) {
    function goBack() {
        onNavigation(previousPage);
    }

    return { goBack };
}

export default usePageController;