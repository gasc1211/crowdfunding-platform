import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Acerca de AgroStart</h1>
        <p className="text-lg mb-12">
          AgroStart es una plataforma de crowdfunding dedicada a impulsar proyectos innovadores en el sector agrícola. Nuestro objetivo es conectar a inversores comprometidos con emprendedores que buscan transformar el futuro de la agricultura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
            <p>
              Aspiramos a ser líderes en la transformación sostenible de la agricultura, impulsando soluciones innovadoras que generen un impacto positivo en las comunidades.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p>
              Fomentamos la sostenibilidad y la innovación en la agricultura para crear un impacto positivo en las comunidades.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
            <ul className="list-disc pl-5">
              <li>Compromiso con el desarrollo sostenible</li>
              <li>Apoyo a emprendedores e innovadores</li>
              <li>Transparencia y confianza</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
