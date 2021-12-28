import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit'
import { Linter } from '@nrwl/linter'
import { libraryGenerator } from '@nrwl/react'
import globalTsInjector from '../global-ts-injector'

export default async function (tree: Tree, { name, schema }: any) {
	await libraryGenerator(tree, {
		name: name,
		linter: Linter.EsLint,
		skipFormat: false,
		skipTsConfig: false,
		style: '@emotion/styled',
		unitTestRunner: 'jest',
		component: false,
		pascalCaseFiles: true,
		compiler: 'babel',
		buildable: true,
		strict: true,
		...schema,
	})

	// await globalTsInjector(tree, { project: schema.name });

	await formatFiles(tree)
	return () => {
		installPackagesTask(tree)
	}
}
