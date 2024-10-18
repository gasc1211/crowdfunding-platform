/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

const posts = [
  {
    id: 1,
    title: 'Granja de Hortalizas Orgánicas',
    href: '#',
    description:
      'Ayúdenos a expandir nuestra granja sostenible y llevar productos frescos a nuestra comunidad local',
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        '/hortaliza.webp',
    },
  },
  {
    id: 2,
    title: 'Miel Artesanal',
    href: '#',
    description:
      'Ayúdanos a expandir nuestras colonias de abejas y traer más miel deliciosa y sustentable a nuestra comunidad',
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        '/images.jpg',
    },
  },


  // More posts...
]

const personas = [
  {
    id: 1,
    title: 'Granja de Hortalizas Orgánicas',
    href: '#',
    description:
      'Soy un pequeño agricultor dedicado a cultivar los mejores productos orgánicos para mi comunidad',
    author: {
      name: 'Gabriel Suazo',
      href: '#',
      imageUrl:
        '/male-farmer.jpg',
    },
  },
  {
    id: 2,
    title: 'Miel Artesanal',
    href: '#',
    description:
      'Soy una apicultura apasionada, dedicada a producir miel de manera sostenible, de la más alta calidad',
    author: {
      name: 'Ada Pinto',
      href: '#',
      imageUrl:
        '/apicultor.jpeg',
    },
  },
  // More posts...
]



export default function Cartas() {
  return (
    <div className="bg-black bg-opacity-20 py-24 sm:py-32 mt-4 flex grow flex-col gap-4 md:flex-row rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Campañas Exitosas</h2>
          <p className="mt-2 text-lg leading-8 text-white text-center">
            Vea algunos de los increíbles proyectos que se han financiado a través de AgroSmart.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2x1 grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="max-w-sm bg-white border bg-opacity-85 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <Image className="rounded-t-lg w-[250px] h-[200px] m-auto mt-5" src={post.author.imageUrl} width= {250}  height={200}  alt="" />
              </a>
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between text-center">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 text-center">
                    <a href={post.href}>
                      <span className="absolute inset-0 inline" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" style={{ padding: 20 }}>{post.description}</p>
                </div>
                <br />
              </article>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Productores Destacados</h2>
          <p className="mt-2 text-lg leading-8 text-white text-center">
            Conozca a algunos de los increíbles pequeños agricultores y productores que forman parte de la comunidad AgroSmart.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2x1 grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {personas.map((post) => (
            <div key={post.id} className="max-w-sm bg-white border bg-opacity-85 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="mx-auto grid max-w-2x1 grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <a href="#">
                  <Image className="rounded-t-lg  w-[250px] h-[200px] ml-5 mt-5" src={post.author.imageUrl} width= {250}  height={200} alt="" />
                </a>
                <div className="flex items-center justify-center h-full">
                  <p className="font-semibold text-gray-900 text-center">
                    <a href={post.author.href}>
                      <span className="inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                </div>
              </div>
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 text-center">
                    <a href={post.href}>
                      <span className="inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" style={{ padding: 20 }}>{post.description}</p>
                  <br />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
