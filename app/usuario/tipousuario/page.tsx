import Image from "next/image";
import Link from "next/link";

export default function TipoUsuario() {
    return (
        <div id="containerType" className="grid grid-cols-4 gap-4 flex items-center justify-center mt-52">
            <div className="col-start-2 col-end-3">
                <Link href="../dashboard/emprendedores" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Image
                        src="/productoricon.webp"
                        width={150}
                        height={150}
                        alt="Foto de productor"
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plataforma de productor</h5>
                    </div>
                </Link>
            </div>
            <div className="col-start-3 col-end-4">
                <Link href="../dashboard/inversor" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Image
                        src="/inversionista.webp"
                        width={150}
                        height={150}
                        alt="Foto de productor"
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plataforma de inversionita</h5>
                    </div>
                </Link>
            </div>
        </div>
    )
}
