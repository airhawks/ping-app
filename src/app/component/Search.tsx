'use client';

import { ChangeEvent } from "react";

export default function Search({onChange}: {onChange: (searchQuery: string) => void}) {
  const onChangeCallback = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">
        Search : 
        <input
          id="search"
          autoFocus
          placeholder="Enter search text"
          onChange={onChangeCallback}
          aria-describedby="search-results"
        ></input>
      </label>
    </div>
  );
}
