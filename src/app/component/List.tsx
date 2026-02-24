import { useEffect } from "react";

export default function List({ data }: { data: Array<string> }) {
  return (
    <ul id="search-results" aria-live="polite">
      {
        data.map((suggestion) => (
          <li key={suggestion} onClick={() => console.log(suggestion)} role="button"> 
            {suggestion}
          </li>
        ))
      }
    </ul>
  );
}
