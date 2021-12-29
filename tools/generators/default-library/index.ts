import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit'
import { Linter } from '@nrwl/linter'
import { libraryGenerator, storybookConfigurationGenerator } from '@nrwl/react'
import globalTsInjector from '../global-ts-injector'

export default async function (tree: Tree, { name, ...schema }: any) {
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

	const postGenName = name.replace(/\//g, '-')

	await storybookConfigurationGenerator(tree, {
		name: postGenName,

		configureCypress: false,
		standaloneConfig: schema.standaloneConfig || false,
		generateStories: false,
	})

	await globalTsInjector(tree, { project: postGenName })

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
