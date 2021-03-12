import home from "./home";
import login from "./login";
import tuitions from "./tuitions";
import payTuition from "./payTuition";
import majors from "./majors";
import classes from "./classes";
import officers from "./officers";
import students from "./students";
import paymentHistory from "./paymentHistory";

const routes = [
  ...home,
  ...login,
  ...tuitions,
  ...payTuition,
  ...majors,
  ...classes,
  ...officers,
  ...students,
  ...paymentHistory,
];

export default routes;
