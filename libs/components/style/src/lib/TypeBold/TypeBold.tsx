import styled from '@emotion/styled'
import { css, FunctionInterpolation, Theme } from '@emotion/react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

/* eslint-disable-next-line */
export interface TypeBoldProps {}

export const typeBoldCss: FunctionInterpolation<
	TypeBoldProps & { theme: Theme }
> = ({ theme }) => css`
	font-weight: bold;
`

export const TypeBold = styled(Typography)<TypeBoldProps>`
	${typeBoldCss}
`
export const TypeBoldBox = styled(Box)<TypeBoldProps>`
	${typeBoldCss}
`
