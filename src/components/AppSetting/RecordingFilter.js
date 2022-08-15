import React, { useEffect, useMemo } from "react";
import { Menu, Popover, Button, Dropdown } from "antd";

import { useSessionRecordingCustomHooks } from "./Hooks/SessionRecordingFilter";

const originalData = require("../AppSetting/originalData.json");

const sessionProperties = [
  "isCrashed",
  "country",
  "date",
  "duration",
  "noOfInteraction",
];
const versions = ["appVersion", "sdkVersion"];
const deviceProperties = ["osVersion", "deviceModel"];
const extraField = ["event", "screen"];

const sessionDataField = {
  label: "Session properties:",
  type: "group",
  children: [],
};

const versionsDataField = {
  label: "Versions:",
  type: "group",
  children: [],
};

const deviceDataField = {
  label: "Device properties:",
  type: "group",
  children: [],
};

const RecordingFilter = ({ add, remove }) => {

  const {selectedFilter, handleSelectedFilter, setFilterData} =
    useSessionRecordingCustomHooks();

  const handleClick = (item) => {
    handleSelectedFilter(selectedFilter?.includes(item.key) ? selectedFilter.filter(key => key !== item?.key)   : [...selectedFilter, item.key]);
   const indexOfField = selectedFilter.indexOf(item.key)
    !selectedFilter?.includes(item.key) ?  add() : remove(indexOfField);
  };

  const handleDuplicateArray = (arrData) =>
    arrData.filter((v, i, a) => a.findLastIndex((v2) => v2.key === v.key) === i);

  const handleIsOfOrNonOf = (value) => value?.includes("Any of the");


  const filterFormatItems = useMemo(() => {
    let filterField = [];
    originalData?.length && originalData.map((data) => {
      if (sessionProperties?.includes(data.attribute)) {
        sessionDataField.children.push({
          label: data?.title,
          key: `${data?.attribute}`,
          disabled: selectedFilter?.includes(`${data?.attribute}`)
        });
      }
      if (versions?.includes(data.attribute)) {
        versionsDataField.children.push({
          label: data?.title,
          key: `${data?.attribute}`,
          disabled: selectedFilter?.includes(`${data?.attribute}`)
        });
      }
      if (deviceProperties?.includes(data.attribute)) {
        deviceDataField.children.push({
          label: data?.title,
          key: `${data?.attribute}`,
          disabled: selectedFilter?.includes(`${data?.attribute}`)
        });
      }
      if (extraField.includes(data?.attribute)) {
        filterField.push({
          label: data?.title,
          key: `${data?.attribute}-${
            handleIsOfOrNonOf(data?.title) ? "is" : "isNot"
          }`,
          disabled: selectedFilter?.includes(`${data?.attribute}-${
            handleIsOfOrNonOf(data?.title) ? "is" : "isNot"
          }`) || selectedFilter?.includes(`${data?.attribute}-${
            !handleIsOfOrNonOf(data?.title) ? "is" : "isNot"
          }`)

        });
      }
    });
    sessionDataField.children = handleDuplicateArray(sessionDataField.children);
    versionsDataField.children = handleDuplicateArray(
      versionsDataField.children
    );
    deviceDataField.children = handleDuplicateArray(deviceDataField.children);

    filterField = [...filterField, sessionDataField];
    filterField = [...filterField, versionsDataField];
    filterField = [...filterField, deviceDataField];
    return filterField;
  }, [selectedFilter]);

   const handleOriginalFilterDataKey = ()=> originalData.map(data =>{
     return {...data, key: extraField.includes(data?.attribute) ? `${data?.attribute}-${
      handleIsOfOrNonOf(data?.title) ? "is" : "isNot"
    }` : `${data?.attribute}`}
   })
  

  useEffect(()=>{
    setFilterData(handleOriginalFilterDataKey())
  }, [originalData])

  console.log(filterFormatItems, 'filterFormatItems', originalData)


  const menu = (
    <Menu
      onClick={handleClick}
      items={filterFormatItems}
      selectedKeys={selectedFilter}
    />
  );

  return (
    <>
     
      <Dropdown overlay={menu} trigger={'click'}>
      <Button style={{ margin: "12px" }}>Add Rules</Button>

  </Dropdown>
    </>
  );
};

export default RecordingFilter;
