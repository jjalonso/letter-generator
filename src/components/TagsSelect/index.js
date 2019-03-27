import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  Tooltip,
  Tag,
  Icon,
} from 'antd';

import styles from './TagsSelect.module.css';

const TagsSelect = ({
  inputStyle,
  newLabel,
  maxCharacters,
  placeholder,
  choices,
  value,
  loading,
  onSearch,
  onSelect,
  onChange,
}) => {
  const inputRef = React.createRef();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputState, setInputState] = useState();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.rcSelect.getInputDOMNode().click();
    }
  }, [inputVisible]);

  const showInput = () => setInputVisible(true);

  const isNotInValues = v => value
    .findIndex(str => str.toLowerCase() === v.toLowerCase()) === -1;

  const handleTagClose = (removedTag) => {
    const newValue = value.filter(tag => tag !== removedTag);
    onChange(newValue);
  };

  const hideInput = () => {
    setInputState(undefined);
    setInputVisible(false);
  };

  const addValue = (v) => {
    if (v && isNotInValues(v)) {
      onChange([...value, v]);
    }
    hideInput();
    onSelect(v);
  };

  const handleBlur = () => {
    addValue(inputState);
  };

  const handleChange = (v) => {
    addValue(v);
  };

  const handleTyping = (v) => {
    setInputState(v);
    onSearch(v);
  };

  let filtered = choices.filter(c => isNotInValues(c));
  if (inputState) {
    filtered = filtered.filter(c => c.toLowerCase() !== inputState.toLowerCase());
    filtered.unshift(inputState);
  }

  return (
    <>
      { value.map((v) => {
        const isLongTag = v.length > maxCharacters;
        const tagElem = (
          <Tag
            closable
            className={styles.tag}
            key={v}
            afterClose={() => handleTagClose(v)}
          >
            {isLongTag ? `${v.slice(0, maxCharacters)}...` : v}
          </Tag>
        );
        return isLongTag ? <Tooltip title={v} key={v}>{tagElem}</Tooltip> : tagElem;
      })}

      { !inputVisible && (
        <Tag
          className={styles.newTag}
          onClick={showInput}
        >
          <Icon
            className={styles.newIcon}
            type="plus"
          />
          {newLabel}
        </Tag>
      )}

      { inputVisible && (
        <Select
          showSearch
          loading={loading}
          ref={inputRef}
          className={`${inputStyle} ${styles.input}`}
          placeholder={placeholder}
          value={inputState}
          onBlur={handleBlur}
          onSelect={handleChange}
          dropdownMatchSelectWidth={false}
          onSearch={handleTyping}
        >
          { filtered.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>) }
        </Select>
      )}
    </>
  );
};

TagsSelect.propTypes = {
  newLabel: PropTypes.string,
  maxCharacters: PropTypes.number,
  placeholder: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
};

TagsSelect.defaultProps = {
  loading: false,
  newLabel: 'New',
  maxCharacters: 35,
  placeholder: '',
  choices: [],
  value: [],
  onSelect: () => {},
  onSearch: () => {},
  onChange: () => {},
};

export default TagsSelect;