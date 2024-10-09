import * as React from 'react';

interface CollectedAriaAttributes extends React.AriaAttributes {
  [key: string]: any;
}

export const collectAriaAttributes = (props: CollectedAriaAttributes) => {
  let ariaProps: CollectedAriaAttributes = {};

  for (let key in props) {
    if (/^(aria-)/.test(key)) {
      ariaProps[key] = props[key];
    }
  }

  return ariaProps;
};
