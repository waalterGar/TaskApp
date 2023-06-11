import { useEffect } from "react";
import { useLocation } from "react-router-dom"

function renderNavbar ()  {
    console.log('renderNavbar');
    const location = useLocation();

    useEffect(() => {
        console.log('location:', location);
    }, [location]);

    return (
        <div>{children}</div>
    )
}

export default renderNavbar;