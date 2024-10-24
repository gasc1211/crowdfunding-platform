"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const [nombre, setNombre] = useState("Juan Ramírez");
    const [edad, setEdad] = useState(45);
    const [intereses, setIntereses] = useState("Agricultura, Ganadería");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("Tegucigalpa, Honduras");
    const [telefono, setTelefono] = useState("9999-9999");
    const [correo, setCorreo] = useState("juan.ramirez@example.com");
    const [experiencia, setExperiencia] = useState(
        "Más de 10 años en el cultivo de café."
    );
    const [certificaciones, setCertificaciones] = useState(
        "Certificado en técnicas de agricultura sostenible."
    );
    const [proyectosPrevios, setProyectosPrevios] = useState(
        "Proyecto de café orgánico."
    );

    // Estado para manejar la imagen cargada
    const [imagen, setImagen] = useState("/productor.png");

    // Función para manejar el cambio de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // El '?' asegura que files no sea null
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagen(imageUrl);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-6 mb-8">
            {" "}
            {/* Añadimos mb-8 para dejar espacio en la parte inferior */}
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
                Editar Perfil del Productor
            </h1>
            {/* Imagen editable */}
            <div className="flex flex-col items-center justify-center">
                <div className="relative">
                    <Image
                        src={imagen}
                        alt="Imagen del Productor"
                        width={150}
                        height={150}
                        className="rounded-full shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:brightness-75"
                        onClick={() => {
                            const fileInput =
                                document.getElementById("fileInput");
                            if (fileInput) {
                                fileInput.click();
                            }
                        }}
                    />
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange} // Cambia la imagen al seleccionar un archivo
                />
                <p className="text-xl text-gray-500 mt-3 mb-5">
                    Haga click en la imagen para editar
                </p>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="w-2/3">
                    {" "}
                    {/* Ajustamos el ancho del contenedor principal */}
                    <p className="text-gray-700 font-semibold">Nombre:</p>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4" // Aumentamos padding para que el campo sea más ancho
                    />
                    <p className="text-gray-700 font-semibold">Edad:</p>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(Number(e.target.value))}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">Intereses:</p>
                    <input
                        type="text"
                        value={intereses}
                        onChange={(e) => setIntereses(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">Ubicación:</p>
                    <input
                        type="text"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">Teléfono:</p>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">
                        Correo Electrónico:
                    </p>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">Experiencia:</p>
                    <input
                        type="text"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">
                        Certificaciones:
                    </p>
                    <input
                        type="text"
                        value={certificaciones}
                        onChange={(e) => setCertificaciones(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-semibold">
                        Proyectos Previos:
                    </p>
                    <textarea
                        value={proyectosPrevios}
                        onChange={(e) => setProyectosPrevios(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                        rows={3}
                    />
                </div>
            </div>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="descripcion"
                        className="block text-gray-600 font-semibold"
                    >
                        Descripción Personal:
                    </label>
                    <textarea
                        id="descripcion"
                        className="w-full p-4 border border-gray-300 rounded-lg"
                        rows={4}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describe tu experiencia y proyectos..."
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        className="text-white p-3 rounded-lg bg-orange-500 hover:bg-orange-600 w-2/5 h-15"
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    );
}
