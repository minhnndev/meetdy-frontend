import { IconSearch, IconUserAdd, IconUserGroup } from "@douyinfe/semi-icons";
import { Button, Input } from "@douyinfe/semi-ui";

const SearchBar = () => {
  return (
    <div style={{ display: "flex" }}>
      <Input
        prefix={<IconSearch />}
        style={{ marginRight: 2 }}
        placeholder="Tìm kiếm"
      />
      <Button
        theme="borderless"
        type="tertiary"
        icon={<IconUserAdd />}
        style={{ marginRight: 2 }}
      />
      <Button theme="borderless" type="tertiary" icon={<IconUserGroup />} />
    </div>
  );
};

export { SearchBar };
