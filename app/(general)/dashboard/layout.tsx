/* import NavbarUsers from "@/app/ui/components/NavbarUsers" */

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-12">
            
            <div className="p-6 md:p-12">{children}</div>
        </div>

    );
}