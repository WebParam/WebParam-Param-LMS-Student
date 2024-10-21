"use client";

import React from "react";
import styles from "@/app/(protected)/student/messages/Messages.module.scss";
import SearchIcon from "@/public/svg/SearchIcon"

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
