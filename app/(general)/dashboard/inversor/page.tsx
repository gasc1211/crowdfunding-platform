'use client';
import { useEffect, useState } from "react";
import ProjectCard from "@/app/ui/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { getAllProjects, getCategories, getProjectsByCategory } from "@/app/api/handler";  // make sure to import getProjectsByCategory

export default function InversorDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const projectsPerPage = 6;

    // Fetching initial data for projects and categories
    useEffect(() => {
        async function fetchData() {
            try {
                const [allProjects, allCategories] = await Promise.all([
                    getAllProjects(),
                    getCategories()
                ]);
                setProjects(allProjects);
                setCategories(allCategories);
            } catch (err) {
                console.error('Fetch error:', err);
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("An unknown error occurred."));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    // Filtering projects based on selected category
    useEffect(() => {
        async function fetchFilteredProjects() {
            try {
                setLoading(true);
                if (selectedCategory) {
                    const projectsByCategory = await getProjectsByCategory(selectedCategory);
                    setProjects(projectsByCategory);
                } else {
                    const allProjects = await getAllProjects();
                    setProjects(allProjects);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err : new Error("Unknown error occurred"));
            } finally {
                setLoading(false);
            }
        }

        fetchFilteredProjects();
    }, [selectedCategory]);  // Dependency array includes selectedCategory

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    // Filtering projects by search term
    const filteredProjects = projects.filter(project => {

        const matchesSearch =
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description!.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location!.toLowerCase().includes(searchTerm.toLowerCase());

        // Only filter by category if one is selected
        if (!selectedCategory) return matchesSearch;

        // Ensure both values are strings and trim any whitespace
        const projectCategoryId = String((project as any).category_id).trim();
        const selectedCategoryId = String(selectedCategory).trim();

        return matchesSearch && projectCategoryId === selectedCategoryId;

    });

    // Pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <div>
                    {/* <Hero /> */}
                    {/* Barra de búsqueda y filtros superpuestos en Hero */}
                    <div className="flex items-center md:justify-end justify-center gap-4 mt-4 mr-4">
                        <div className="flex items-center w-96">
                            <Input
                                type="text"
                                placeholder="Buscar proyectos..."
                                className="w-full h-10 px-4 py-2 mr-2 bg-white border border-gray-300 rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="bg-black rounded-md p-2">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Selector de categorías */}
                        <select
                            className="h-10 px-4 py-2 bg-white border border-gray-300 rounded-md"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="container mx-auto py-8 px-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6">
                                {currentProjects.map((project) => (
                                    <ProjectCard
                                        key={project.project_id}
                                        project={project}
                                    />
                                ))}
                            </div>

                            {currentProjects.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No se encontraron proyectos que coincidan con tu búsqueda</p>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6 gap-2">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded ${currentPage === index + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
