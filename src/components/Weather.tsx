import React from 'react';
import { WeatherComponentProps } from 'constants/genui';

/**
 * @note trivial example to test types flow built from the genui definitions
 * @todo delete this component and definitions for it
 */

export default function WeatherComponent({ temperature, scale }: WeatherComponentProps) {
  return (
    <div>
      <div>This is just a demo component to confirm that it renders</div>
      <div>{temperature}</div>
      <div>{scale}</div>
    </div>
  );
}
