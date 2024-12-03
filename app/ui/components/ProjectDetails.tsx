import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import ElementsCheckoutForm from "@/components/ElementsCheckoutForm";

import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from "react";
import { UUID } from "crypto";
import { getUserByUserId, getComments, getUserId } from "@/app/api/handler";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ProjectDetails({ project }: { project: Project }) {

    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
    const [userId, setUserId] = useState<UUID>();
    const supabase = createClient();
    const [comment, setComment] = useState<ProjectCommentInsert>({
        author_id: userId,
        content: "",
        project_id: project.project_id,
    });
    const [comments, setComments] = useState<ProjectComment[] | null>(null);
    const [authors, setAuthors] = useState<Users[] | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getComments(project.project_id);
            setComments(data); // Guarda los comentarios en el estado

            data.forEach(async element => {
                const user_id = element.author_id;
                const author = await getUserByUserId(user_id);
                if (author) {
                    setAuthors((prevAuthors) => {
                        if (prevAuthors === null) {
                            return [author];
                        }
                        return [...prevAuthors, author];
                    });
                }
            });
        };

        fetchComments();

    }, [project.project_id]);

    const { isSignedIn } = useUser();

    useEffect(() => {
        async function fetchId() {
            try {
                if (isSignedIn) {
                    const data = await getUserId();
                    setUserId(data.user_id);
                    setComment((prev) => ({ ...prev, author_id: data.user_id }));
                }

            } catch (err) {
                console.error(err);
            }
        }

        fetchId();
    }, [isSignedIn]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const comentario = e.target.value;
        setComment((prev) => ({ ...prev, content: comentario }));
    };

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from("comments")
                .insert({ author_id: comment.author_id, content: comment.content, project_id: comment.project_id })
                .select()
                .single();

            if (error) {
                console.error("Error al guardar el comentario:", error.message);
                setAlertType('error');
                return;
            }
            
            // Recupera el autor del nuevo comentario.
            const author = await getUserByUserId(data.author_id);

            // Actualiza el estado de los comentarios.
            setComments((prevComments) => [...(prevComments || []), data]);

            // Actualiza el estado de los autores.
            if (author) {
                setAuthors((prevAuthors) => [...(prevAuthors || []), author]);
            }
            
            setComment((prev) => ({ ...prev, content: "" }));
            setAlertType('success');
        } catch (error) {
            console.log(error);
            setAlertType('error');
        }
    };
    if (!userId) return <div>Loading...</div>;
    if (!project) return <div>Loading...</div>;

    return (
        <Card className="w-full lg:w-full h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
                <CardDescription>El Progreso de los Proyectos Actuales</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-14">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between mb-2">
                            <span>Total necesario</span>
                            <span>Total recaudado</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-2xl font-bold text-orange-500">
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.investment_goal)}
                            </span>
                            <span className="text-2xl font-bold text-green-500">
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.total_invested)}
                            </span>
                        </div>
                        <Progress value={(project.total_invested / project.investment_goal) * 100} className="mb-4 h-4" />
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h3 className="font-bold mb-2">
                                    Descripción del Proyecto
                                </h3>
                                <p>
                                    {project.description!.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Beneficios</h3>
                                <p>
                                    {project.beneficios!.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <p className="mb-4">Fecha de cierre de inversión: {project.expected_finish_date}</p>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <div className="w-full">
                    {/* <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Link href={`/pagos?project=${project.project_id}&amount=$`}>Invertir Ahora [Hosted Page]</Link>
                    </Button> */}
                    <div className="mt-4">
                        <h2 className="font-bold text-xl my-2">Invierte Ahora</h2>
                        <ElementsCheckoutForm project={project} />
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <div className="space-y-14">
                    <div className="bg-white p-4 rounded-lg border border-inherit">
                        <h5 className="font-bold mb-2">Comentarios</h5>
                        <div>
                            {authors && comments ? (
                                comments.map((comment, index) => {
                                    const author = authors[index]; // Asumiendo que el índice de comentarios coincide con el de los autores
                                    return (
                                        <div key={index} className="flex items-center mb-5">
                                            <div className="flex-none w-14">
                                                <Image
                                                    src={author ? (author.profileImg ? author.profileImg : "/usuario-verificado.png") : "/usuario-verificado.png"}
                                                    width={40}
                                                    height={40}
                                                    alt=""
                                                    className="rounded-full w-25 h-25 border"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg">{author ? author.first_name + " " + author.last_name : "Nada"}</h3>
                                                <p className="text-gray-500">{comment.content}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No hay comentarios</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex mt-8">
                    <input
                        type="text"
                        name="comentario"
                        id="comentario"
                        className="flex-1 peer h-full w-full rounded-[7px] border border-gray-200 bg-transparent px-3 py-2.5 pr-20 mr-2 text-sm text-blue-gray-700 outline outline-0 transition-all placeholder:text-gray-500 placeholder-shown:borde-gray-400 focus:border-2 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder="Has tu comentario"
                        value={comment.content ?? ""}
                        onChange={handleInputChange}
                    />
                    <button
                        className="flex-full right-1 top-1 z-10 select-none rounded bg-green-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={handleSubmit}
                    >
                        Comentar
                    </button>
                </div>
                    {alertType && (
                    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                        <Alert
                            className={`w-80 ${
                                alertType === 'success'
                                    ? 'border-green-500 bg-green-50 text-green-800'
                                    : 'border-red-500 bg-red-50 text-red-800'
                            }`}
                        >
                            {alertType === 'success' ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <AlertTitle>
                                {alertType === 'success' ? '¡Éxito!' : '¡Error!'}
                            </AlertTitle>
                            <AlertDescription>
                                {alertType === 'success'
                                    ? 'Comentario agregado exitosamente'
                                    : 'No se pudo agregar el comentario'}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </CardContent>
            <CardFooter>
            {/* Conditional Button */}
            {userId === project.producer_id && (
                    <Button className="ml-5 w-full bg-blue-500 hover:bg-blue-600">
                        <Link href={{
                                    pathname: "/proyecto/edit",
                                    query: { projectId: JSON.stringify(project.project_id) }, // Serialize project object
                                }}>
                            Editar Perfil de Proyecto
                        </Link>
                    </Button>
                )}
        </CardFooter>
        </Card>
    );
}
