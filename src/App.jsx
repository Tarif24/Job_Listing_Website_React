import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
    // Add a new job
    const addJob = async (newJob) => {
        const res = await fetch(
            "https://job-listing-api-84p2.onrender.com/api/job/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newJob),
            }
        );
        return;
    };

    // Delete a job
    const deleteJob = async (id) => {
        const res = await fetch(
            `https://job-listing-api-84p2.onrender.com/api/job/delete/${id}`,
            {
                method: "DELETE",
            }
        );
        return;
    };

    // Update a job
    const updateJob = async (updatedJob) => {
        const res = await fetch(
            `https://job-listing-api-84p2.onrender.com/api/job/update/${updatedJob.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedJob),
            }
        );
        return;
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route
                    path="/job/:id"
                    element={<JobPage deleteJob={deleteJob} />}
                    loader={jobLoader}
                />
                <Route
                    path="/add-job"
                    element={<AddJobPage addJobSubmit={addJob} />}
                />
                <Route
                    path="/edit-job/:id"
                    element={<EditJobPage updateJobSubmit={updateJob} />}
                    loader={jobLoader}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
