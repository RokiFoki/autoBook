import { Select } from "antd";
import Input, { InputRef } from "antd/lib/input/Input";
import { BaseSelectRef } from "rc-select";
import React, { ForwardedRef } from "react";
import Table from "../../Elements/Tables/Table";
import { CanvasItemsTableDataIndex } from "./useConfigureTable";

// todo: move me to appropriate place
// todo: add ensureAll<TableType>()
const tableTypes = [
  "CorneredTable2",
  "CorneredTable4",
  "RoundedTable2",
  "RoundedTable4",
] as const;

type DataIndexInputProps = {
  dataIndex: CanvasItemsTableDataIndex;
  onSave: () => unknown;
};
const dataIndexInputFactory = (
  { dataIndex, onSave }: DataIndexInputProps,
  ref: ForwardedRef<InputRef & BaseSelectRef>
) => {
  if (!dataIndex) throw new Error(`Unknown empty dataIndex: ${dataIndex}`);

  switch (dataIndex) {
    case "id":
      throw new Error("Id cannot be edited");
    case "name":
      return <Input ref={ref} onPressEnter={onSave} onBlur={onSave} />;
    case "itemType":
      return (
        <Select
          ref={ref}
          options={tableTypes.map((type) => ({
            label: <Table type={type} width={24} />,
            value: type,
          }))}
          onChange={onSave}
        />
      );
    default: {
      const _exhaustiveCheck: never = dataIndex;
      throw new Error(`Uknown dataIndex: ${dataIndex}`);
    }
  }
};

export default dataIndexInputFactory;
