import React, { useEffect, useState, useCallback } from "react";
import { Button, notification } from "antd";
import SinglePost from "../SinglePost/SinglePost";
import UpdatePostModal from "../UpdatePostModal/UpdatePostModal";
import AddPostModal from "../AddPostModal/AddPostModal";
import styles from "./Dashboard.module.css";

interface Post {
  id: string;
  status: string;
  title: string;
  description: string;
  url: string;
  deadline: string;
}

const Dashboard: React.FC = () => {
  const user = "Guest";

  const [posts, setPosts] = useState<Post[]>([]);
  const [toDoPosts, setToDoPosts] = useState<Post[]>([]);
  const [inProgressPosts, setInProgressPosts] = useState<Post[]>([]);
  const [donePosts, setDonePosts] = useState<Post[]>([]);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showUpdatePostModal, setShowUpdatePostModal] =
    useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [deadlineNotiOpen, setDeadlineNotiOpen] = useState<boolean>(true);
  const [earliestDeadline, setEarliestDeadline] = useState<Post | null>(null);

  // Fetch posts from local storage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    if (Array.isArray(savedPosts)) {
      const transformedPosts = savedPosts.map((post) => ({
        id: post.id,
        status: post.status || "TO DO",
        title: post.title,
        description: post.description,
        url: post.url,
        deadline: post.endDate || post.deadline,
      }));
      setPosts(transformedPosts);
    }
  }, [showAddPostModal]);

  // Filter posts by status
  useEffect(() => {
    if (posts.length > 0) {
      setToDoPosts(posts.filter((post) => post.status === "TO DO"));
      setInProgressPosts(posts.filter((post) => post.status === "IN PROGRESS"));
      setDonePosts(posts.filter((post) => post.status === "DONE"));
    }
  }, [posts]);

  // Calculate the earliest deadline
  const getEarliestDeadline = useCallback(() => {
    if (posts.length === 0) {
      setEarliestDeadline(null);
      return;
    }
    let earliestDeadlineTask = posts[0];
    let earliestDeadline = new Date(posts[0].deadline);
    for (let i = 1; i < posts.length; i++) {
      const deadline = new Date(posts[i].deadline);
      if (deadline < earliestDeadline) {
        earliestDeadline = deadline;
        earliestDeadlineTask = posts[i];
      }
    }
    setEarliestDeadline(earliestDeadlineTask);
  }, [posts]);

  useEffect(() => {
    getEarliestDeadline();
  }, [getEarliestDeadline]);

  // Handle adding a new post
  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Created new post successfully!",
    });
  };

  // Handle updating a post
  const handleUpdatePost = (updatedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Updated post successfully!",
    });
  };

  // Handle deleting a post
  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Deleted post successfully!",
    });
  };

  // Handle editing a post
  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setShowUpdatePostModal(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      {posts.length > 0 && earliestDeadline && (
        <div
          className={`${styles.notificationCard} ${
            deadlineNotiOpen ? "" : styles.hidden
          }`}
        >
          <h1 className={styles.notificationTitle}>Hi {user}</h1>
          <div className="mb-4">
            <h2 className={styles.notificationSubTitle}>
              Deadline Notification
            </h2>
            <p className={styles.notificationText}>
              The deadline for task{" "}
              <span className={styles.notificationTextBold}>
                {earliestDeadline.title}
              </span>{" "}
              is{" "}
              <span className={styles.notificationTextBold}>
                {earliestDeadline.deadline}
              </span>
              , which is the earliest deadline.
            </p>
          </div>
          <Button type="primary" onClick={() => setDeadlineNotiOpen(false)}>
            Close
          </Button>
        </div>
      )}
      <div className={styles.gridContainer}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>TO DO</h3>
          <div className={styles.columnContent}>
            {toDoPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>IN PROGRESS</h3>
          <div className={styles.columnContent}>
            {inProgressPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>DONE</h3>
          <div className={styles.columnContent}>
            {donePosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        type="primary"
        className={styles.addButton}
        onClick={() => setShowAddPostModal(true)}
      >
        Add Post
      </Button>
      <AddPostModal
        visible={showAddPostModal}
        onClose={() => setShowAddPostModal(false)}
        onAddPost={handleAddPost}
      />
      {currentPost && (
        <UpdatePostModal
          visible={showUpdatePostModal}
          onClose={() => setShowUpdatePostModal(false)}
          post={currentPost}
          onUpdatePost={handleUpdatePost}
        />
      )}
    </div>
  );
};

export default Dashboard;
