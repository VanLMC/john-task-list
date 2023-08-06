import "./styles.css";
import { useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";

interface Checkbox {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}


function Checkbox({isChecked, setIsChecked }: Checkbox) {

  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#c5adc7" : "#fff",
    borderColor: isChecked ? "#c5adc7" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkmarkLength, setCheckmarkLength] = useState<any>(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
    </label>
  );
}

export default Checkbox;
