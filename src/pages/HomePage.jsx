import HeroComp from "../components/HeroComp";
import HomeCards from "../components/HomeCardsComp";
import JobListings from "../components/JobListingComp";
import ViewAllJobs from "../components/ViewAllJobsComp";

const HomePage = () => {
	return (
		<>
			<HeroComp />
			<HomeCards />
			<JobListings isHomeComp={true} />
			<ViewAllJobs />
		</>
	);
};

export default HomePage;
