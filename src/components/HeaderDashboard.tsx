import { AddProject } from "./AddProject";
import SignOut from "./SignOut";

function HeaderDashboard() {
  return (
    <div className="flex flex-wrap gap-y-2 gap-x-2 [&_button]:shadow animate-fade-in">
      <AddProject />
      <SignOut />
    </div>
  );
}

export default HeaderDashboard;
