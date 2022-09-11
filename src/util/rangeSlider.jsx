import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const minDistance = 5;

const RangeSlider = () => {
  const [value, setValue] = useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  return (
    <Box sx={{ width: 150 }} style={{ marginTop: "50px" }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        size="small"
        min={10}
        max={50}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  );
};

export default RangeSlider;
