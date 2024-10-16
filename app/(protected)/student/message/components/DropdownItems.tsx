"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from '../Message.module.scss';

const list = [
  { id: 1, name: 'All Messages' },
  { id: 2, name: 'Unread' },
  { id: 3, name: 'Read' },
  { id: 4, name: 'Archived' },
];

const DropdownItems: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleSelectItem = (item: { id: number; name: string }) => {
    setInputValue(item.name);
    setSelectedItem(item.name);
    setVisible(false);
  };


  const toggleDropdown = () => {
    setVisible(!visible);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchFilterContainer}>

        <div className={styles.searchInputWrapper} tabIndex={0}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="All Messages"
            value={inputValue}
            onClick={toggleDropdown}
            onChange={handleInputChange}
          />
          <div className={styles.dropdownIcon} onClick={toggleDropdown} />
        </div>

        {visible && (
          <div ref={dropdownRef} className={styles.dropdown}>
            <ul>
              {list
                .filter((item) =>
                  item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item) => (
                  <li
                    key={item.id}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectItem(item)}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownItems;
