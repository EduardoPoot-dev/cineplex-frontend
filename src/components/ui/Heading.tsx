interface Props {
    textPositionStyle?: string
    title: string
    description: string
}

export default function Heading({textPositionStyle, title, description}: Props) {
    return (
        <>
            <h3 className={`text-5xl font-bold mb-3 ${textPositionStyle}`}>{title}</h3>
            <p className={`text-gray-600 text-lg ${textPositionStyle}`}>{description}</p>
        </>
    )
}
