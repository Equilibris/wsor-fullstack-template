import {
	Tree,
	formatFiles,
	installPackagesTask,
	readProjectConfiguration,
	generateFiles,
	readWorkspaceConfiguration,
} from '@nrwl/devkit'
import { join } from 'path'

export default async function (
	tree: Tree,
	scheme: {
		project: string
		name: string
	}
) {
	const { name, project } = scheme

	const libraryRoot = readProjectConfiguration(tree, project).root

	const npmScope =
		readWorkspaceConfiguration(tree).npmScope ?? 'wsor-template'

	const baseFilePath = join(libraryRoot, `./src/lib/Type${name}`)
	const indexPath = join(libraryRoot, './src/index.ts')

	generateFiles(tree, join(__dirname, './files'), baseFilePath, {
		...scheme,
		npmScope,
		tmpl: '',
	})

	tree.write(
		indexPath,
		`export * from './lib/Type${name}/Type${name}';` + tree.read(indexPath)
	)

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
