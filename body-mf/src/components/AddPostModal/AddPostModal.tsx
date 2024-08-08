import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment, { Moment } from "moment";

interface AddPostModalProps {
  visible: boolean;
  onClose: () => void;
  onAddPost: (post: Post) => void;
}

interface Post {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  url: string; // URL field
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  visible,
  onClose,
  onAddPost,
}) => {
  const [newPost, setNewPost] = useState<Post>({
    id: uuidv4(),
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    frequency: "daily",
    url: "", // Added URL field
  });

  const { title, description, startDate, endDate, frequency, url } = newPost;

  const onChangeNewPostForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onChangeStartDate = (date: Moment | null, dateString: string) => {
    setNewPost({ ...newPost, startDate: dateString });
  };

  const onChangeEndDate = (date: Moment | null, dateString: string) => {
    setNewPost({ ...newPost, endDate: dateString });
  };

  const onChangeFrequency = (value: string) => {
    setNewPost({ ...newPost, frequency: value });
  };

  const onSubmit = () => {
    onAddPost(newPost);
    resetAddPostData();
  };

  const resetAddPostData = () => {
    setNewPost({
      id: uuidv4(),
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      frequency: "daily",
      url: "", // Reset URL field
    });
    onClose();
  };

  return (
    <Modal
      title="Create new challenge"
      visible={visible}
      onCancel={resetAddPostData}
      footer={[
        <Button key="cancel" onClick={resetAddPostData}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
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
            value={title}
            onChange={onChangeNewPostForm}
            required
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            rows={3}
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChangeNewPostForm}
          />
        </Form.Item>
        <Form.Item label="Start Date">
          <DatePicker
            format="YYYY-MM-DD"
            value={startDate ? moment(startDate) : null}
            onChange={onChangeStartDate}
          />
        </Form.Item>
        <Form.Item label="End Date">
          <DatePicker
            format="YYYY-MM-DD"
            value={endDate ? moment(endDate) : null}
            onChange={onChangeEndDate}
          />
        </Form.Item>
        <Form.Item label="Frequency">
          <Select value={frequency} onChange={onChangeFrequency}>
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="weekly">Weekly</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tutorial URL">
          <Input
            type="text"
            placeholder="Tutorial URL"
            name="url"
            value={url}
            onChange={onChangeNewPostForm}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
