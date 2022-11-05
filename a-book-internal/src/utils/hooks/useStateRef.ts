import { useRef } from 'react';

const useStateRef = <T>(e: T) => {
  const ref = useRef(e);
  ref.current = e;

  return ref;
}

export default useStateRef;