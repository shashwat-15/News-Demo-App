import React from 'react';
import Select from 'react-select';

const sourceStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#333', // Dark background to match the theme
    borderColor: '#444', // Darker border to match the theme
    padding: '5px 0px',
    color: '#fff', // White text for contrast
    boxShadow: 'none', // Remove default shadow
    '&:hover': {
      borderColor: '#555', // Slightly lighter border on hover
    },
    width: '200px'
  }),
  input: (styles) => ({
    ...styles,
    color: '#fff'
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#aaa', // Placeholder color set to #aaa
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#333', // Background for dropdown menu
    color: '#fff', // White text in the dropdown
    width: '200px'
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#444' : '#333', // Darker background on hover
    color: '#fff', // White text to maintain contrast
    cursor: 'pointer', // Pointer cursor on hover
    width: '200px'
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#444', // Darker background for selected values
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#fff', // White text for selected value labels
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#fff', // White color for the remove icon
    backgroundColor: '#007bff', // Blue background for the remove icon
    borderRadius: '3px',
    ':hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
      color: 'white',
    },
  }),
};

const SourceSelect = ({ sourceOptions, selectedSources, setSelectedSources }) => {
  return (
    <Select
      options={sourceOptions}
      isMulti
      closeMenuOnSelect={false}
      value={selectedSources}
      onChange={setSelectedSources}
      placeholder="Search by source"
      styles={sourceStyles}
    />
  );
};

export default SourceSelect;
