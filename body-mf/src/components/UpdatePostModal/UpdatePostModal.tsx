import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

interface Post {
  id: string;
  status: string;
  title: string;
  description: string;
  url: string;
  deadline: string;
}

interface UpdatePostModalProps {
  visible: boolean;
  post: Post;
  onClose: () => void;
  onUpdatePost: (updatedPost: Post) => void;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({
  visible,
  post,
  onClose,
  onUpdatePost,
}) => {
  const [updatedPost, setUpdatedPost] = useState<Post>(post);

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const onChangeUpdatedPostForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  };

  const onChangeDate = (date: moment.Moment | null, dateString: string) => {
    setUpdatedPost({ ...updatedPost, deadline: dateString });
  };

  const handleSubmit = () => {
    onUpdatePost(updatedPost);
    onClose();
    message.success("The post has been successfully updated!");
  };

  return (
    <Modal
      title="Update Task"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Title" required>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={updatedPost.title}
            onChange={onChangeUpdatedPostForm}
            required
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={3}
            placeholder="Description"
            name="description"
            value={updatedPost.description}
            onChange={onChangeUpdatedPostForm}
          />
        </Form.Item>
        <Form.Item label="Tutorial URL">
          <Input
            type="text"
            placeholder="Tutorial URL"
            name="url"
            value={updatedPost.url}
            onChange={onChangeUpdatedPostForm}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Select
            value={updatedPost.status}
            onChange={(value) =>
              setUpdatedPost({ ...updatedPost, status: value })
            }
          >
            <Option value="TO DO">TO DO</Option>
            <Option value="IN PROGRESS">IN PROGRESS</Option>
            <Option value="DONE">DONE</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Deadline Day">
          <DatePicker
            format="YYYY-MM-DD"
            value={updatedPost.deadline ? moment(updatedPost.deadline) : null}
            onChange={onChangeDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
