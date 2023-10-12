import { LessonMaterial } from "@/utils/interface";
import dayjs from "dayjs";
import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const TimePicker: FC<{
  state: [LessonMaterial, Dispatch<SetStateAction<LessonMaterial>>];
}> = ({ state }) => {
  const [newData, setNewData] = state;

  const handleDateChange = (newValue: DateValueType) => {
    if (newValue) {
      const time = dayjs(newValue.startDate);
      setNewData({ ...newData, lesson_schedule: time.format() });
    }
  };

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const date = dayjs(newData.lesson_schedule || new Date());
    if (event.target.name === "hour") {
      const removedZero = event.target.value.replace(/^0+/, "");
      const a = date.set("hour", Number(removedZero));
      setNewData({ ...newData, lesson_schedule: a.format() });
      return;
    }

    const removedZero = event.target.value.replace(/^0+/, "");
    const a = date.set("minute", Number(removedZero));
    setNewData({ ...newData, lesson_schedule: a.format() });
    return;
  };

  return (
    <div className="grid grid-flow-col space-x-5">
      <Datepicker
        inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        useRange={false}
        asSingle={true}
        value={{
          startDate: newData.lesson_schedule,
          endDate: newData.lesson_schedule,
        }}
        onChange={handleDateChange}
      />
      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg max-w-[86px] p-2.5">
        <select
          name="hour"
          onChange={handleTimeChange}
          className="px-1 outline-none appearance-none bg-transparent"
        >
          {Array.from({ length: 25 }, (_, i) => (i > 9 ? `${i}` : `0${i}`)).map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>
        <span className="px-1">:</span>
        <select
          name="minutes"
          onChange={handleTimeChange}
          className="px-1 outline-none appearance-none bg-transparent"
        >
          {Array.from({ length: 61 }, (_, i) => (i > 9 ? `${i}` : `0${i}`)).map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
