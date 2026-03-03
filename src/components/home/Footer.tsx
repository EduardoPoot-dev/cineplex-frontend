import { Link } from "react-router";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300">
        <div className="container mx-auto">
            <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-7">
                <div className="mx-auto text-center md:mx-0 md:text-left">
                    <Logo />
                    <p className="text-gray-600 mt-4 text-sm">La mejor experiencia cinematográfica <br/> te espera.</p>
                </div>

                <div className="mx-auto text-center md:mx-0 md:text-left">
                    <h3 className="font-semibold">Películas</h3>

                    <ul className="mt-5">
                        <li>
                            <Link to='/movies' className="text-gray-600">En cartelera</Link>
                        </li>
                        <li className="mt-2">
                            <Link to='/movies/soon' className="text-gray-600">Próximamente</Link>
                        </li>
                    </ul>
                </div>

                <div className="mx-auto text-center md:mx-0 md:text-left">
                    <h3 className="font-semibold">Cine</h3>

                    <ul className="mt-5">
                        <li>
                            <Link to='/location' className="text-gray-600">Ubicación</Link>
                        </li>
                        <li className="mt-2">
                            <Link to='/contact' className="text-gray-600">Contacto</Link>
                        </li>
                    </ul>
                </div>

                <div className="mx-auto text-center md:mx-0 md:text-left">
                    <h3 className="font-semibold">Ayuda</h3>

                    <ul className="mt-5">
                        <li>
                            <Link to='/contact' className="text-gray-600">Contacto</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full border-t border-gray-300 py-8">
                <div className="text-sm text-center text-gray-600">© 2026 CinePlex. Todos los derechos reservados.</div>
            </div>
        </div>

    </footer>
  )
}
