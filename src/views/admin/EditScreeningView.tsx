import { getScreeningById } from "@/api";
import EditSingleSreening from "@/components/screening/EditSingleSreening";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function EditScreeningView() {
    const { screeningId } = useParams()
    const { data } = useQuery({
        queryKey: ['screening', screeningId],
        queryFn: () => getScreeningById(+screeningId!)
    })
    if(data) return <EditSingleSreening screening={data} />
}
