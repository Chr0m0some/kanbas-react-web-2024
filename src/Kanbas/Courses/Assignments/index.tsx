import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs"
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import "./index.css";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls /><br /><br /><br /><br />
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li id="wd-assignments-section" className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentControlButtons />
          </div>
          <ul id="wd-assignments" className="list-group rounded-0">
            <li id="wd-assignment" className="list-group-item p-3 ps-2">
              <div id="wd-assignment-content" className="row align-items-center">
                <div className="col">
                  <div className="row align-items-center flex-nowrap">
                    <div className="col-auto">
                      <BsGripVertical className="fs-3" />
                    </div>
                    <div className="col-auto">
                      <a className="wd-assignment-link link-body-emphasis"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A1
                      </a>
                      <p className="mb-1 text-muted fs-6"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | <br /><strong>Due</strong> May 27 at 11:59pm | 100 pts</p>
                    </div>
                  </div>
                </div>
                <div id="wd-lesson-control-buttons" className="col">
                  <LessonControlButtons />
                </div>
              </div>
            </li>
            <li id="wd-assignment" className="list-group-item p-3 ps-1">
              <div id="wd-assignment-content" className="row align-items-center">
                <div className="col">
                  <div className="row align-items-center flex-nowrap">
                    <div className="col-auto">
                      <BsGripVertical className="fs-3" />
                    </div>
                    <div className="col-auto">
                      <a className="wd-assignment-link link-body-emphasis"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A2
                      </a>
                      <p className="mb-1 text-muted fs-6"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | <br /><strong>Due</strong> May 13 at 11:59pm | 100 pts</p>
                    </div>
                  </div>
                </div>
                <div id="wd-lesson-control-buttons" className="col">
                  <LessonControlButtons />
                </div>
              </div>
            </li>
            <li id="wd-assignment" className="list-group-item p-3 ps-1">
              <div id="wd-assignment-content" className="row align-items-center">
                <div className="col">
                  <div className="row align-items-center flex-nowrap">
                    <div className="col-auto">
                      <BsGripVertical className="fs-3" />
                    </div>
                    <div className="col-auto">
                      <a className="wd-assignment-link link-body-emphasis"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A3
                      </a>
                      <p className="mb-1 text-muted fs-6"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am | <br /><strong>Due</strong> May 20 at 11:59pm | 100 pts</p>
                    </div>
                  </div>
                </div>
                <div id="wd-lesson-control-buttons" className="col">
                  <LessonControlButtons />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
