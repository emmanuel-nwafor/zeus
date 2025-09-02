import { SidebarDemo } from '@/app/components/SidebarDemo';
import { ThemeToggle } from '@/app/components/ThemeToggle';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <SidebarDemo />
      <div className="flex-1 p-6">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <p>Dashboard page</p>
      </div>
    </div>
  );
}