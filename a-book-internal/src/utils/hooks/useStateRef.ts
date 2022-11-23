import { useRef, useState } from 'react';
import useEvent from './useEvent';

type NotFunction<T> = T extends Function ? never : T;
const useStateRef = <T>(initial: NotFunction<T> | (() => NotFunction<T>)) => {
  const [state, setState] = useState<NotFunction<T>>(initial);
  const ref = useRef(state);
  const setter = useEvent((value: Parameters<typeof setState>[0]) => {
    if (typeof value === 'function') {
      return setState(oldValue => {
        ref.current = (value as any)(oldValue);
        return ref.current
      })
    }
    ref.current = value;
    setState(value)
  });

  return { ref, state, setter };
}

export default useStateRef;