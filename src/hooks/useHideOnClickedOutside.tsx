import { useEffect, useRef } from 'react';

export default function useHideOnClickedOutside<T>(handlerLogic: T) {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (modalRef.current !== null)
        if (!modalRef.current.contains(element)) {
          if (typeof handlerLogic === 'function') handlerLogic();
        }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, [handlerLogic]);

  return modalRef;
}
