import FormPopover from "@/components/form/components/FormTooltip";

interface FormSectionDividerProps {
  title: string;
  popover?: string;
}

const FormSectionDivider = ({ title, popover }: FormSectionDividerProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-between items-center text-xs uppercase">
        <div className="px-2 text-muted-foreground text-center flex-grow">

          <span className="bg-white">
          {title}
          </span>
          </div>
          <div className="bg-white">
        <FormPopover description={popover} />
        </div>
      </div>
    </div>
  );
};

export default FormSectionDivider;