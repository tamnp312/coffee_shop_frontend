import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const Info = ({ visible, data, onClose, onSave }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (data) {
      const defaultData = {
        name: data.name || "",
        phone: data.phone || "",
      };
      form.setFieldsValue(defaultData);
    }
  }, [data, form]);

  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        onSave(values);
        onClose();
      })
      
  };

  

  return (
    <>
      <Modal
        open={visible}
        title="Edit Account Info"
        onCancel={onClose}
        onOk={handleSave}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Your Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name" },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

        </Form>
      </Modal>

      
    </>
  );
};

export default Info;
