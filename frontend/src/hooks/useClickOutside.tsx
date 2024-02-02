import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'



const useClickOutside = (
  ref: RefObject<HTMLElement>,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>
): void => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(state)
      console.log(ref.current)
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("ccscd")
        if (state) {
            setState(false)
        }
      }
    }
    document.addEventListener("click", handleClickOutside)

    return () => document.removeEventListener("click", handleClickOutside)
  }, [state])
}

export default useClickOutside