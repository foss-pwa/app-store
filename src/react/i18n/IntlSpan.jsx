import React from "react";
import { getText } from "./i18n";

export const IntlSpan = (props) => {
  const { k, ...others } = props;
  return (
    <span {...others}>
      {getText(typeof props.k === 'string' ? props.k.split('.') : props.k)}
    </span>
  );
};
