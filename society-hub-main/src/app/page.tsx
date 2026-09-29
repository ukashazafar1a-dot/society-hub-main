import Dashboard from "./_components/Dashboard";
import { UserRole } from "@/src/utils/types";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-28 md:pb-10 dark:bg-black">
      <Dashboard role={UserRole.ADMIN} />
    </div>
  );
}
