import React from "react";
import { Card, Button, Badge } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import styles from "./SinglePost.module.css";

const SinglePost = ({ post, onEdit, onDelete }) => {
  const statusColor =
    post.status === "DONE"
      ? styles.statusBadgeDone
      : post.status === "IN PROGRESS"
      ? styles.statusBadgeInProgress
      : styles.statusBadge;

  return (
    <Card
      className={styles.card}
      bordered={false}
      title={
        <div className={styles.cardTitle}>
          <span>{post.title}</span>
          <Badge color={statusColor} text={post.status} />
        </div>
      }
      extra={
        <div className={styles.extraButtons}>
          <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
          <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />
        </div>
      }
    >
      <h4 className={styles.title}>{post.title}</h4>
      <p className={styles.description}>{post.description}</p>
      {post.url && (
        <Button
          type="link"
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          icon={<PlayCircleOutlined />}
          className={styles.linkButton}
        >
          View Tutorial
        </Button>
      )}
      <p className={styles.deadline}>Deadline: {post.deadline}</p>
    </Card>
  );
};

export default SinglePost;
