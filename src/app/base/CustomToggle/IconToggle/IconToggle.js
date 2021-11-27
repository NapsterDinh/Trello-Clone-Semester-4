import React from 'react'

export const CustomToggle = React.forwardRef(({ children, onClick }, ref, classname) => (
    <a
      className={classname}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));