import React from "react";
import classesCSS from "./MyModal.module.css";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classesCSS.myModal];
  if (visible === true) {
    rootClasses.push(classesCSS.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classesCSS.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
