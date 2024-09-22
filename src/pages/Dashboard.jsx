import Aside from "../components/Aside";
import LeaveForm from "../components/LeaveForm";
import SideBar from "../components/SideBar";

const Dashboard = ({ id }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-7">
        <LeaveForm id={id} />
      </div>
      <div className="col-span-2">
        <Aside id={id} />
      </div>
    </div>
  );
};

export default Dashboard;
