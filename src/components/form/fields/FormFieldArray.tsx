
import { Input } from "@/components/ui/input";
import {
  DragHandleDots2Icon,
  TrashIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
// import AnimationWrapper from "@/components/form/animation/AnimationWrapper";
import { useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { DndContext } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToParentElement
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import React from "react";

type UseSortableReturn = Omit<
  ReturnType<typeof useSortable>,
  'setNodeRef' | 'transform' | 'transition'
>


function SortableItem(props: {
  id: string
  children: (args: UseSortableReturn) => React.ReactNode
}) {
  const { setNodeRef, transform, transition, ...rest } = useSortable({
    id: props.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children({ ...rest })}
    </div>
  )
}



const iosApps = [
  {
    name: "Online",
    url: "btripsexpenses://"
  },
  {
    name: "СБОЛ",
    url: "sbolonline://"
  },
  {
    name: "СберБанк",
    url: "sberbankonline://"
  },
]

interface FormInputProps {
  label: string,
  placeholder?: string,
  tooltip?: string,
  fieldName: string,
  removeSpaces?: boolean,
  isFromTable?: boolean,
}


const FormFieldArray = ({
  fieldName,
  placeholder,
  label,
  isFromTable
}: FormInputProps) => {

  const { control, trigger } = useFormContext();

  const {
    fields,
    append,
    remove,
    move,
    replace,
  } = useFieldArray({
    name: fieldName,
    control: control,
  });

  const multi_app_ios = useWatch({ control, name: "multi_app_ios" });
  const ios_dp = useWatch({ control, name: "ios_dp" });

  useEffect(() => {
    trigger(`${fieldName}[0].value`);
    trigger(`${fieldName}[1].value`);
    trigger(`${fieldName}[2].value`);
    trigger(`${fieldName}[3].value`);
    trigger(`${fieldName}[4].value`);
    // Trigger validation on render
  }, [trigger, fields]);

  const isArrayEqualTo = (arr: any[], compareTo: any[]) => {
    if (arr.length !== compareTo.length) return false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value !== compareTo[i].value) return false;
    }
    return true;
  }


  useEffect(() => {
    if (multi_app_ios && isArrayEqualTo(fields, [{ value: "" },])) {

      if (ios_dp && ios_dp.startsWith(iosApps[2].url)) {
        const values = [
          { value: iosApps[0].url + 'sbolonline/' + ios_dp.split('://')[1] },
          { value: iosApps[1].url + ios_dp.split('://')[1] },
          { value: ios_dp },
        ]
        replace(values)
        trigger(`${fieldName}[0].value`);
      } else if (ios_dp && ios_dp.startsWith(iosApps[1].url)) {
        const values = [
          { value: ios_dp },
          { value: iosApps[0].url + ios_dp.split('://')[1] }
        ]
        replace(values);
      } else if (ios_dp && ios_dp.startsWith(iosApps[0].url)) {
        const values = [
          { value: ios_dp }
        ]
        replace(values);
      }


    } else if (!multi_app_ios) {
      const values = [
        { value: "" },
      ]
      replace(values);
      console.log(isFromTable)
    }
  }, [
    multi_app_ios,
  ]);


  // const isItemVisible = (itemId: string) => {
  //   return fields.some((item) => item.id === itemId);
  // };




  const modifiers = [restrictToVerticalAxis, restrictToParentElement]



  return (
    <>
      <div className=" ml-1 flex justify-between items-end">

        <Label className="text-muted-foreground text-xs">
          {label}
        </Label>
      </div>

      <DndContext
        modifiers={modifiers}
        onDragEnd={(event) => {
          const { active, over } = event
          if (over && active.id !== over?.id) {
            const activeIndex = active.data.current?.sortable?.index
            const overIndex = over.data.current?.sortable?.index
            console.log({ activeIndex, overIndex })
            if (activeIndex !== undefined && overIndex !== undefined) {
              move(activeIndex, overIndex)
            }
          }
        }}
      >
        <SortableContext items={fields}>
          {fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <SortableItem id={field.id}>
                  {({ attributes, listeners }) => (

                      <div className="flex items-center justify-between pb-1 space-y-0 space-x-1">
                        <div
                          {...attributes}
                          {...listeners}
                        >
                          <DragHandleDots2Icon className="h-4 w-4" />
                        </div>

                        <FormField
                          control={control}
                          name={`ios_apps_dp.${index}.value`}
                          render={({ field, fieldState }) => (
                            <>
                              <Button
                                variant="ghost"
                                type="button"
                                className="h-8 w-10 p-0 border bg-white"
                                disabled={
                                  index !== fields.length - 1 ||
                                  index === 2
                                }
                                onClick={() => {
                                  if (index < 2)
                                    append({ value: "" });
                                }}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>

                              <Input
                                placeholder={
                                  placeholder
                                }
                                {...field}
                                className={`${fieldState.error ? "focus-visible:ring-0 border-destructive" : ""
                                  } bg-white my-1`}
                              />
                              <Button
                                variant="ghost"
                                type="button"
                                className="h-9 w-11 p-0 border bg-white"
                                disabled={fields.length <= 1}
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        />
                      </div>

                  )}
                </SortableItem>
              </React.Fragment>
            )
          })}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default FormFieldArray;



