import React from "react";
import styles from "@/styles/mood.module.css";

interface Button {
    href: string;
    name: string;
}

const StaticButton = ({ href, name }: Button) => {
    return (
        <button
            className={styles.bottomButton}
            onClick={() => (window.location.href = `${href}`)}
        >
            {name}
        </button>
    );
};

export default StaticButton;
