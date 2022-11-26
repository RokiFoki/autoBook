import TableOutlined from "@ant-design/icons/lib/icons/TableOutlined";
import { Button } from "antd";
import { useRecoilState } from "recoil";
import _tableView from "../../recoil/tableView";
import styles from "./HeaderControls.module.css";

const HeaderControls = () => {
  const [tableView, setTableView] = useRecoilState(_tableView);

  return (
    <section className={styles.HeaderControls}>
      <div style={{ flexGrow: 1 }}></div>
      <Button
        size="small"
        type={tableView ? "primary" : "default"}
        onClick={() => setTableView((tableView) => !tableView)}
      >
        <TableOutlined />
      </Button>
    </section>
  );
};

export default HeaderControls;
