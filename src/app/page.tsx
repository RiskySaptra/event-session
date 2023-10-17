"use client";
import { _eventData_ } from "../utils/constant";
import LessonMaterial from "@/components/lesson-material";
import Curriculum from "@/components/curiculum/curiculum";
import Image from "next/image";
import {
  EventInfo,
  CurriculumSection,
  EventSchedule,
  AddSessionModal,
} from "@/components/home/home-components";
import { useGetData } from "@/utils/hooks";

export default function Home() {
  const dataHooks = useGetData();

  if (dataHooks.isLoading)
    return (
      <div className="w-full pt-[300px] flex justify-center">Loading...</div>
    );

  return (
    <main>
      <div className="md:px-20 px-5 mb-32">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <EventInfo {...dataHooks.data} />
          <div className="mb-5 md:mb-0">
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
        <EventSchedule {...dataHooks.data} />
        <Curriculum {...dataHooks}>
          {(props) => <LessonMaterial {...props} />}
        </Curriculum>

        <AddSessionModal {...dataHooks} />

        <button
          className="bg-green-400 p-1 mt-20 rounded-md text-sm text-white"
          onClick={() => {
            localStorage.removeItem("data");
            location.reload();
          }}
        >
          Reset Data (reset to default)
        </button>
      </div>
    </main>
  );
}
