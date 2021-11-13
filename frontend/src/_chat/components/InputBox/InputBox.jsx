import React from 'react';
import { InputUnstyled } from '@mui/core'
import { styled } from '@mui/system'
import { ChangeCircle } from '@mui/icons-material';

const StyledRoot = styled('div')`
    width: 85%;
    box-sizing: border-box;
`

const StyledInput = styled('input')`
  width: 100%;
  font-size: 1rem;
  line-height: 1.4375em;
  background: #EFF0F6;
  border: none;
  border-radius: 30px;
  padding: 6px 12px;
  color: #20262d;
  box-sizing: border-box;

  &:focus {
      outline: none;
  }
`

const InputBox = React.forwardRef(function CustomInput({handleSubmitMessage, ...rest}, ref) {
  return (
    <InputUnstyled
        components={{ Root: StyledRoot, Input: StyledInput }}
        {...rest}
        ref={ref}
    />
  );
});

export default InputBox;