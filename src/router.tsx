import { Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainLayout from "./layouts/MainLayout"
import HomeView from "./views/HomeView"
import MovieView from "./views/movies/MovieView"
import MoviesView from "./views/movies/MoviesView"
import MoviesSoonView from "@/views/movies/MoviesSoonView"
import MovieScreeningView from "@/views/sellTickets/MovieScreeningView"
import MovieScreeningLayout from "@/layouts/MovieScreeningLayout"
import MovieSeats from "@/views/sellTickets/MovieSeats"
import ScreeningSellResume from "@/views/sellTickets/ScreeningSellResume"
import LoginView from "@/views/auth/LoginView"
import AuthLayout from "@/layouts/AuthLayout"
import RegisterView from "@/views/auth/RegisterView"
import AdminLayout from "@/layouts/AdminLayout"
import AdminView from "@/views/admin/AdminView"
import NewMovieView from "@/views/admin/NewMovieView"
import EditMovieView from "@/views/admin/EditMovieView"
import NewScreeningView from "@/views/admin/NewScreeningView"
import TicketsLayout from "@/layouts/TicketsLayout"
import ActivedTicketsView from "@/views/tickets/ActivedTicketsView"
import ExpiredTicketsView from "@/views/tickets/ExpiredTicketsView"
import AdminMovieScreeningsView from "@/views/admin/AdminMovieScreeningsView"
import LocationView from "@/views/contact/LocationView"
import ContactView from "@/views/contact/ContactView"
import Error404 from "@/views/Error404"
import EditScreeningView from "./views/admin/EditScreeningView"

export default function Router() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
        </Route >

        <Route path="admin" element={<AdminLayout />}>
          <Route path="" element={<AdminView />} />
          <Route path="movie/:moviePath/screenings" element={<AdminMovieScreeningsView />} />
          <Route path="movie/:moviePath/screenings/new" element={<NewScreeningView />} />
          <Route path="movie/:moviePath/screening/:screeningId" element={<EditScreeningView />} />
          <Route path="movie/new" element={<NewMovieView/>} />
          <Route path="movie/:moviePath/edit" element={<EditMovieView />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="404" element={<Error404 />} />
          <Route element={<HomeView />} path="home" index />
          <Route element={<LocationView />} path="location" />
          <Route element={<ContactView />} path="contact" />
          <Route path="movies" element={<MoviesView />} />
          <Route path="movies/soon" element={<MoviesSoonView />} />
          <Route path="tickets" element={<TicketsLayout />}>
            <Route path="actived" element={<ActivedTicketsView />} />
            <Route path="expired" element={<ExpiredTicketsView />} />
          </Route>

          <Route path="movie"  >
            <Route path=":moviePath">
              <Route path="" element={<MovieView />} />
              <Route path="screening" element={<MovieScreeningLayout />}>
                <Route path="" element={<MovieScreeningView />} />
                <Route path=":screeningId/seats" element={<MovieSeats />} />
                <Route path=":screeningId/seats/resume" element={<ScreeningSellResume />} />
              </Route>
            </Route>
          </Route>
          
        </Route>
      </Routes>
    </QueryClientProvider>

  )
}
