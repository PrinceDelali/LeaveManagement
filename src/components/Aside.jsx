import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const Aside = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "leave-request"));
      const requests = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setLeaveRequests(requests);
    };
    fetchLeaveRequests();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-h-[400px] overflow-y-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Leave Requests</h2>
      <div className="space-y-4">
        {leaveRequests.map((leave) => (
          <div
            key={leave.id}
            className={`flex items-center justify-between p-4 border-l-4 transition-all duration-300 
              ${leave.status === "accepted" ? "border-green-500 bg-green-50" : "border-pink-500 bg-pink-50"}`}
          >
            <div className="flex items-center">
              {leave.status === "accepted" && (
                <IoMdCheckmark className="text-green-600 mr-3 text-xl" />
              )}
              <div>
                <p className="font-semibold text-lg">{leave.username}</p>
                <p className="text-sm text-gray-700">{leave.leaveType}</p>
                <p className={`text-xs font-medium ${leave.status === "accepted" ? "text-green-600" : "text-pink-600"}`}>
                  {leave.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aside;
