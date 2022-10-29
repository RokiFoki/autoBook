import CorneredTable4 from "./CorneredTable4";
import CorneredTable2 from "./CorneredTable2";
import RoundedTable2 from "./RoundedTable2";
import RoundedTable4 from "./RoundedTable4";

export type TableType =
  | "RoundedTable2"
  | "RoundedTable4"
  | "CorneredTable2"
  | "CorneredTable4";

type TableProps = {
  type: TableType;
  width?: number;
};

const Table = ({ type, width = 72 }: TableProps) => {
  return (
    <div style={{ width }}>
      <TableImage type={type} />
    </div>
  );
};

const TableImage = ({ type }: Pick<TableProps, "type">) => {
  switch (type) {
    case "RoundedTable2":
      return <RoundedTable2 />;
    case "RoundedTable4":
      return <RoundedTable4 />;
    case "CorneredTable2":
      return <CorneredTable2 />;
    case "CorneredTable4":
      return <CorneredTable4 />;
    default: {
      const _exhaustiveCheck: never = type;
      return <div></div>;
    }
  }
};

export default Table;
