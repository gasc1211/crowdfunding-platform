/* import NavbarUsers from "@/app/ui/components/NavbarUsers" */

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* <NavbarUsers /> */}
            <div className="flex-grow md:overflow-y-auto mt-20">{children}</div>
        </div>

    );
}