"use client";

import React from "react";
import styles from "../Message.module.scss";
import SearchIcon from "../svg/SearchIcon";

const SearchInput = () => {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchFieldWrapper}>
                <div className={styles.searchInputContainer}>
                    <div className={styles.searchIcon}>
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search for documents, messages etc."
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
