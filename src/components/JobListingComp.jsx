/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import JobCardComp from "./JobCardComp";

import Spinner from "./Spinner";

const JobListingComp = ({ isHomeComp = false }) => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJobsFunction = async () => {
			try {
				const response = await fetch("/api/jobs");
				const data = await response.json();
				setJobs(data);
			} catch (error) {
				console.log("Error in fetching jobs: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchJobsFunction();
	}, []);

	const recentJobs = isHomeComp ? jobs.slice(0, 3) : jobs;

	return (
		<>
			<section className="bg-blue-50 px-4 py-10">
				<div className="container-xl lg:container m-auto">
					<h2 className="text-3xl font-bold text-indigo-500 mb-12 text-center">
						{isHomeComp ? "Recent Jobs" : "Browse Jobs"}
					</h2>

					{loading ? (
						<Spinner loading={loading} />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{recentJobs.map((job) => (
								<JobCardComp key={job.id} job={job} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default JobListingComp;
