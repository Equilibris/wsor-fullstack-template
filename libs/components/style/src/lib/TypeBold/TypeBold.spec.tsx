import { render } from '@testing-library/react'

import { TypeBold, TypeBoldBox } from './TypeBold'

describe('Bold', () => {
	it('should render successfully typography', () => {
		const { baseElement } = render(<TypeBold />)
		expect(baseElement).toBeTruthy()
	})

	it('should render successfully box', () => {
		const { baseElement } = render(<TypeBoldBox component="span" />)
		expect(baseElement).toBeTruthy()
	})
})
