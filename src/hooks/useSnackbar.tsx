import { useMemo, useState } from 'react';
import Snackbar from 'components/Snackbar';
import { Params } from 'components/Snackbar/Snackbar';

type Message = Omit<Params, 'handleClose'>;

export const useSnackbar = () => {
  const [queue, setQueue] = useState<Message[]>([]);

  const enqueue = (message: Message) => {
    setQueue((prev) => [...prev, message]);
  };

  const dequeue = () => {
    if (queue.length === 0) return;

    setQueue((prev) => prev.slice(1));
  };

  const Snack = useMemo(() => {
    function SnackWrapper() {
      return queue.length === 0 ? null : (
        <Snackbar level={queue[0].level} message={queue[0].message} handleClose={dequeue} />
      );
    }

    return SnackWrapper;
  }, [queue.length]);

  return {
    enqueue,
    Snack,
  };
};
