import React from "react";
import { formatDistance } from "date-fns";

function formatDate(date) {
  const dateObject = new Date(date);
  return formatDistance(dateObject, Date.now());
}

function Comment({
  commentDocument: { comment, username, order_date, ressource },
}) {
  return (
    <div className="pure-g comment">
      <h4 className="pure-u-3-4">
        From <span className="comment-username">{username}</span> about{" "}
        <span className="comment-ressource">{ressource}</span>
      </h4>
      <span className="pure-u-1-4 comment-date">
        {formatDate(order_date)} ago
      </span>
      <span className="pure-u-1">{comment}</span>
    </div>
  );
}

export function Comments({ contractor }) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    async function fetchComments() {

      const apiResponse = await fetch(
        `${process.env.REACT_APP_API_HOST}/v1/contractor/comment?page=1&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            contractor: contractor,
          }),
        }
      );
      const commentsDoc = await apiResponse.json();
      setComments(commentsDoc.comments);
    }

    if (contractor !== "") {
      fetchComments();
    }
  }, [contractor]);

  return comments.length ? (
    <div className="comments">
      {comments.map((commentDocument, id) => (
        <Comment key={id} commentDocument={commentDocument} />
      ))}
    </div>
  ) : (
    <></>
  );
}
