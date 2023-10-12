import { CurriculumProps, EventData } from "@/utils/interface";
import {
  DragStart,
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { reorder, setEventItem } from "@/utils/function";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

const Curriculum: FC<CurriculumProps> = ({ state, children }) => {
  const [data, setData] = state;
  const [activeDropable, setActiveDropable] = useState("");

  const onDragStart = (task: DragStart) => {
    setActiveDropable(task.source.droppableId);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const shallowCopy = { ...data };

    if (result.type === "group") {
      const updateCuriculum = reorder(
        data.curriculum,
        result.source.index,
        result.destination.index
      );

      shallowCopy.curriculum = updateCuriculum;
      setEventItem(shallowCopy);
      setData(shallowCopy);
      return;
    }

    const storeSourceIndex = shallowCopy.curriculum.findIndex(
      (curriculum) => curriculum.curriculum_id === result.source.droppableId
    );

    const updatedLessons = reorder(
      data.curriculum[storeSourceIndex].lesson_material,
      result.source.index,
      result.destination.index
    );

    shallowCopy.curriculum[storeSourceIndex].lesson_material = updatedLessons;
    setEventItem(shallowCopy);
    setData(shallowCopy);
    return;
  };

  const getListStyle = (isDraggingOver: boolean) =>
    isDraggingOver ? "bg-gray-50 rounded-[8px]" : "rounded-[8px]";
  const getItemStyle = (isDragging: boolean) =>
    isDragging
      ? "bg-white mt-8 border-2 border-[#7800EF] rounded-[8px]"
      : "bg-white mt-8 border-2 rounded-[8px]";

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="curiculum" type="group">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListStyle(snapshot.isDraggingOver)}
          >
            {data.curriculum.map((session, index) => (
              <Draggable
                key={session.curriculum_id}
                draggableId={session.curriculum_id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemStyle(snapshot.isDragging)}
                    style={provided.draggableProps.style}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center px-4 pt-4">
                        <Image
                          src="/handle-icon.svg"
                          alt="handle-icon"
                          className="mr-2"
                          width={22.97}
                          height={24}
                          priority
                        />
                        <EditableField state={[data, setData]} index={index} />
                      </div>

                      <div className="flex px-8 pt-4 pb-2">
                        <button className="bg-[#F6F8FC] py-4 px-[9px] rounded-md ml-3">
                          <Image
                            src="/horizontal-dot.svg"
                            alt="options-icon"
                            width={18}
                            height={18}
                            priority
                          />
                        </button>
                      </div>
                    </div>

                    {children({
                      ...session,
                      isDisabeld: session.curriculum_id !== activeDropable,
                    })}

                    <AddLesson state={[data, setData]} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const defaultState = {
  lesson_id: (Math.random() + 1).toString(36).substring(7),
  lesson_name: "",
  lesson_type: "",
  is_required: false,
  is_previewable: false,
  lesson_schedule: "",
  lesson_duration: 0,
  is_downloadable: true,
};

const AddLesson: FC<{
  state: [EventData, Dispatch<SetStateAction<EventData | undefined>>];
  index: number;
}> = ({ state, index }) => {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState(defaultState);
  const [data, setData] = state;

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

const AddLessonForm: FC<{ state: any; submit: any }> = ({ state, submit }) => {
  const [newData, setNewData] = state;

  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, [e.target.name]: e.target.checked });
  };

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "lesson_duration") {
      const seconds = Number(e.target.value) * 60;
      setNewData({ ...newData, [e.target.name]: seconds });
      return;
    }
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  return (
    <form className="py-3 grid-flow-col space-y-3">
      <label
        htmlFor="lessonType"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Lesson Type
      </label>
      <select
        id="lessonType"
        name="lesson_type"
        onChange={handleSelect}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose</option>
        <option value="video">Video</option>
        <option value="onsite">Onsite</option>
      </select>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Lesson Name
        </label>
        <input
          type="text"
          id="first_name"
          name="lesson_name"
          onChange={handleInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="eg. How to create article"
          required
        />
      </div>
      <div className="flex space-x-5">
        <label htmlFor="Required" className="flex cursor-pointer items-center">
          <div className="relative">
            <input
              id="Required"
              type="checkbox"
              name="is_required"
              defaultChecked={newData.is_required}
              onChange={handleCheck}
              className="sr-only"
            />
            <div className="h-4 w-10 rounded-full bg-gray-400 shadow-inner"></div>
            <div className="dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition"></div>
          </div>
          <div className="ml-3 block text-sm font-medium text-gray-900">
            Required
          </div>
        </label>
        <label
          htmlFor="Previewable"
          className="flex cursor-pointer items-center"
        >
          <div className="relative">
            <input
              id="Previewable"
              type="checkbox"
              name="is_previewable"
              defaultChecked={newData.is_previewable}
              onChange={handleCheck}
              className="sr-only"
            />
            <div className="h-4 w-10 rounded-full bg-gray-400 shadow-inner"></div>
            <div className="dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition"></div>
          </div>
          <div className="ml-3 block text-sm font-medium text-gray-900">
            Previewable
          </div>
        </label>
      </div>

      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Duration (in minute)
        </label>
        <input
          type="number"
          id="first_name"
          name="lesson_duration"
          onChange={handleInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="eg. 60 (1 hour of lesson)"
          required
        />
      </div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Lesson Schedule
        </label>
        <TimePicker state={[newData, setNewData]} />
      </div>
      <label
        htmlFor="Downloadable"
        className="flex cursor-pointer items-center"
      >
        <div className="relative">
          <input
            id="Downloadable"
            type="checkbox"
            name="is_downloadable"
            defaultChecked={newData.is_downloadable}
            onChange={handleCheck}
            className="sr-only"
          />
          <div className="h-4 w-10 rounded-full bg-gray-400 shadow-inner"></div>
          <div className="dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition"></div>
        </div>
        <div className="ml-3 block text-sm font-medium text-gray-900">
          Downloadable
        </div>
      </label>
      <button
        type="button"
        onClick={() => submit()}
        className="py-[10px] px-[16px] font-[400] text-[12px] text-white rounded-lg bg-[#6F32D2]"
      >
        Add Lesson
      </button>
    </form>
  );
};

const TimePicker: FC<{ state: any }> = ({ state }) => {
  const [newData, setNewData] = state;

  const handleDateChange = (newValue: any) => {
    const time = dayjs(newValue.startDate);
    setNewData({ ...newData, lesson_schedule: time.format() });
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
          {Array.from({ length: 13 }, (_, i) => (i > 9 ? `${i}` : `0${i}`)).map(
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

const EditableField: FC<{
  state: [EventData, Dispatch<SetStateAction<EventData | undefined>>];
  index: number;
}> = ({ state, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = state;

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
        className="text-[24px] font-[500] leading-[32px] text-[#252A3C] [contenteditable]:active:bg-black"
        onBlur={(e) => setDatas(e.target.innerHTML)}
        // onFocus={(e) => console.log(e.target.innerHTML, "start")}
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

export default Curriculum;
