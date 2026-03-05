import z from "zod";

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoriesSchema = z.array(CategorySchema)

export const MovieSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    director: z.string(),
    path: z.string(),
    premiereDate: z.string(),
    image: z.string(),
    hoursDuration: z.number(),
    minutesDuration: z.number(),
    rate: z.string(),
    //isAvailable: z.boolean(),
    //hasScreenings: z.boolean(),
    category: CategorySchema
})

export const MoviesResponseSchema = z.object({
    count: z.number(),
    rows: z.array(MovieSchema)
})

export const ScreeningSchema = z.object({
    id: z.number(),
    price: z.string(),
    date: z.string(),
})

export const ScreeningResponseSchema = z.array(ScreeningSchema)

export const OccupiedSeat = z.object({
    name: z.string(),
    screening_id: z.number()
})

export const OccupiedSeatsResponse = z.array(OccupiedSeat)

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    isAdmin: z.boolean()
})

const ticketSchema = z.object({
    id: z.number(),
    total: z.coerce.number(),
    seatsSells: OccupiedSeatsResponse,
    screening: ScreeningSchema.extend({
        movie: MovieSchema
    }),
})
export const TicketsSchema = z.array(ticketSchema)

export type SellFormType = {
    screeningId: number
    seats: {name: string}[]
}

export type UserFormType = {
    email: string
    password: string
}
export type CreateUserFormType = {
    email: string
    password: string
    name: string
    confirmPassword: string
}

export type MovieFormValues = {
    name: string
    director: string
    description: string
    premiereDate: string
    image: string
    rate: number
    hoursDuration: number
    minutesDuration: number
    path: string
    category_id: number
}

export type ScreeningFormValue = {
    date: string,
    price: number
}

export type ScreeningsFormValues = {
    screenings: ScreeningFormValue[]
}

export type MoviesResponse = z.infer<typeof MoviesResponseSchema>
export type Ticket = z.infer<typeof ticketSchema>
export type Category = z.infer<typeof CategorySchema>
export type Movie = z.infer<typeof MovieSchema>
export type Screening = z.infer<typeof ScreeningSchema>


