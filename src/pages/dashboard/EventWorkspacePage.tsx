import { Navigate, useParams } from "react-router-dom";

// Legacy file — superseded by the new EventWorkspace. Redirect to it.
const EventWorkspacePage = () => {
  const { eventId } = useParams();
  return <Navigate to={`/dashboard/events/${eventId}/overview`} replace />;
};

export default EventWorkspacePage;
