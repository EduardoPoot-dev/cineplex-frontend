interface Props {
    textPositionStyle?: string
    title: string
    description: string
    url?: string
}

export default function Heading({textPositionStyle, title, description, url}: Props) {
    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className={`text-5xl font-bold mb-3 ${textPositionStyle}`}>{title}</h3>
                    <p className={`text-gray-600 text-lg ${textPositionStyle}`}>{description}</p>
                </div>
                {url && (
                    <a className="" href={url}>Ver más</a>
                )}
            </div>
        </>
    )
}
