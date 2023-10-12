import { useState } from "react";
import Image from "next/image";

const DeleteButton = ({
  onDelete,
  icon,
}: {
  onDelete: () => void;
  icon: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#F6F8FC] rounded-md ml-3 flex justify-center items-center w-[36px] h-[36px]"
      >
        <Image
          src={`/${icon}-dot.svg`}
          alt="options-icon"
          width={18}
          height={18}
          className="w-auto h-auto"
          priority
        />
      </button>
      {open && (
        <div
          onClick={onDelete}
          className="bg-white border-[1px] absolute bottom-[-40px] z-10 rounded-md p-1"
        >
          <button className="text-gray-500 hover:text-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
