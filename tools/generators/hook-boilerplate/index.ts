import {
	Tree,
	formatFiles,
	installPackagesTask,
	readProjectConfiguration,
	generateFiles,
	readWorkspaceConfiguration,
} from '@nrwl/devkit'
import { join } from 'path'
import camelCase from 'lodash/camelCase'
import startCase from 'lodash/startCase'

export default async function (
	tree: Tree,
	schema: {
		project: string
		name: string
		type: 'reducer' | 'provider' | 'themeProvider'
	}
) {
	const { name, project, type } = schema

	const libraryRoot = readProjectConfiguration(tree, project).root

	const npmScope =
		readWorkspaceConfiguration(tree).npmScope ?? 'wsor-template'

	const camelName = name[0].toLowerCase() + name.slice(1)

	const baseFilePath = join(libraryRoot, `./src/lib/use${name}`)
	const indexPath = join(libraryRoot, './src/index.ts')

	generateFiles(tree, join(__dirname, `./files/${type}`), baseFilePath, {
		name,
		camelName,
		npmScope,
		tmpl: '',
	})

	tree.write(
		indexPath,
		`export * from './lib/use${name}/${name}';` + tree.read(indexPath)
	)

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
