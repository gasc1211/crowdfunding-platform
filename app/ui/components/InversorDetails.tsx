'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getUserId, getUserInvestments, getAllProjects } from "@/app/api/handler";
import { UUID } from "crypto";

type Project = {
    project_id: string | number;
    beneficios?: string | null;
    description?: string | null;
    expected_finish_date?: string | null;
    finish_date?: string | null;
    investment_goal: number;
    location?: string | null;
    name: string;
    progress: number;
    total_invested: number;
};

type Investments = {
    project_id: string | number;
    investment_amount: number;
};

export default function InversorDetails() {
    const [userId, setUserId] = useState<UUID>();
    const [investments, setInvestments] = useState<Investments[]>([]);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [selectedSection, setSelectedSection] = useState<string>("overview");
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    useEffect(() => {
        async function fetchId() {
            try {
                const data = await getUserId();
                setUserId(data.user_id);
            } catch (err) {
                console.error(err);
            }
        }
        fetchId();
    }, []);

    useEffect(() => {
        async function fetchInvestments() {
            if (!userId) return;
            try {
                const data = await getUserInvestments(userId);
                setInvestments(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchInvestments();
    }, [userId]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getAllProjects();
                setAllProjects(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProjects();
    }, []);

    const totalInvested = investments?.reduce((acc, inv) => acc + (inv.investment_amount || 0), 0) || 0;

    // Count the number of unique projects based on project_id
    const uniqueProjects = new Set(investments.map((investment) => investment.project_id));
    const numberOfProjectsInvested = uniqueProjects.size;

    // Count the number of completed projects (progress = 100) that the user has invested in
    const completedProjects = allProjects?.filter(project =>
        project.progress === 100 && uniqueProjects.has(project.project_id)
    ).length || 0;

    // Count the number of projects with progress less than 100 that the user has invested in
    const projectsInProcess = allProjects?.filter(project =>
        project.progress! < 100 && uniqueProjects.has(project.project_id)
    ).length || 0;

    // Count the unique number of investments made by the user (counting each investment even if it was made more than once in the same project)
    const numberOfInvestments = investments?.length || 0;

    // Pagination helper function
    const getPaginatedProjects = (projectList: Project[]) => {
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        return projectList.slice(startIndex, endIndex);
    };

    // Pagination render function
    const renderPagination = (projectList: Project[]) => {
        const totalPages = Math.ceil(projectList.length / projectsPerPage);
        
        return (
            <div className="col-span-full flex justify-center items-center space-x-2 mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        className={`
                            ${currentPage === index + 1 
                                ? 'bg-orange-600 text-white' 
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}
                            px-4 py-2 rounded
                        `}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
        );
    };

    // Section change handler
    const handleChangeSection = (section: string) => {
        setSelectedSection(section);
        setCurrentPage(1);
    };

    // Modal handlers
    const handleShowModal = (project: Project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setShowModal(false);
    };

    // Modal content renderer
    const renderModalContent = () => (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-gray-500 bg-opacity-50 absolute inset-0"></div>
                <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6 relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={handleCloseModal}
                    >
                        ✕
                    </button>
                    {selectedProject && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{selectedProject.name}</h2>
                            <div className="grid gap-4">
                                <p><strong>Descripción:</strong> {selectedProject.description || "No disponible"}</p>
                                <p><strong>Ubicación:</strong> {selectedProject.location || "No especificada"}</p>
                                <p>
                                    <strong>Objetivo de Inversión:</strong>{" "}
                                    {new Intl.NumberFormat("es-HN", {
                                        style: "currency",
                                        currency: "HNL",
                                    }).format(selectedProject.investment_goal)}
                                </p>
                                <p>
                                    <strong>Total Invertido:</strong>{" "}
                                    {new Intl.NumberFormat("es-HN", {
                                        style: "currency",
                                        currency: "HNL",
                                    }).format(selectedProject.total_invested)}
                                </p>
                                <p><strong>Progreso:</strong> {selectedProject.progress}%</p>
                                {selectedProject.beneficios && (
                                    <p><strong>Beneficios:</strong> {selectedProject.beneficios}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <main className="w-full h-full lg:w-3/4 px-4">
            <h2 className="text-2xl font-bold mb-4 ml-4">Resumen de inversiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">Proyectos Financiados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 text-center">{numberOfProjectsInvested}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">Total invertido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 text-center">
                            {new Intl.NumberFormat("es-HN", {
                                style: "currency",
                                currency: "HNL",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(totalInvested)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">
                            Inversiones Realizadas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 place-self-center">
                            {numberOfInvestments} {/* Display number of investments made */}
                        </div>
                    </CardContent>
                </Card>
            </div>
                            
            <h2 className="text-2xl font-bold mb-4 ml-4">Progreso de Inversiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSection === "overview" && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Proyectos financiados en progreso</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">
                                    Proyectos que aún están a la espera de poder lograr
                                    su meta para ser completados.
                                </p>
                                <div className="text-4xl font-bold text-orange-500 mb-4 text-center">{projectsInProcess}</div>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => handleChangeSection("projectsInProgress")}
                                >
                                    Más detalles
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Proyectos financiados completados</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">
                                    Proyectos culminados con éxito en los que usted
                                    realizó inversión.
                                </p>
                                <br />
                                <div className="text-4xl font-bold text-orange-500 mb-4 text-center">{completedProjects}</div>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => handleChangeSection("projectsCompleted")}
                                >
                                    Más detalles
                                </Button>
                            </CardContent>
                        </Card>
                    </>
                )}
                {selectedSection === "projectsInProgress" && (
                    <>
                        {getPaginatedProjects(
                            allProjects.filter(project => 
                                project.progress < 100 && uniqueProjects.has(project.project_id)
                            )
                        ).map(project => (
                            <Card key={project.project_id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center">
                                    <div>
                                        <p>Progreso: {project.progress}%</p>
                                        <p>
                                            Total Invertido:{" "}
                                            {new Intl.NumberFormat("es-HN", {
                                                style: "currency",
                                                currency: "HNL",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(project.total_invested)}
                                        </p>
                                    </div>
                                    <Button
                                        className="bg-orange-500 hover:bg-orange-600"
                                        onClick={() => handleShowModal(project)}
                                    >
                                        Más detalles
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        {renderPagination(
                            allProjects.filter(project => 
                                project.progress < 100 && uniqueProjects.has(project.project_id)
                            )
                        )}
                        <Button
                            className="mt-4 bg-gray-500 hover:bg-gray-600 col-span-full"
                            onClick={() => handleChangeSection("overview")}
                        >
                            Volver
                        </Button>
                    </>
                )}
                {selectedSection === "projectsCompleted" && (
                    <>
                        {getPaginatedProjects(
                            allProjects.filter(project => 
                                project.progress === 100 && uniqueProjects.has(project.project_id)
                            )
                        ).map(project => (
                            <Card key={project.project_id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between items-center">
                                    <div>
                                        <p>Progreso: 100%</p>
                                        <p>
                                            Total Invertido:{" "}
                                            {new Intl.NumberFormat("es-HN", {
                                                style: "currency",
                                                currency: "HNL",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(project.total_invested)}
                                        </p>
                                    </div>
                                    <Button
                                        className="bg-orange-500 hover:bg-orange-600"
                                        onClick={() => handleShowModal(project)}
                                    >
                                        Más detalles
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        {renderPagination(
                            allProjects.filter(project => 
                                project.progress === 100 && uniqueProjects.has(project.project_id)
                            )
                        )}
                        <Button
                            className="mt-4 bg-gray-500 hover:bg-gray-600 col-span-full"
                            onClick={() => handleChangeSection("overview")}
                        >
                            Volver
                        </Button>
                    </>
                )}
                {showModal && selectedProject && renderModalContent()}
            </div>
        </main>
    );
}