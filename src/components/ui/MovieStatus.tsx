export default function MovieStatus({status} : {status: string}) {
    return (
        <span className="px-4 py-1 border border-red-400 bg-red-200 rounded-3xl text-red-700 font-semibold">
            {status}
        </span>
    )
}
