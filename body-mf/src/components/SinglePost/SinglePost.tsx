import React from "react";
import { Card, Button, Badge, Radio, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const SinglePost = ({ post, onEdit, onDelete, onProgressUpdate }) => {
  const statusColor =
    post.status === "DONE"
      ? "green"
      : post.status === "IN PROGRESS"
      ? "yellow"
      : "red";

  const totalProgress =
    post.frequency === "daily"
      ? parseInt(post.duration) * 7
      : parseInt(post.duration);

  const handleProgressClick = () => {
    const newProgress = post.progress + 1;
    if (newProgress >= totalProgress) {
      onProgressUpdate(post.id, newProgress, "DONE");
    } else {
      onProgressUpdate(post.id, newProgress, post.status);
    }
  };

  return (
    <Card
      className="shadow-lg border mb-4"
      bordered={false}
      title={
        <div className="flex justify-between items-center">
          <span>{post.title}</span>
          <Badge color={statusColor} text={post.status} />
        </div>
      }
      extra={
        <div className="flex space-x-2">
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />
          </Tooltip>
        </div>
      }
    >
      <div className="mb-4">
        <h4 className="font-semibold text-xl">{post.title}</h4>
        <p className="text-gray-700 mb-2">{post.description}</p>
        <p className="text-gray-500">
          <strong>Start Date:</strong>{" "}
          {moment(post.startDate).format("YYYY-MM-DD")}
        </p>
        <p className="text-gray-500">
          <strong>Duration:</strong> {post.duration}{" "}
          {post.duration > 1 ? "weeks" : "week"}
        </p>
        <p className="text-gray-500">
          <strong>Frequency:</strong>{" "}
          {post.frequency.charAt(0).toUpperCase() + post.frequency.slice(1)}
        </p>
        {post.url && (
          <Button
            type="link"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            icon={<PlayCircleOutlined />}
            className="text-blue-500"
          >
            View Tutorial
          </Button>
        )}
      </div>
      <Radio.Group className="mt-2 flex space-x-2">
        <Radio.Button onClick={handleProgressClick}>
          Done {post.progress}/{totalProgress}
        </Radio.Button>
        <Radio.Button
          onClick={() =>
            onProgressUpdate(post.id, post.progress, "IN PROGRESS")
          }
        >
          Missed Task
        </Radio.Button>
        <Radio.Button
          onClick={() => onProgressUpdate(post.id, post.progress, "DONE")}
        >
          Mark as Completed
        </Radio.Button>
      </Radio.Group>
      <div className="mt-2">
        <strong>Progress:</strong>{" "}
        {((post.progress / totalProgress) * 100).toFixed(2)}%
      </div>
    </Card>
  );
};

export default SinglePost;
