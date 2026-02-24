'use client';

import { Suspense, useCallback, useState, useTransition } from "react";
import Search from "./Search";
import List from "./List";

// 1. Debounce api
// 2. Abort older requests
// 3. memoize

export default function AutoComplete() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const setSearchQueryCallback = useCallback(((value: string) => {
    startTransition(async () => {
      setSearchQuery(value);
      setData([]);
      if(value === '') {
        return;
      }
      try {

      const response = await fetch(`/api/list?searchQuery=${value}`);
        if(response.ok ) {
          setData((await response.json()).data);
        } else {
          // setError();
        }
      } catch(e) {
        // setError();
      }
    });
  }), []);
    
  return (
    <div>
      <Search onChange={setSearchQueryCallback}></Search>
      {isPending ? <div>loading....</div> : <List data={data}></List>}
      {
        // show error here
      }
    </div>
  );
}
