import { Curriculum, EventData, LessonMaterial } from "@/utils/interface";
export const _eventData_: EventData = {
  event_name: "Belajar dan praktek cinematic videography",
  last_edited: "2021-10-18T13:23:00.000",
  event_schedule: "2021-10-24T16:30:00.000",
  curriculum: [
    {
      curriculum_id: "curiculum_a",
      curriculum_name: "Session 1",
      lesson_material: [
        {
          lesson_id: "a",
          lesson_name: "Judul video",
          lesson_type: "video",
          is_required: true,
          is_previewable: true,
          lesson_schedule: "2021-10-24T16:30:00.000",
          lesson_duration: 390,
          is_downloadable: true,
        },
        {
          lesson_id: "b",
          lesson_name: "Judul video",
          lesson_type: "video",
          is_required: true,
          is_previewable: false,
          lesson_schedule: "2021-10-25T16:30:00.000",
          lesson_duration: 390,
          is_downloadable: true,
        },
        {
          lesson_id: "c",
          lesson_name: "Judul Onsite",
          lesson_type: "onsite",
          is_required: true,
          is_previewable: false,
          lesson_schedule: "2021-10-26T16:30:00.000",
          lesson_duration: 390,
          is_downloadable: true,
        },
      ],
    },
  ],
};

export const defaultData: Curriculum = {
  curriculum_id: (Math.random() + 1).toString(36).substring(7),
  curriculum_name: "default name",
  lesson_material: [],
};

export const defaultState: LessonMaterial = {
  lesson_id: (Math.random() + 1).toString(36).substring(7),
  lesson_name: "",
  lesson_type: "",
  is_required: false,
  is_previewable: false,
  lesson_schedule: "",
  lesson_duration: 0,
  is_downloadable: true,
};
