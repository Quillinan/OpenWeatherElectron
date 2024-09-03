import React, { useState } from "react";
import styled from "styled-components";

interface ToggleLineProps {
  label: string;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleLineProps> = ({ label, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (): void => {
    setIsChecked(!isChecked);
    onToggle();
  };

  return (
    <ToggleSwitchStyled>
      <ToggleSwitchLabel>
        <ToggleSwitchInput
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <ToggleSwitchSlider className="slider" />
      </ToggleSwitchLabel>
      <p className="info">{label}</p>
    </ToggleSwitchStyled>
  );
};

const ToggleSwitchStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5%;

  p {
    margin-left: 10px;
  }
`;

const ToggleSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2196f3;
  }

  &:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const ToggleSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 40px;

  &:before {
    content: "";
    position: absolute;
    height: 28px;
    width: 28px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export default ToggleSwitch;
