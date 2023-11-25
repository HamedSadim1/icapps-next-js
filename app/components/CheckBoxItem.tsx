// CheckBoxItem.tsx
import React from 'react';

interface CheckBoxItemProps {
  id: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

const CheckBoxItem= ({ id, isChecked, onCheckboxChange }:CheckBoxItemProps) => {
  return (
    <div className="flex gap-3 border-2 border-gray-500-400 p-2 rounded">
      <input
        type="checkbox"
        name="item"
        checked={isChecked}
        onChange={() => onCheckboxChange(id, !isChecked)} // Toggle the isChecked value
      />
    </div>
  );
};

export default CheckBoxItem;
