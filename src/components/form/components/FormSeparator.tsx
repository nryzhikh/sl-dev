import React from 'react';
import FormPopover from './FormTooltip';

interface SeparatorProps {
  icon?: React.ReactNode;
  name?: string;
  tooltip?: string;
}

const FormSeparator: React.FC<SeparatorProps> = ({ icon, name, tooltip }) => (
  <div className="relative py-3">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-between items-center text-sm">
      <div className="text-muted-foreground text-center space-x-2 flex-grow flex justify-between items-center ">
        {icon && (
        <div className="bg-white pr-1">
          {icon}
        </div>
        )}
        <div className='bg-white px-1'>
          <span className="text-xs bg-white ">{name}</span>
        </div>
        {tooltip && (
        <div className="bg-white pl-2 pr-1">
          <FormPopover description={tooltip} />
        </div>
        )}
      </div>
    </div>
  </div>
);

export default FormSeparator;