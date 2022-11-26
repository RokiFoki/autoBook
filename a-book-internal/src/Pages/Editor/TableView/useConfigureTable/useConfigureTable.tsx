import AimOutlined from "@ant-design/icons/lib/icons/AimOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Space from "antd/lib/space";
import type { ColumnsType, TableProps } from "antd/lib/table/Table";
import useRemoveItems from "../../actions/useRemoveItems";
import useEvent from "../../../../utils/hooks/useEvent";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";
import useUpdateTableItems from "../../DetailsPanel/Forms/TableForm/hooks/useUpdateTableItems";
import { useRecoilState } from "recoil";
import { selectedCanvasItems } from "../../recoil/canvas/selectedCanvasItems";
import type { ItemData } from "../../recoil/canvas/canvasItems";
import Table from "../../Elements/Tables/Table";

const dataColumnsData: (ColumnsType<ItemData>[number] & {
  editable?: boolean;
  dataIndex?: "id" | "itemType" | "name";
  title: string;
})[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    editable: false,
  },
  {
    title: "Type",
    dataIndex: "itemType",
    key: "itemType",
    editable: true,
    render: (_, { itemType }) => {
      return <Table type={itemType} width={24} />;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    editable: true,
  },
];

export type CanvasItemsTableDataIndex =
  typeof dataColumnsData[number]["dataIndex"];
const dataColumns: (ColumnsType<ItemData>[number] & {
  editable?: boolean;
  dataIndex?: CanvasItemsTableDataIndex;
  title: string;
})[] = [...dataColumnsData];

const useConfigureTable = (): TableProps<ItemData> => {
  const removeItems = useRemoveItems();
  const updateItems = useUpdateTableItems();
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCanvasItems);

  const toggleSelected = useEvent((id: ItemData["id"]) => {
    setSelectedItems((selected) =>
      selected.includes(id)
        ? selected.filter((sId) => sId !== id)
        : [...selected, id]
    );
  });

  const columns: typeof dataColumns = [
    ...dataColumns,
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Do you want to delete the item?"
            onConfirm={() => removeItems([record.id])}
          >
            <Button type="text">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            type={selectedItems.includes(record.id) ? "primary" : "text"}
            onClick={() => toggleSelected(record.id)}
          >
            <AimOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const onSave = useEvent((item: ItemData) => {
    updateItems([item]);
  });

  return {
    components: {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    },
    columns: columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record: ItemData) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          onSave,
        }),
      };
    }),
  };
};

export default useConfigureTable;
