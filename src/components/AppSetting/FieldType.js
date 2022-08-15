import React from "react";
import { DatePicker, Input, InputNumber, Select, Radio } from "antd";
import moment from "moment";

const Option = Select.Option;
const RadioGroup = Radio.Group;

const FieldType = ({ item }) => {
  const { type } = item;
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  switch (type) {
    case "date":
      return (
        <DatePicker
          placeholder={item.placeholder}
          disabledDate={(current) => disabledDate(current)}
        />
      );

    case "input":
      return <Input placeholder={item.placeholder} />;
    case "boolean":
      const filterRadioOptions = item.options;
      return (
        <RadioGroup>
          {filterRadioOptions.map((obj) => (
            <Radio value={obj?.val}>{obj?.val ? "True" : "False"}</Radio>
          ))}
        </RadioGroup>
      );

    case "float":
      return <InputNumber controls={false} min={0} placeholder={item.placeholder} />;

    default:
      const filterOptions = item?.options || [];
      return (
        <Select
          mode="multiple"
          placeholder={item.placeholder}
          allowClear
          showSearch
          optionFilterProp="children"
        >
          {filterOptions.map((obj) => (
            <Option key={obj.key} value={obj.val}>
              {obj.val}
            </Option>
          ))}
        </Select>
      );
  }
};

export default FieldType;
