import { EventData } from "@/utils/interface";
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
