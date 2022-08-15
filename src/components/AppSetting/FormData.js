import React, { useMemo } from "react";
import { Form, DatePicker, InputNumber, Input } from "antd";

const handleType = (type) => {
  let formField;
  switch (type) {
    case "float":
      formField = <InputNumber />;

    case "data":
      formField = <DatePicker />;

    default:
      formField = <Input />;
  }
  console.log(formField, 'form Fieldd')
  return formField;
};

const FormItem = Form.Item;

const FormDataField = ({ selectedField, dataList }) => {
  const form = Form.useForm();

  const handleFinish = (values) => {

    console.log(values, 'val;uess')
  };

  const formData = useMemo(
    () =>
      selectedField?.length > 0 &&
      dataList.map((dataItem) => selectedField.map((field) => dataItem?.key == field && <FormItem rules={{required: true, message: 'Is Required'}} name={'dhrindra'}>
      {handleType(dataItem?.type)}
    </FormItem>)),
    [selectedField, dataList]
  );

  return (
    <>
      <Form form={form} onFinish={handleFinish}>
        {/* {formData} */}
      </Form>
    </>
  );
};

export default FormDataField;
