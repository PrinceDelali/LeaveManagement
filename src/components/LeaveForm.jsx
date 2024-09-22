import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { doc, serverTimestamp, setDoc, onSnapshot } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LeaveForm = ({ id }) => {
  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // State for notification
  const [leaveStatus, setLeaveStatus] = useState(null); // Real-time leave status
  const navigate = useNavigate(); // Use navigate to handle navigation

  // Real-time listener for leave status updates
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "leave-request", id), (doc) => {
      if (doc.exists()) {
        setLeaveStatus(doc.data().status);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "leave-request", id), {
        ...data,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      // Show success notification
      setNotification("Your leave request has been submitted successfully!");
    } catch (error) {
      console.log(error);
      // Show error notification
      setNotification("There was an error submitting your leave request.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleNavigate = () => {
    navigate("/manager-dashboard"); // Navigate to the Manager's Dashboard
  };

  return (
    <div className="min-h-screen p-10">
      <Typography variant="h4" color="blue-gray">
        Request A Leave
      </Typography>

      {/* Notification message, only displayed after submission */}
      {notification && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <span>{notification}</span>
        </div>
      )}

      {/* Real-time status, only shown when status is available */}
      {leaveStatus && (
        <div className="mt-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <span>Your leave request status: {leaveStatus}</span>
        </div>
      )}

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-black font-extrabold">Username</label>
          <Input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Email</label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Position</label>
          <Input
            type="text"
            {...register("position", { required: "Position is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Type of Leave</label>
          <select
            {...register("leaveType", { required: "Leave type is required" })}
            className="w-full p-2 border border-gray-500 bg-transparent rounded mt-2"
          >
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="personal">Personal Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Start Date</label>
          <Input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">End Date</label>
          <Input
            type="date"
            {...register("endDate", { required: "End date is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Reasons for Leave</label>
          <Textarea
            {...register("message", { required: "Message is required" })}
          />
        </div>
        <Button
          className="mt-5 flex justify-center"
          fullWidth
          color="blue"
          type="submit"
          loading={loading}
        >
          Submit Request
        </Button>
      </form>

      {/* Button to navigate to the Manager's Dashboard */}
      <Button
        className="mt-5 flex justify-center"
        fullWidth
        color="green"
        onClick={handleNavigate}
      >
       Manager Dashboard
      </Button>
    </div>
  );
};

export default LeaveForm;
