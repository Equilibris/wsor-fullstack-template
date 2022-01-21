import { Story, Meta } from '@storybook/react'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@wsor-template/context'

import { TypeBold, TypeBoldBox, TypeBoldProps } from './TypeBold'

export default {
	component: TypeBold,
	title: 'TypeBold',
	decorators: [
		(Story) => (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		),
	],
} as Meta

const Standalone: Story<TypeBoldProps & { text: string }> = ({
	text,
	...args
}) => <TypeBold {...args}>{text}</TypeBold>

const Boxed: Story<TypeBoldProps & { text: string }> = ({ text, ...args }) => (
	<Typography>
		{text.replace(/<.*/, '')}
		<TypeBoldBox component="span" {...args}>
			{text.replace(/.*<|>.*/g, '')}
		</TypeBoldBox>
		{text.replace(/.*(>|^)/, '')}
	</Typography>
)

export const Primary = Standalone.bind({})
Primary.args = {
	text: 'Lorem ipsum dolor sit amet.',
}

export const BoxedPrimary = Boxed.bind({})
BoxedPrimary.args = {
	text: 'Lorem < ipsum > dolor sit amet.',
}
