import { ThemeProvider as MuiTheme, Theme, useMediaQuery } from '@mui/material'
import {
	css,
	Global,
	ThemeProvider as EmotionThemeProvider,
} from '@emotion/react'
import { FC, useMemo } from 'react'

import { createTheme, Components } from '@mui/material/styles'

const components: Components = {
	MuiUseMediaQuery: {
		defaultProps: {
			noSsr: true,
		},
	},
}

export type ThemeName = 'dark' | 'light'

const themes: Record<ThemeName, Theme> = {
	light: createTheme({
		palette: {},
		components,
	}),
	dark: createTheme({
		palette: {},
		components,
	}),
}

export const ThemeProvider: FC = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
		noSsr: true,
	})

	const theme: Theme = useMemo(
		() => (prefersDarkMode ? themes.dark : themes.light),
		[prefersDarkMode]
	)

	return (
		<MuiTheme theme={theme}>
			<EmotionThemeProvider theme={theme}>
				<Global
					styles={(theme: Theme) => css`
						body {
							background-color: ${theme.palette.background
								.default};
							overflow-x: hidden;
						}
					`}
				/>
				{children}
			</EmotionThemeProvider>
		</MuiTheme>
	)
}
