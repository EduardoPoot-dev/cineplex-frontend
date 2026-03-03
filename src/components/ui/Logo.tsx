import { FilmIcon } from "@heroicons/react/16/solid";

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-700 rounded-xl p-2">
                <FilmIcon className="text-white " />
            </div>
            <span className="text-xl font-bold">CinePlex</span>
        </div>
    )
}
