import { FaGear } from "react-icons/fa6";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { useParams } from "react-router";
import { users, enrollments, assignments, grades } from "../../Database";
export default function Grades() {
    const { cid } = useParams();
    return (
        <div id="grades" style={{ maxWidth: "900px" }}>
            <div id="gradesButtons" className="d-flex justify-content-end mb-3">
                <button id="wd-add-assignment-group" type="button"
                    className=" btn btn-secondary me-2">
                    <BiImport className="me-2" />
                    Import
                </button>
                <button id="wd-add-assignment" type="button"
                    className=" btn btn-secondary me-2">
                    <BiExport className="me-2" />
                    Export
                </button>
                <button id="wd-settings" type="button"
                    className=" btn btn-secondary">
                    <FaGear />
                </button>
            </div>
            <div id="wd-search-students" className="d-flex mb-4">
                <div className="d-flex flex-column me-5">
                    <label htmlFor="wd-student-names" className="form-label"><strong>Student Names</strong></label>
                    <div id="wd-student-names" className="input-group flex-nowrap">
                        <span className="input-group-text rounded-start border p-2">
                            <CiSearch className='fs-5' />
                        </span>
                        <input type="text" className="form-control rounded-end border" placeholder="Search Students" />
                    </div>
                </div>
                <div id="wd-search-assignments" className="d-flex">
                    <div className="d-flex flex-column">
                        <label htmlFor="wd-assignment-names" className="form-label"><strong>Assignment Names</strong></label>
                        <div id="wd-assignment-names" className="input-group flex-nowrap">
                            <span className="input-group-text rounded-start border p-2">
                                <CiSearch className='fs-5' />
                            </span>
                            <input type="text" className="form-control rounded-end border" placeholder="Search Assignments" />
                        </div>
                    </div>
                </div>
            </div>
            <button id="wd-filter" type="button"
                className=" btn btn-secondary mb-3">
                <CiFilter className="me-2" />
                Apply Filters
            </button>
            <div id="wd-student-table">
                <div className="table-responsive border">
                    <table className="table table-striped m-0">
                        <thead>
                            <tr>
                                <th className="text-center">Student Name</th>
                                {assignments.filter(
                                    (assignment: any) => (assignment.course === cid)
                                ).map((assignment: any) => (
                                    <th key={assignment._id} className="text-center">{assignment._id}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.filter((user: any) => enrollments.some((enrollment: any) =>
                                    enrollment.user === user._id && enrollment.course === cid
                                )).map((user: any) => (
                                    <tr>
                                        <th key={user._id} className="text-danger text-center">{user.firstName + " " + user.lastName}</th>
                                        {grades.filter((grade: any) => (grade.student === user._id && (grade.assignment.charAt(1) === cid?.charAt(4)))
                                        ).map((grade: any) => (
                                            <td key={grade._id} className="text-center">{grade.grade}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}