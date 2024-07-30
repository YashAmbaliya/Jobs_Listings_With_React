import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import SingleJobPage, { jobLoader } from "./pages/SingleJobPage";
import AddNewJobPage from "./pages/AddNewJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
	// Adding New Job
	const createNewJob = async (newJob) => {
		await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});
		return;
	};

	//Deleting Job
	const deleteOldJob = async (id) => {
		await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});
		return;
	};

	// Updating New Job
	const updateOldJob = async (updatedJob) => {
		await fetch(`/api/jobs/${updatedJob.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedJob),
		});
		return;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route
					path="/jobs/:id"
					element={<SingleJobPage deleteJob={deleteOldJob} />}
					loader={jobLoader}
				/>
				<Route
					path="/add-job"
					element={<AddNewJobPage createJob={createNewJob} />}
				/>
				<Route
					path="/jobs/edit/:id"
					element={<EditJobPage updateJob={updateOldJob} />}
					loader={jobLoader}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
