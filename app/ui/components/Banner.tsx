import Image from "next/image";

export default function Banner({ imageUrl }: { imageUrl: string } = { imageUrl: "" }) {
  return (
    <>
      <div className="mx-auto">
        {!imageUrl ?
          <div className="h-[20vh] flex items-center justify-center rounded-xl bg-[url('/banner.jpg')] bg-cover">
            <h1 className="text-white text-4xl font-bold text-center px-4">Proyecto</h1>
          </div> :
          <Image
            className="w-full h-[25vh] object-cover rounded-md"
            src={imageUrl}
            alt="Project Banner Photo"
            width={500}
            height={100}
          />
        }
      </div>
    </>
  );
}
