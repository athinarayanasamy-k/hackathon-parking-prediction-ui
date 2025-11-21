import React from 'react';
import { AutoComplete, Input } from 'antd';

export type SmartSearchOption = {
  value: string; // the value we return onSelect (e.g. route path or ID)
  label: string; // what the user sees in the dropdown
};

type SmartSearchProps = {
  options: SmartSearchOption[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  style?: React.CSSProperties;
  allowClear?: boolean;
};

const SmartSearch: React.FC<SmartSearchProps> = ({
  options,
  placeholder = 'Search...',
  onSelect,
  style,
  allowClear = true,
}) => {
  return (
    <AutoComplete
      style={style}
      options={options}
      filterOption={(inputValue, option) =>
        (option?.label as string).toLowerCase().includes(inputValue.toLowerCase())
      }
      onSelect={(value) => onSelect?.(value as string)}
    >
      <Input.Search placeholder={placeholder} allowClear={allowClear} />
    </AutoComplete>
  );
};

export default SmartSearch;
