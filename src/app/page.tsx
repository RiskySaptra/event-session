"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { _eventData_ } from "../utils/constant";
import LessonMaterial from "@/components/lesson-material";
import { EventData } from "@/utils/interface";
import Curriculum from "@/components/curiculum";
import {
  EventInfo,
  CurriculumSection,
  EventSchedule,
} from "@/components/home/home-components";
import Modal from "@/components/modal";
import { setEventItem } from "@/utils/function";

const getEventItem = () => {
  if (typeof localStorage !== "undefined") {
    const data = localStorage.getItem("data");
    if (!data) return _eventData_;
    const parsed = JSON.parse(data || "");
    return parsed;
  }

  return _eventData_;
};

export default function Home() {
  const [data, setData] = useState<EventData | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setData(getEventItem);
  }, []);

  if (!data)
    return (
      <div className="w-full py-[400px] flex justify-center">Loading...</div>
    );

  return (
    <main>
      <div className="px-20 mb-32">
        <div className="flex justify-between items-center">
          <EventInfo data={data} />
          <div>
            <button
              type="button"
              className="py-[10px] px-[16px] font-[400] text-[16px] text-[#6F32D2] rounded-lg border-[1px] border-[#6F32D2]"
            >
              <Image
                src="/preview.svg"
                alt="preview-icon"
                className="inline-block mr-3"
                width={24}
                height={24}
                priority
              />
              Preview
            </button>
          </div>
        </div>

        <CurriculumSection />

        <EventSchedule data={data} />

        <Curriculum state={[data, setData]}>
          {(props) => <LessonMaterial {...props} />}
        </Curriculum>

        <AddSessionModal
          modalState={[openModal, setOpenModal]}
          state={[data, setData]}
        />
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
      </div>
    </main>
  );
}

const defaultData = {
  curriculum_id: (Math.random() + 1).toString(36).substring(7),
  curriculum_name: "default name",
  lesson_material: [],
};

const AddSessionModal = ({ modalState, state }: any) => {
  const [openModal, setOpenModal] = modalState;
  const [data, setData] = state;

  const [newData, setNewData] = useState(defaultData);

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
