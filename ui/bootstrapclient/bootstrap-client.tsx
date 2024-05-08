"use client"

import { useEffect } from "react"

// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/scss/bootstrap.scss";
// import "bootstrap-icons/font/bootstrap-icons.css"

// // Custom global styles
// import "@/app/globals.css";

// // Plugin CSS
// import "@/public/css/plugins/fontawesome.min.css";
// import "@/public/css/plugins/animation.css";
// import "@/public/css/plugins/feather.css"
// import "@/public/css/plugins/euclid-circulara.css";
// import "@/public/scss/styles.scss";

const BootstrapClient = () => {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js")
    }, [])

    return null;
}

export default BootstrapClient;