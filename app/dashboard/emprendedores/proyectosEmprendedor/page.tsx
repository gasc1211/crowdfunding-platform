'use client'
import { useEffect, useState } from "react";
import Hero from "@/app/ui/components/Hero";
import ProjectCard from "@/app/ui/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { getCategories, getUserProjects } from "@/app/api/handler";
import { getUserId } from "@/app/api/handler";

interface Project {
  project_id: string;
  producer_id: string;
  project_banner_url: string;
  name: string;
  description: string;
  start_date: string;
  expected_finish_date: string;
  finish_date: string | null;
  progress: number;
  investment_goal: number;
  total_invested: number;
  location: string;
  category_id: string;
}

interface Category {
  category_id: string;
  name: string;
  description?: string;
}

export default function InversorDashboard() {
   
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const projectsPerPage = 6;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUserId();
                
                const [userProjects, allCategories] = await Promise.all([
                    getUserProjects(data.user_id),
                    getCategories()
                ]);
                setProjects(userProjects);
                setCategories(allCategories);
            } catch (err) {
                console.error(err);
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

    // Filtrado de proyectos por búsqueda y categoría
    const filteredProjects = projects.filter(project => {
        const matchesSearch = 
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory ? project.category_id === selectedCategory : true;
        
        return matchesSearch && matchesCategory;
    });

    // Paginación
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    if (error) return <div>Error: {error.message}</div>;

    return (
        
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow">
                <div className="relative">
                    <Hero />
                    {/* Barra de búsqueda y filtros superpuestos en Hero */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 w-full max-w-4xl mx-auto px-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative w-96">
                                <Input
                                    type="text"
                                    placeholder="Buscar proyectos..."
                                    className="w-full h-10 px-4 py-2 bg-white border border-gray-300 rounded-md"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black rounded-md p-2">
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
                </div>

                <div className="container mx-auto py-8 px-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            {/* Grid de proyectos */}
                            <div className="grid gap-6">
                                {currentProjects.map((project) => (
                                    <ProjectCard
                                        key={project.project_id}
                                        project={project}
                                    />
                                ))}
                            </div>

                            {/* Mensaje cuando no hay resultados */}
                            {currentProjects.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No se encontraron proyectos que coincidan con tu búsqueda</p>
                                </div>
                            )}

                            {/* Paginación */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6 gap-2">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded ${
                                                currentPage === index + 1
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