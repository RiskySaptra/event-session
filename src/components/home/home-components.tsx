import { HomeProps } from "@/utils/interface";
import dayjs from "dayjs";
import { FC } from "react";

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
