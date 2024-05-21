export default function AssignmentEditor() {
	return (
		<div id="wd-assignments-editor">
			<label htmlFor="wd-name">Assignment Name</label>
			<input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
			<textarea id="wd-description" cols={50} rows={10}>
				The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
			</textarea>
			<br />
			<table>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-points">Points</label>
					</td>
					<td>
						<input id="wd-points" value={100} />
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-group">Assignment Group</label>
					</td>
					<td>
						<select id="wd-group">
							<option value="QUIZZES">Quizzes</option>
							<option value="EXAMS">Exams</option>
							<option value="PROJECT">Project</option>
							<option selected value="ASSIGNMENTS">
								Assignments</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-display-grade-as">Display Grade as</label>
					</td>
					<td>
						<select id="wd-display-grade-as">
							<option value="Letter">Letter</option>
							<option value="GPA">GPA</option>
							<option selected value="PERCENTAGE">
								Percentage</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-submission-type">Submission Type</label>
					</td>
					<td>
						<select id="wd-submission-type">
							<option value="WRITTEN">Written</option>
							<option selected value="ONLINE">
								Online</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label>Online Entry Options</label>
					</td>
					<td>
						<br />
						<input type="checkbox" name="check-entry" id="wd-text-entry" />
						<label htmlFor="wd-text-entry">Text Entry</label>
						<br />
						<input type="checkbox" name="check-entry" id="wd-website-url" />
						<label htmlFor="wd-website-url">Website URL</label>
						<br />
						<input type="checkbox" name="check-entry" id="wd-media-recordings" />
						<label htmlFor="wd-media-recordings">Media Recordings</label>
						<br />
						<input type="checkbox" name="check-entry" id="wd-student-annotation" />
						<label htmlFor="wd-student-annotation">Student Annotation</label>
						<br />
						<input type="checkbox" name="check-entry" id="wd-file-upload" />
						<label htmlFor="wd-file-upload">File Uploads</label>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-assign-to">Assign to</label>
					</td>
					<td>
						<input id="wd-assign-to" value={"Everyone"} />
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-due-date">Due</label>
					</td>
					<td>
						<input
							type="date"
							min="2024-05-13"
							max="2024-08-24"
							id="wd-due-date"
							value="2024-05-13"
						/>
					</td>
				</tr>
				<tr>
					<td align="right" valign="top">
						<label htmlFor="wd-available-from">Available From</label>
						<br />
						<input
							type="date"
							min="2024-05-06"
							max="2024-08-24"
							id="wd-available-from"
							value="2024-05-06"
						/>
					</td>
					<td>
						<label htmlFor="wd-available-until">Until</label>
						<br />
						<input
							type="date"
							min="2024-05-06"
							max="2024-08-24"
							id="wd-available-until"
							value="2024-05-20"
						/>
					</td>
				</tr>
			</table>
			<hr />
			<button>Cancel</button> <button>Save</button>
		</div>
	);
}
