//Manages navigation back to the previous page
function usePageController(onNavigation, previusPage) {
    function goBack() {
        onNavigation(previusPage);
    }

    return { goBack };
}

export default usePageController;