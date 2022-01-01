import {
	Tree,
	formatFiles,
	installPackagesTask,
	readProjectConfiguration,
	updateJson,
} from '@nrwl/devkit'
import { join } from 'path'

const updater = (value: string) => (config: any) => {
	config.files = (config.files ?? []).filter(
		(x: string) => !x.endsWith('@types/global.d.ts')
	)

	config.files.push(value)

	return config
}

export default async function (tree: Tree, { project }: { project: string }) {
	const { projectType, root: root } = readProjectConfiguration(tree, project)

	const layerDelta = [...root].reduce((p, c) => p + +(c === '/'), 1)
	const globalsName = '@types/global.d.ts'
	const resolvedGlobalLocation = '../'.repeat(layerDelta) + globalsName

	const u = updater(resolvedGlobalLocation)

	if (projectType === 'library') {
		updateJson(tree, join(root, './tsconfig.lib.json'), u)
		updateJson(tree, join(root, './tsconfig.spec.json'), u)
	} else {
		updateJson(tree, join(root, './tsconfig.app.json'), u)
	}

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
