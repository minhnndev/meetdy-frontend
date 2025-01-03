import React from "react";
import { IconLanguage } from "@douyinfe/semi-icons";
import { Select } from "@douyinfe/semi-ui";

const SelectLanguage = () => {
    return (
        <Select defaultValue="English" style={{ width: 150 }} insetLabel={<IconLanguage />}>
            <Select.Option value="vn-VI">Việt Nam</Select.Option>
            <Select.Option value="en-EN">English</Select.Option>
        </Select>
    );
};

export default SelectLanguage;
