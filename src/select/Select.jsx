import React, { useContext, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const selectContext = React.createContext();
const SelectProvider = selectContext.Provider;

const Select = ({ children }) => {
  const [state, setState] = useState({ selected: null, showOptions: false });
  const onSelect = (val) => {
    setState((prev) => ({ ...prev, selected: val, showOptions: false }));
  };

  const handleShowOptions = (e) => {
    setState((prev) => ({ ...prev, showOptions: !prev.showOptions }));
  };

  return (
    <SelectProvider value={{ ...state, onSelect, handleShowOptions }}>
      {children}
    </SelectProvider>
  );
};

const SelectBox = ({ children }) => {
  const { selected, handleShowOptions, showOptions } =
    useContext(selectContext);
  const ref = useRef(null);
  useClickOutside(ref, handleShowOptions);

  return (
    <div className="select" ref={ref}>
      <div className="select-box" onClick={handleShowOptions}>
        <input
          type="text"
          value={selected || ""}
          readOnly
        />
      </div>
      {showOptions && (
        <div
          className="select-options"
          role="listbox"
          aria-activedescendant={selected}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const Options = ({ children, value }) => {
  const { selected, onSelect } = useContext(selectContext);
  return (
    <span
      role="option"
      aria-selected={selected === value}
      onClick={() => onSelect(value)}
      className={selected === value ? "-selected" : ""}
      key={value}
    >
      {children}
    </span>
  );
};

Select.SelectBox = SelectBox;
Select.Options = Options;

export default Select;
