import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Topic() {
  let { topicName } = useParams();
  console.log("topic name", topicName);
  useEffect(() => {}, []);
  return (
    <>
      <h1>Topic-{topicName}</h1>
    </>
  );
}
