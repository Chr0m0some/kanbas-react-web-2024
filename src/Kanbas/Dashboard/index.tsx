import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import * as client from "../Courses/People/client";
import { setCurrentUser } from "../Account/reducer";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [localUser, setLocalUser] = useState(currentUser);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const enrollUser = async (courseNum: String) => {
    if (localUser.enrolled.includes(courseNum)) {
      setError("You are already enrolled in this course");
      return;
    }
    const updatedEnrolled = [...localUser.enrolled, courseNum];
    const updatedUser = { ...localUser, enrolled: updatedEnrolled };
    setLocalUser(updatedUser);
    const response = await client.updateUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
  };
  const unEnrollUser = async (courseNum: String) => {
    const updatedEnrolled = localUser.enrolled.filter(
      (num: String) => num !== courseNum
    );
    const updatedUser = { ...localUser, enrolled: updatedEnrolled };
    setLocalUser(updatedUser);
    const response = await client.updateUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
  };
  const fetchUser = async () => {
    const user = await client.findUserById(currentUser._id);
    setLocalUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <hr />
      {currentUser.role === "FACULTY" && (
        <div id="wd-faculty-nav">
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                addNewCourse();
                enrollUser(course.number);
              }}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <input
            value={course.number}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      {currentUser.role === "STUDENT" && (
        <div id="wd-student-nav">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Enroll in Course
            </button>
            <ul className="dropdown-menu">
              {courses.map((course) => (
                <li key={course.number}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => enrollUser(course.number)}
                  >
                    {course.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
      )}
      <h2 id="wd-dashboard-published">
        Enrolled Courses ({localUser.enrolled?.length || 0})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course: any) => localUser.enrolled.includes(course.number))
            .map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course.number}
              >
                <Link
                  to={`/Kanbas/Courses/${course.number}/Home`}
                  className="text-decoration-none"
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/NEU_logo.png" height="{160}" alt="NEU Logo" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/Kanbas/Courses/${course.number}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      {currentUser.role === "FACULTY" && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course.number);
                            unEnrollUser(course.number);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      )}
                      {currentUser.role === "FACULTY" && (
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
