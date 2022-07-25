import ReactDOM from "react-dom/client";
import React from "react";
import Weather from "../Weather/Weather";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Weather />
    </React.StrictMode>
);