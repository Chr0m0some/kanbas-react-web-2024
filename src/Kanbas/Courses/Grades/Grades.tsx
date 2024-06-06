import { FaGear } from "react-icons/fa6";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
export default function Grades() {
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
                                <th className="text-center">A1 SETUP <br />Out of 100</th>
                                <th className="text-center">A2 HTML<br />Out of 100</th>
                                <th className="text-center">A3 CSS<br />Out of 100</th>
                                <th className="text-center">A4 BOOTSTRAP<br />Out of 100</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="text-danger text-center">Jamie Adams</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">96.67%</td>
                                <td className="text-center">92.18%</td>
                                <td className="text-center">66.72%</td>
                            </tr>
                            <tr>
                                <th className="text-danger text-center">Christina Allen</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                            </tr>
                            <tr>
                                <th className="text-danger text-center">Sameen Ansari</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                                <td className="text-center">88.03%</td>
                                <td className="text-center">98.99%</td>
                            </tr>
                            <tr>
                                <th className="text-danger text-center">Han Bao</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">96.67%</td>
                                <td className="text-center">98.37%</td>
                                <td className="text-center">100%</td>
                            </tr>
                            <tr>
                                <th className="text-danger text-center">Mahi Sai Srinivasa Bobbili</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">96.67%</td>
                                <td className="text-center">92.18%</td>
                                <td className="text-center">66.72%</td>
                            </tr>
                            <tr>
                                <th className="text-danger text-center">Siran Cao</th>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                                <td className="text-center">100%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}