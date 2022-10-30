import { Divider, Input } from "antd";
import classNames from "classnames";
import styles from "./TableForm.module.css";
import layoutStyles from "../../../../Shared/layout.module.css";
import Title from "antd/lib/typography/Title";

const TableForm = () => {
  return (
    <article
      className={classNames(styles.TableForm, layoutStyles.layoutPadding)}
    >
      <Title level={5}>Table Properties</Title>
      <form name="table-details-form" className={classNames(styles.basicForm)}>
        <label htmlFor="id">ID:</label>
        <Input size="small" id="id" disabled />

        <label htmlFor="name">Name:</label>
        <Input size="small" id="name" />
      </form>

      <Divider className={styles.divider} />

      <Title level={5}>Advanced Properties</Title>
      <form
        name="table-details-advanced-form"
        className={classNames(styles.advancedForm)}
      >
        <label htmlFor="x">x:</label>
        <Input size="small" id="x" />

        <label htmlFor="y">y:</label>
        <Input size="small" id="y" />

        <label htmlFor="rotation">rotation:</label>
        <Input size="small" id="rotation" />

        <label htmlFor="scale">scale:</label>
        <Input size="small" id="scale" />
      </form>
    </article>
  );
};

export default TableForm;
