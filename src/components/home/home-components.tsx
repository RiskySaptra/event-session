import Modal from "@/components/modal";
import { setEventItem } from "@/utils/function";
import { Curriculum, EventData, HomeProps } from "@/utils/interface";
import dayjs from "dayjs";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";
import { defaultData } from "@/utils/constant";

export const EventInfo: FC<HomeProps> = ({ data }) => {
  return (
    <div className="grid grid-flow-col py-14 space-x-10">
      <p className="text-[32px] font-[500] leading-[32px] text-[#252A3C]">
        {data.event_name}
      </p>
      <div className="flex items-end">
        <p className="text-[12px] leading-[16.8px] font-[500] text-[#8189A2]">
          Last edited {dayjs(data.last_edited).format("DD MMMM YYYY | HH:mm")}
        </p>
      </div>
    </div>
  );
};

export function CurriculumSection() {
  return (
    <div className="border-b-2 border-[#DFDFDF]">
      <div className="border-b-2 border-[#6F32D2] w-fit pb-3">
        <p className="text-[#6F32D2] text-[16px] font-[500] leading-[22.4px]">
          Curriculum
        </p>
      </div>
    </div>
  );
}

export function EventSchedule({ data }: HomeProps) {
  return (
    <div className="border-2 p-[24px] mt-10 rounded-[8px]">
      <p className="text-[16px] font-[500] leading-[24px] text-[#252A3C]">
        Event Schedule:{" "}
        {dayjs(data.event_schedule).format("DD MMMM YYYY, HH:mm")}
      </p>
    </div>
  );
}

export const AddSessionModal: FC<{
  state: [EventData, Dispatch<SetStateAction<EventData | undefined>>];
}> = ({ state }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<Curriculum>(defaultData);
  const [data, setData] = state;

  const submit = () => {
    const shallowCopy = { ...data };
    shallowCopy.curriculum = [...shallowCopy.curriculum, newData];
    setOpenModal(false);
    setData(shallowCopy);
    setEventItem(shallowCopy);
  };

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex justify-end mt-7">
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="py-[10px] px-[16px] font-[400] text-[16px] text-white rounded-lg bg-[#6F32D2]"
        >
          <Image
            src="/plus.svg"
            alt="plus-icon"
            className="inline-block mr-3 text-white"
            width={24}
            height={24}
            priority
          />
          Add Session
        </button>
      </div>
      <Modal onClose={() => setOpenModal(false)} isOpen={openModal}>
        <p className="mb-3 text-[18px] font-[600] leading-[24px] text-[#252A3C]">
          Add New Session
        </p>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Session Name
          </label>
          <input
            type="text"
            id="first_name"
            name="curriculum_name"
            onChange={handleInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="eg. Session 1"
            required
          />
        </div>
        <button
          type="button"
          onClick={() => submit()}
          className="mt-4 py-[10px] px-[16px] font-[400] text-[12px] text-white rounded-lg bg-[#6F32D2]"
        >
          Add Lesson
        </button>
      </Modal>
    </>
  );
};
