/* eslint-disable react/prop-types */
import React from 'react';

/**
 * A flash that visualizes the capturing of an image
 *
 * @author [Lukas Bormann]
 */
 type Props = {
  flash: boolean,
  onAnimationEnd: () => void,
}

const Flash = ({flash, onAnimationEnd}: Props) => {
  return (
    <div onAnimationEnd={onAnimationEnd} className={`absolute inset-0 bg-white opacity-0 ${(flash === true && 'animate-flash')}`}
    />
  );
};

export default Flash;
