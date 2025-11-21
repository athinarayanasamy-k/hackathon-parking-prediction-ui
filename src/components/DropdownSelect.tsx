// src/components/DropdownSelect.tsx
import React from 'react';
import { Select } from 'antd';

export interface DropdownSelectOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  // value: string;
  options: DropdownSelectOption[];
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  // value,
  options,
  onChange,
  style,
  placeholder,
}) => (
  <Select
    style={style}
    // value={value}
    onChange={onChange}
    options={options}
    placeholder={placeholder}
  />
);

export default DropdownSelect;
