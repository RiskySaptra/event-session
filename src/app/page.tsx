"use client";
import { useEffect, useState } from "react";
import { _eventData_ } from "../utils/constant";
import LessonMaterial from "@/components/lesson-material";
import { EventData } from "@/utils/interface";
import Curriculum from "@/components/curiculum/curiculum";
import Image from "next/image";
import {
  EventInfo,
  CurriculumSection,
  EventSchedule,
  AddSessionModal,
} from "@/components/home/home-components";

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

  useEffect(() => {
    setData(getEventItem);
  }, []);

  if (!data)
    return (
      <div className="w-full pt-[300px] flex justify-center">Loading...</div>
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
          {(props) => <LessonMaterial {...props} state={[data, setData]} />}
        </Curriculum>
        <AddSessionModal state={[data, setData]} />
        <button
          className="bg-green-400 p-1 rounded-md text-sm"
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
