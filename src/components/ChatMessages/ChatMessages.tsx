import classNames from 'styles/utils/classNames';

interface Props {
  messages: {
    display: 'left' | 'right';
    message: string | React.ReactNode;
  }[];
}

/**
 * If passing a string, please format in markdown beforehand.
 * possible TODO: add markdown prop and logic?
 */
export default function ChatMessages({ messages }: Props) {
  return (
    <div className="space-y-4 lg:space-y-7">
      {messages.map((item, index) => {
        const outerClassName =
          item.display === 'left'
            ? classNames('flex', 'col-start-1', 'col-end-4', 'break-words')
            : classNames('flex', 'col-start-3', 'col-end-5', 'justify-end');

        const innerClassName =
          item.display === 'left'
            ? classNames(
                'w-fit',
                'max-w-full',
                // 'overflow-x-auto',
                'break-words',
                'px-6',
                'py-5',
                'rounded-md',
                'bg-brand-gray-800',
                'text-white',
              )
            : classNames(
                'w-fit',
                'max-w-full',
                'px-4',
                'py-2',
                'rounded-md',
                'bg-brand-primary',
                'text-black',
                'self-end',
              );

        return (
          <div
            className={classNames(
              'flex w-full',
              item.display === 'left' ? 'justify-start pr-8 lg:pr-20' : 'justify-end pl-8 lg:pl-20',
            )}
          >
            {typeof item.message === 'string' ? (
              <div
                className={classNames('prose dark:prose-invert', innerClassName)}
                dangerouslySetInnerHTML={{ __html: item.message }}
              ></div>
            ) : (
              <div className={classNames('prose dark:prose-invert', innerClassName)}>
                {item.message}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
