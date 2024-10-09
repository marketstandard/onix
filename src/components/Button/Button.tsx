import React from 'react';
import { ButtonProps, Button as NextUIButton } from '@nextui-org/react';
import classNames from 'styles/utils/classNames';

interface Props extends ButtonProps {}

const Button = ({ type = 'button', variant, children, className, color, ...rest }: Props) => {
  return (
    <NextUIButton
      type={type}
      {...rest}
      color={color}
      variant={variant}
      className={classNames(
        !!className && className,
        color === 'primary' &&
          (!variant || (variant !== 'bordered' && variant !== 'ghost')) &&
          'text-text-inverted-darkmode',
      )}
    >
      {children}
    </NextUIButton>
  );
};

// interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// const Button = ({ type = 'button', children, ...rest }: Props) => {
//   return (
//     <button type={type} {...rest}>
//       {children}
//     </button>
//   );
// };

export default Button;
