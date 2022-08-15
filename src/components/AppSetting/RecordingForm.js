import React, { useEffect, useId, useMemo, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, DatePicker, InputNumber, Radio, Checkbox } from "antd";

import moment from "moment";

import RecordingFilter from "./RecordingFilter";
import { useSessionRecordingCustomHooks } from "./Hooks/SessionRecordingFilter";

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const areas = [
  {
    label: "Beijing",
    value: "Beijing",
  },
  {
    label: "Shanghai",
    value: "Shanghai",
  },
];
const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};

const initalData = [
  {
    "attribute": "country",
    "title": "country",
    "operator": "isNot",
    "value": [
      {
        "key": "Albania",
        "val": "Albania"
      },
      {
        "key": "Algeria",
        "val": "Algeria"
      },
      {
        "key": "Andorra",
        "val": "Andorra"
      },
      {
        "key": "Anguilla",
        "val": "Anguilla"
      }
    ]
  },
  {
    "attribute": "isCrashed",
    "title": "isCrashed",
    "operator": "is",
    "value": [
      {
        "key": "is true",
        "val": true
      }
    ]
  },
  {
    "attribute": "deviceModel",
    "title": "model",
    "operator": "is",
    "value": [
      {
        "key": "Jiateng JT1241",
        "val": [
          "JT1241"
        ]
      }
    ]
  },
  {
    "attribute": "date",
    "title": "date",
    "operator": "lt",
    "value": [
      "2022-08-31"
    ]
  }
]

const fieldType = (item ) => {
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
    // case "boolean":
    //   const filterRadioOptions = item.options;
    //   return (
    //     <RadioGroup>
    //       {filterRadioOptions.map((obj) => (
    //         <Radio value={obj?.val}>{obj?.val ? "True" : "False"}</Radio>
    //       ))}
    //     </RadioGroup>
    //   );

    case "float":
      return <InputNumber control={false} min={0} placeholder={item.placeholder} />;

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

const RecordingForm = () => {
  const [form] = Form.useForm();
  const userId = useId()
  const { selectedFilter, filterData, handleSelectedFilter } =
    useSessionRecordingCustomHooks();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const getFields = (name, restField) => {
    const children = [];
    const selectedAttribute = selectedFilter[name];
    const selctedField = filterData.find(
      (data) => data?.key === selectedAttribute
    );

    const itemValue = {
      type: selctedField?.type,
      options: selctedField?.possibleValue,
      placeholder: 'Please select'
    }


    children.push(
      <Space key={userId}>
       
        <Form.Item> {`Rule ${name+1}: `} {selctedField?.title}</Form.Item>
        <Form.Item name={[name,'attribute']} initialValue={selctedField?.attribute}>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
        {...restField}
          name={[name, "operator"]}
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select placeholder="Please select operator">
            {selctedField?.operator?.map((obj) => (
              <Option key={obj?.key} value={obj?.value}>
                {obj?.key}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
                {...restField}

          name={[name, "value"]}
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          {selctedField 
          && fieldType(itemValue)
          }
          
        </Form.Item>
      </Space>
    );

    return children;
  };

  const handleChange = (e) => {
    
    form.setFieldsValue({
      filters: e.target.checked ? initialSessionRuleFormattedData :  [],
    });
  };

const initialSessionRuleFormattedData = useMemo(()=> initalData && initalData.map(field => {
  let newField = {...field}
  if(field?.attribute === 'date'){
    newField.value = moment(field?.value) 
  }
  return newField
}), [])

const initialSessionRuleKey = useMemo(()=>
initalData && initalData.map(value => value?.attribute), [initalData]
) 

  useEffect(()=>{
   handleSelectedFilter(initialSessionRuleKey)
  }, [initalData])

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
     initialValues={{enableSessionRecording: true, filters: initialSessionRuleFormattedData }}
      autoComplete="off"
    >
      <FormItem
        name="enableSessionRecording"
        label=""
        valuePropName="checked"
      >
        <Checkbox onChange={handleChange} >Enable Session recording</Checkbox>
      </FormItem>

      <Form.List name="filters">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={`${key}`} align="baseline">
                {getFields(name, restField)}
                <MinusCircleOutlined
                  onClick={() => {
                    handleSelectedFilter(
                      selectedFilter.filter((_, index) => index !== name)
                    );
                    remove(name);
                  }}
                />
              </Space>
            ))}

            <Form.Item>
              <RecordingFilter add={add} remove={remove} />
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* <RecordingFilter  /> */}

      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};

export default RecordingForm;
