import { setEventItem } from "@/utils/function";
import { useGetDataProps } from "@/utils/interface";
import { FC, useState } from "react";
import Image from "next/image";
import { defaultState } from "@/utils/constant";
import AddLessonForm from "@/components/curiculum/add-lesson-dropdown.tsx/add-lesson-form";

const AddLesson: FC<
  useGetDataProps & {
    index: number;
  }
> = ({ data, setData, index }) => {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState(defaultState);
  const setDatas = () => {
    const shallowCopy = { ...data };
    shallowCopy.curriculum[index].lesson_material = [
      ...data.curriculum[index].lesson_material,
      newData,
    ];
    setOpen(false);
    setEventItem(shallowCopy);
    setData(shallowCopy);
  };

  return (
    <div className="px-8 mb-5 mt-1 ">
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#7800EF] p-2 rounded-md active:bg-[#7800EF]/80"
        >
          <Image
            src="/plus.svg"
            alt="plus-icon"
            width={20}
            height={20}
            priority
          />
        </button>
        <p className="ml-3 text-[16px] font-[500] leading-[24px] text-[#252A3C]">
          Add Lesson Material
        </p>
      </div>

      <div
        className={`${
          open ? "opacity-100 border" : "h-[0px] opacity-0 border-none"
        } bg-[#FBFAFF] transition-all ease-in-out duration-700 mt-2 rounded-[8px] border max-w-[340px]`}
      >
        {open && (
          <div className="px-5 py-3">
            <p className="text-[16px] font-[500] leading-[24px] text-[#252A3C]">
              Add New
            </p>
            <AddLessonForm state={[newData, setNewData]} submit={setDatas} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLesson;
