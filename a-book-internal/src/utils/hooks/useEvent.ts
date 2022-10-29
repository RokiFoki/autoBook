import { useRef } from 'react';

const useEvent = <T extends Function>(fun: T) => {
    const ref = useRef(fun);
    ref.current = fun;

    const stableRef = useRef<T>(((...args: any[]) => ref.current(...args)) as any);

    return stableRef.current;
}

export default useEvent;