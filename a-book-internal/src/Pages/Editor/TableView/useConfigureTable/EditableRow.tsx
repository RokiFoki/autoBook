import { Form } from "antd";
import { FormInstance } from "antd/es/form/Form";
import React from "react";
import type { ItemData } from "../../recoil/canvas/canvasItems";

export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);

type EditableRowProps = { id: ItemData["id"] };
const EditableRow: React.FC<EditableRowProps> = ({ id, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
