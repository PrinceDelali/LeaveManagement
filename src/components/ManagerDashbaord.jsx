// ManagerDashboard.js
import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Button, Typography } from "@material-tailwind/react";
import { db } from "../firebase/config"; // Firebase config file
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ManagerDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for navigation

  // Fetch leave requests from Firebase
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "leave-request"));
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ ...doc.data(), id: doc.id });
      });
      setLeaveRequests(requests);
    } catch (error) {
      console.error("Error fetching leave requests: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Accept or Reject a leave request
  const handleUpdateStatus = async (id, status) => {
    try {
      const requestRef = doc(db, "leave-request", id);
      await updateDoc(requestRef, { status });
      alert(`Leave request has been ${status}.`);
      fetchLeaveRequests();
    } catch (error) {
      console.log("Error updating leave request: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto">
        <Typography variant="h4" color="blue-gray" className="text-center mb-8">
          Manage Leave Requests
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : leaveRequests.length > 0 ? (
          leaveRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white p-6 mb-4 border border-gray-300 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <div className="border-b mb-4 pb-2">
                <Typography variant="h6" color="blue-gray">
                  {request.username} ({request.email})
                </Typography>
                <Typography className="text-sm text-gray-500">
                  {request.position}
                </Typography>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Leave Type:</span>
                  <span>{request.leaveType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Start Date:</span>
                  <span>{request.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">End Date:</span>
                  <span>{request.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Reason:</span>
                  <span>{request.message}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span className={`font-bold ${request.status === "accepted" ? 'text-green-600' : request.status === "rejected" ? 'text-red-600' : 'text-yellow-600'}`}>
                    {request.status}
                  </span>
                </div>
              </div>

              {/* Accept and Reject buttons */}
              {request.status === "pending" && (
                <div className="mt-4 flex justify-between">
                  <Button
                    color="green"
                    onClick={() => handleUpdateStatus(request.id, "accepted")}
                    className="flex-1 mr-2"
                  >
                    Accept
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleUpdateStatus(request.id, "rejected")}
                    className="flex-1"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <Typography className="text-center">No pending leave requests.</Typography>
        )}

        {/* Button to navigate to Employee Dashboard */}
        <div className="mt-8">
          <Button
            color="blue"
            onClick={() => navigate("/employee-dashboard")} // Navigate to Employee Dashboard
            className="w-full"
          >
            Go to Employee Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
