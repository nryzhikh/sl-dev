import React from 'react';
import { Label } from '@/components/ui/label';

interface ToggleButtonProps {
  value: boolean;
  isToggled: boolean;
  text: string;
  Icon?: React.ElementType;
  handleClick: (value: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, isToggled, text, handleClick }) => (
  <button
    type="button"
    onClick={() => handleClick(value)}
    className={`text-sm h-7 flex items-center rounded-md justify-center relative w-full ${isToggled ? 'bg-white text-regular' : 'bg-inherit text-muted-foreground'}`}
  >
    {/* <div className="absolute left-0 flex items-center justify-center h-full pl-2">
      {Icon && <Icon />}
    </div> */}
    <p className="text-xs">{text}</p>
  </button>
);

interface FormToggleSwitchProps {
  field: any;
  label: string;
  trueText?: string;
  falseText?: string;
  TrueIcon?: React.ElementType;
  FalseIcon?: React.ElementType;
}

const FormLabeledSwitch: React.FC<FormToggleSwitchProps> = ({
  field,
  label,
  trueText = "На веб-страницу",
  falseText = "На установку",
  TrueIcon,
  FalseIcon
}) => {

  const handleClick = (value: boolean) => {
    field.onChange(value);
  };

  return (
    <div className="grid grid-cols-12 pl-1 pb-1">
      <div className="col-span-12 xl:col-span-4 md:col-span-3 flex items-center">
      <Label className=" text-muted-foreground pt-1 text-xs" htmlFor={field.name}>
        {label}
      </Label>
      </div>
      <div className="col-span-12 xl:col-span-8 md:col-span-9 flex p-1 rounded-lg justify-center items-center bg-muted w-full ">
        <ToggleButton
          isToggled={!field.value}
          text={falseText}
          Icon={FalseIcon}
          value={false}
          handleClick={handleClick}
        />
        <ToggleButton
          isToggled={field.value}
          text={trueText}
          Icon={TrueIcon}
          value={true}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default FormLabeledSwitch;