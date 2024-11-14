'use client';
import React, { useState } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';
import Icon from '../icon/icon';

const Input = ({
  id,
  label,
  name = '',
  labelVisible,
  icon,
  email,
  password,
  placehodler = '',
  readonly,
  disabled,
  value,
  error: errorProps,
  className = '',
  onChange,
  ...restProps
}) => {
  const [inputValue, setinputValue] = useState(value ? value : '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const checkType = () => {
    if (email) {
      return 'email';
    }

    if (password) {
      return isPasswordVisible ? 'text' : 'password';
    }
    return 'text';
  };

  const handleChange = (e) => {
    setinputValue(e.target.value);
    onChange(e);
  };

  const iconType = isPasswordVisible ? 'show' : 'hide';
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      <div
        className={classNames(
          styles.inputWrapper,
          errorProps && styles.inputWrapperError
        )}
      >
        {icon ? <Icon type={icon} /> : null}
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placehodler}
          readOnly={readonly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password ? (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>
      {errorProps && (
        <span role='alert' className={styles.error}>
          {errorProps.message}
        </span>
      )}
    </div>
  );
};

export default Input;
