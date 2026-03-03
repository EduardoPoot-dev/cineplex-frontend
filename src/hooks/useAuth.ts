import { useQuery } from "@tanstack/react-query"
import { authenticate } from "@/api"

export const useAuth = () => {
    const { data, isSuccess } = useQuery({
        queryKey: ['user'],
        queryFn: () => authenticate(),
        retry: false
    })

    return {
        authenticated: isSuccess,
        user: data,
    }
}