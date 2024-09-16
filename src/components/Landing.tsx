import Image from "next/image"
import ingredientesImg from "@/img/ingredientes.webp"

const Landing = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        className="w-full h-full object-cover"
        src={ingredientesImg}
        alt="Imagen receta"
        layout="fill"
        style={{
          maskImage: 'linear-gradient(red 80%, transparent)'
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
        <h1 className="text-5xl p-2 rounded-sm text-white backdrop-blur-xl bg-[rgb(182,217,208,0.9)] font-bold drop-shadow-lg">
          ¡Tus
          <span className="text-forest-600">
            &nbsp;recetas&nbsp;
          </span>
          a tu alcance!
        </h1>
      </div>
    </div>
  );
}

export default Landing;