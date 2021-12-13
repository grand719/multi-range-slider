import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./multi-range-slider.css";

export const MultiRangeSlider = ({ min, max, onChange }) => {
  const [value, setValue] = useState({ min: min, max: max });
  const [style, setStyle] = useState({ left: "0%", width: "100%" });

  useEffect(() => {
    onChange({ ...value });
  }, [value]);

  const minValueHandel = (e) => {
    +e.target.value < value.max && setValue({ ...value, min: e.target.value });
    setStyle({
      left: `${Math.round((+e.target.value * 100) / max)}%`,
      width: `${Math.round(((+value.max - +e.target.value) * 100) / max)}%`,
    });
  };

  const maxValueHandel = (e) => {
    +e.target.value > value.min && setValue({ ...value, max: e.target.value });
    setStyle({
      ...style,
      width: `${
        Math.round((+e.target.value * 100) / 200) - +style.left.replace("%", "")
      }%`,
    });
  };

  return (
    <div id="multi-range-slider-wrap">
      <div className="multi-range-slider-thumb--wrapper">
        <input
          className="multi-range-slider-thumb multi-range-slider-thumb__left"
          onChange={minValueHandel}
          value={+value.max > +value.min && value.min}
          type="range"
          min={min}
          max={max}
        />
        <input
          className="multi-range-slider-thumb multi-range-slider-thumb__right"
          onChange={maxValueHandel}
          value={+value.min < +value.max && value.max}
          type="range"
          min={min}
          max={max}
        />
        <div style={style} className="multi-range-slider"></div>
      </div>
      <div className="multi-range-slider-values">
        <p>{value.min}</p>
        <p>{value.max}</p>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
