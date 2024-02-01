import { useEffect, useRef, useState } from "react"

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  
  //a state that will remain persistent through rerenders 
  //and can be used to detect whether we are on the first render
  const isMounted = useRef(false)
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );
  // useEffect will run every rerender if no second argument is given.
  // It will run the callback only on the initial render if 2nd ar is given
  //  but an emtpy array
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);
    
  return [value, setValue]
}

export default useStorageState