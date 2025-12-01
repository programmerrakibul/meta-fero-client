import { useQuery } from "@tanstack/react-query";
import MyContainer from "../Shared/MyContainer/MyContainer";
import { useParams } from "react-router";
import usePublicAxios from "../../hooks/usePublicAxios";

const TrackingLog = () => {
  const { tracking_id } = useParams();
  const publicAxios = usePublicAxios();

  const { data: logs, isPending } = useQuery({
    queryKey: ["tracking_logs", tracking_id],
    queryFn: async () => {
      const { data } = await publicAxios.get(`/trackings/${tracking_id}/logs`);

      return data?.logs;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  console.log(logs);

  return (
    <>
      <title>Tracking Logs</title>

      <section>
        <MyContainer>
          <ul className="timeline timeline-vertical">
            {logs.map((log) => (
              <li key={log._id}>
                <div className="timeline-start">
                  {new Date(log.created_at).toLocaleString()}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box capitalize">
                  {log.details}
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </MyContainer>
      </section>
    </>
  );
};

export default TrackingLog;
