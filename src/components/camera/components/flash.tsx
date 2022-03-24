/* eslint-disable react/prop-types */
import React from 'react';

/**
 * A flash that visualizes the capturing of an image
 *
 * @author [Lukas Bormann]
 */
 type Props = {
  flash: boolean,
}

const Flash = ({flash}: Props) => {
  return (
    <div className={`absolute inset-0 bg-white opacity-0 ${(flash === true && 'animate-flash')}`}
    />
  );
};

export default Flash;
