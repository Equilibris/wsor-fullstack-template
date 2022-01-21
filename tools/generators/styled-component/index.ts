import {
	Tree,
	formatFiles,
	installPackagesTask,
	StringInsertion,
	generateFiles,
	readProjectConfiguration,
	readWorkspaceConfiguration,
} from '@nrwl/devkit'
import { trimEnd } from 'lodash'
import { join } from 'path'

export default async function (
	tree: Tree,
	scheme: {
		project: string
		mui: boolean
		name: string
		component: string
	}
) {
	const { component, mui, name, project } = scheme

	const libraryRoot = readProjectConfiguration(tree, project).root

	const npmScope =
		readWorkspaceConfiguration(tree).npmScope ?? 'wsor-template'

	const baseFilePath = join(libraryRoot, `./src/lib/${name}`)
	const indexPath = join(libraryRoot, './src/index.ts')

	generateFiles(tree, join(__dirname, './files'), baseFilePath, {
		...scheme,
		npmScope,
		tmpl: '',
	})

	tree.write(
		indexPath,
		trimEnd(tree.read(indexPath).toString()) +
			`\nexport * from './lib/${name}/${name}';`
	)

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
