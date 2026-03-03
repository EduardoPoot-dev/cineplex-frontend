export const formatSeatName = (seat: string) => `${seat.at(1)}${seat.at(2) || ''}`

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatImageScr(src: string) {
    return src.startsWith('https') ? src : `/${src}`
}