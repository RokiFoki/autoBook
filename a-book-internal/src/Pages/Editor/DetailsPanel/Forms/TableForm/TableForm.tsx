import { Divider, Input } from "antd";
import classNames from "classnames";
import styles from "./TableForm.module.css";
import layoutStyles from "../../../../Shared/layout.module.css";
import Title from "antd/lib/typography/Title";
import { ItemData } from "../../../recoil/canvas/canvasItems";
import useUpdateTableItems from "./hooks/useUpdateTableItems";
import useNumToString from "../../../../../utils/hooks/useNumToString";

type TableFormProps = {
  data: ItemData;
};
const TableForm = ({ data }: TableFormProps) => {
  const updateTableItems = useUpdateTableItems();

  const handleChange = <T extends keyof ItemData>(
    key: T,
    value: ItemData[T]
  ) => {
    updateTableItems([{ ...data, [key]: value }]);
  };

  const [x, setX] = useNumToString(data.x, (num) => handleChange("x", num));
  const [y, setY] = useNumToString(data.y, (num) => handleChange("y", num));
  const [rotation, setRotation] = useNumToString(data.rotation, (num) =>
    handleChange("rotation", num)
  );

  return (
    <article
      className={classNames(styles.TableForm, layoutStyles.layoutPadding)}
    >
      <Title level={5}>Table Properties</Title>
      <form name="table-details-form" className={classNames(styles.basicForm)}>
        <label htmlFor="id">ID:</label>
        <Input size="small" id="id" name="id" disabled value={data?.id} />

        <label htmlFor="name">Name:</label>
        <Input
          size="small"
          id="name"
          name="name"
          value={data?.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </form>

      <Divider className={styles.divider} />

      <Title level={5}>Advanced Properties</Title>
      <form
        name="table-details-advanced-form"
        className={classNames(styles.advancedForm)}
      >
        <label htmlFor="x">x:</label>
        <Input
          size="small"
          id="x"
          name="x"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />

        <label htmlFor="y">y:</label>
        <Input
          size="small"
          id="y"
          name="y"
          value={y}
          type="number"
          onChange={(e) => setY(e.target.value)}
        />

        <label htmlFor="rotation">Rotation:</label>
        <Input
          size="small"
          id="rotation"
          name="rotation"
          type="number"
          value={rotation}
          onChange={(e) => setRotation(e.target.value)}
        />
      </form>
    </article>
  );
};

export default TableForm;
