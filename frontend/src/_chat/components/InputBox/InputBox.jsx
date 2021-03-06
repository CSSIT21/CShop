import React, { useEffect } from 'react'
import { InputUnstyled } from '@mui/core'
import { styled } from '@mui/system'
import { ChangeCircle } from '@mui/icons-material'

const StyledRoot = styled('div')`
    width: 85%;
    box-sizing: border-box;
`

const StyledInput = styled('input')`
    width: 100%;
    font-size: 1rem;
    line-height: 1.4375em;
    background: #eff0f6;
    border: none;
    border-radius: 30px;
    padding: 6px 12px;
    color: #20262d;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
`

const InputBox = React.forwardRef(function CustomInput(
    { forwardedRef, onChange, ...rest },
    ref
) {
    useEffect(() => {
        forwardedRef.current.childNodes[0].focus()
    })
    return (
        <InputUnstyled
            components={{ Root: StyledRoot, Input: StyledInput }}
            tabIndex={0}
            onChange={onChange}
            {...rest}
            ref={forwardedRef}
        />
    )
})

export default InputBox
