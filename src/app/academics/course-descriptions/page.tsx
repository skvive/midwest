import CourseDescriptionsClient from "./CourseDescriptionsClient";

export const metadata = {
  title: "Course Descriptions",
  description: "Midwest University course catalog descriptions by program.",
};

export default function CourseDescriptionsPage() {
  return <CourseDescriptionsClient />;
}
