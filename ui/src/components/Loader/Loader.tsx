/** @jsxImportSource @emotion/react */
import "twin.macro";
import React from 'react';
import loader from 'asset/images/logo-banner.png'

export const Loader = (props: any) => {
  return <img tw='animate-spin' {...props} src={loader} alt="loading..." />;
};

export default Loader;
