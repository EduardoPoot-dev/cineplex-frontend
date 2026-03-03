import { isAxiosError } from "axios";
import api from "@/lib/axios"
import { CategoriesSchema, MovieSchema, MoviesResponseSchema, OccupiedSeatsResponse, ScreeningResponseSchema, ScreeningSchema, TicketsSchema, userSchema, type CreateUserFormType, type MovieFormValues,  type ScreeningFormValue, type SellFormType, type UserFormType } from "../types";
import { seats } from "@/data/seats";

type Status = 'soon' | 'screening'

export async function getMovies(searchParams: {take: number, skip: number, status?: Status}) {
    try {
        const {take, skip, status} = searchParams

        const url = `/movies`
        
        const {data} = await api(url, {
            params: { take, skip, status }
        })
        const movies = MoviesResponseSchema.safeParse(data)
        //console.log(movies.error?.issues)
        return movies.data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMovieByPathname(pathname: string) {
    try {
        const url = `/movies/${pathname}`
        const { data } = await api(url)        
        const movie = MovieSchema.parse(data)
        return  movie

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getScreeningByMoviePath(moviePath: string, status: string) {
    try {
        const url = `/screenings/movie/${moviePath}`
        const { data } = await api(url, {
            params: status && { status }
        })
        const screenings = ScreeningResponseSchema.parse(data)
        return screenings
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export async function getOccupiedSeats(screeningId: number) {
    try {
        const url = `/seats/screening/${screeningId}`
        const { data } = await api(url)
        const occupiedSeats = OccupiedSeatsResponse.parse(data)

        const screeningSeat = seats.map((seat) => {
            const occupiedSeat = occupiedSeats.find((item) => item.name === seat.name)
            if(occupiedSeat) {
                return {...seat, available: false}
            } 
            return seat
        })
        return screeningSeat
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMovieHeader() {
    try {
        const url = '/movie/header'
        const { data } = await api(url)
        const movie = MovieSchema.parse(data)
        return movie
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createNewUser(user: CreateUserFormType) {
    try {
        const url = '/auth/register'
        const { data } = await api.post(url, user)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function login(user: UserFormType) {
    try {
        const url = '/auth/login'
        const { data } = await api.post(url, user)
        localStorage.setItem('AUTH_TOKEN', data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticate() {
    try {
        const url = '/auth/authenticate'
        const { data } = await api(url)
        const user = userSchema.parse(data)
        return user
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function ticketSell({screeningId, seats}: SellFormType) {
    try {
        const url = `/sells/screening/${screeningId}`
        const { data } = await api.post(url, {seats})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadPosterImage(formData : FormData) {
    try {
        const url = '/movies/upload-image'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllMovies(take: number, skip: number) {
    try {
        const url = '/movies'
        const { data } = await api(url, {
            params: {
                take,
                skip
            }
        })
        
        const movies = MoviesResponseSchema.parse(data)
        //console.log(movies.error?.issues)
        return movies
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUserTickets(ticketStatus : string) {
    try {
        const url = `/sells`
        const { data } = await api(url, {
            params: {
                status: ticketStatus
            }
        })
        const tickets = TicketsSchema.parse(data)
        return tickets
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createMovie(formData: MovieFormValues) {
    try {
        const url = '/movies'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateMovie({formData, moviePath} : {formData: MovieFormValues, moviePath: string}) {
    try {
        const url = `/movies/${moviePath}`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createScreenings(
    { screenings, moviePath} : {  screenings: ScreeningFormValue[], moviePath: string }
) {
    try {
        const url = `/screenings/movie/${moviePath}`
        const { data } = await api.post(url, { screenings: screenings })

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

export async function getCategories() {
    try {
        const url = '/categories'
        const { data } = await api(url)
        const categories = CategoriesSchema.parse(data)
        return categories
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

export async function getScreeningById(screeningId: number) {
    try {
        const url = `/screenings/${screeningId}`
        const { data } = await api(url)
        const screening = ScreeningSchema.parse(data)
        return screening
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateScreening({screeningId, screening}:{screeningId: number, screening: ScreeningFormValue}) {
    try {
        const url = `/screenings/${screeningId}`
        const { data } = await api.put(url, screening)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

export async function getCreatedMovies(take: number, skip: number) {
    try {
         const url = `/movies/admin`
        const { data } = await api(url, {
            params: { take, skip, }
        })
        const movies = MoviesResponseSchema.safeParse(data)
        return movies.data
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}