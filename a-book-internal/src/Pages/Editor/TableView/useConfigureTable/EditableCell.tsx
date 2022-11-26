import { Form, InputRef } from "antd";
import { BaseSelectRef } from "rc-select";
import { useContext, useEffect, useRef, useState } from "react";
import type { ItemData } from "../../recoil/canvas/canvasItems";
import dataIndexInput from "./dataIndexInputFactory";
import { EditableContext } from "./EditableRow";
import { CanvasItemsTableDataIndex } from "./useConfigureTable";

type EditableCellProps = {
  title: string;
  id: ItemData["id"];
  editable: boolean;
  children: React.ReactNode;
  dataIndex: CanvasItemsTableDataIndex;
  record: ItemData;
  onSave: (record: ItemData) => unknown;
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  id,
  editable,
  children,
  dataIndex,
  record,
  onSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef & BaseSelectRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex as string]: record[dataIndex as keyof typeof record],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      onSave({ ...record, ...values });
    } catch (errInfo) {
      console.error("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {/* <Input onPressEnter={save} onBlur={save} /> */}
        {dataIndexInput({ dataIndex, onSave: save }, inputRef)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
