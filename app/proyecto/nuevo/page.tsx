import Navbar from "@/app/ui/components/Navbar";
import ProjectForm from "@/app/ui/components/ProjectForm";

export default function NewProjectForm() {
  return (
    <div>
      <Navbar />
      <div className="md:pt-20 pt-4">
        <ProjectForm />
      </div>
    </div>
  );
}