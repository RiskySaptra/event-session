import { setEventItem } from "@/utils/function";
import { useGetDataProps } from "@/utils/interface";
import { FC, useRef } from "react";
import Image from "next/image";

const EditableField: FC<
  useGetDataProps & {
    index: number;
  }
> = ({ data, setData, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const setDatas = (newCuriculumName: string) => {
    const shallowCopy = { ...data };
    shallowCopy.curriculum[index].curriculum_name = newCuriculumName;

    setEventItem(shallowCopy);
    setData(shallowCopy);
  };

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <>
      <p
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        className="text-[17px] md:text-[24px] font-[500] leading-[32px] text-[#252A3C] [contenteditable]:active:bg-black"
        onBlur={(e) => setDatas(e.target.innerHTML)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      >
        {data.curriculum[index].curriculum_name}
      </p>
      <button onClick={handleClick} className="active:bg-gray-50">
        <Image
          src="/edit.svg"
          alt="edit-icon"
          className="ml-2"
          width={20}
          height={20}
          priority
        />
      </button>
    </>
  );
};

export default EditableField;
