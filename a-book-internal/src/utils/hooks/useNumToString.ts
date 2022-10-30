import { useEffect, useState } from 'react';
import useEvent from './useEvent';

const useNumToString = (num: number, _onChange: (num: number) => unknown) => {
  const [numStr, setNumStr] = useState(num.toString())

  useEffect(() => {
    if (num !== parseFloat(numStr)) {
      setNumStr(num.toString())
    }
  }, [num]);

  const onChange = useEvent((newNumStr: string) => {
    setNumStr(newNumStr);

    const newNum = parseFloat(newNumStr);
    if (!Number.isNaN(newNum) && newNum !== num) _onChange(newNum)
  });

  return [numStr, onChange] as const;
}

export default useNumToString;