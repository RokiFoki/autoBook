import AntTable from "antd/lib/table";
import { useRecoilValue } from "recoil";
import { canvasItems as _canvasItems } from "../recoil/canvas/canvasItems";
import tableView from "../recoil/tableView";
import styles from "./TableView.module.css";
import useConfigureTable from "./useConfigureTable/useConfigureTable";

const TableView = () => {
  const showTableView = useRecoilValue(tableView);
  const canvasItems = useRecoilValue(_canvasItems);
  const props = useConfigureTable();

  if (!showTableView) return null;

  return (
    <AntTable
      {...props}
      style={{ marginBottom: 1 }} // to remove the scrollbar. Why am I needed thouhg? :o
      dataSource={canvasItems}
      size="small"
      pagination={{
        className: styles.pagination,
      }}
    />
  );
};

export default TableView;
