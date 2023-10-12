import TimePicker from "@/components/curiculum/add-lesson-dropdown.tsx/add-lesson-time-picker";
import { LessonMaterial } from "@/utils/interface";
import { FC, ChangeEvent, SetStateAction, Dispatch } from "react";

const AddLessonForm: FC<{
  state: [LessonMaterial, Dispatch<SetStateAction<LessonMaterial>>];
  submit: () => void;
}> = ({ state, submit }) => {
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

export default AddLessonForm;
