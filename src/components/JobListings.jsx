import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import JobListing from "./JobListing";

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit = 3;
    const tempJobs = [];

    useEffect(() => {
        const fetchJobs = async () => {
            const apiURL =
                "https://job-listing-api-84p2.onrender.com/api/job/getAllJobs";
            try {
                const res = await fetch(apiURL);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (isHome) {
        for (let i = 0; i < limit; i++) {
            tempJobs.push(jobs[i]);
        }

        if (JSON.stringify(tempJobs) !== JSON.stringify(jobs)) {
            setJobs(tempJobs);
        }
    }

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? "Recent Jobs" : "Browse Jobs"}
                </h2>
                {loading ? (
                    <div>
                        <Spinner loading={loading} />
                        <div className="h-[110vh]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobListing key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;
