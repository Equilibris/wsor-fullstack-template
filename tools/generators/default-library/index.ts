import {
	Tree,
	formatFiles,
	installPackagesTask,
	readProjectConfiguration,
	updateJson,
} from '@nrwl/devkit'
import { Linter } from '@nrwl/linter'
import { libraryGenerator } from '@nrwl/react'
import { configurationGenerator } from '@nrwl/storybook'
import globalTsInjector from '../global-ts-injector'
import { join } from 'path'

export default async function (
	tree: Tree,
	{ name, storybook, ...schema }: any
) {
	await libraryGenerator(tree, {
		name,
		linter: Linter.EsLint,
		skipFormat: false,
		skipTsConfig: false,
		style: '@emotion/styled',
		unitTestRunner: 'jest',
		component: false,
		pascalCaseFiles: true,
		compiler: 'babel',
		buildable: false,
		strict: true,
		...schema,
	})

	const postGenName = name.replace(/\//g, '-')

	if (storybook) {
		// HACK: Fix bug related to reference removing external type inclusion
		await configurationGenerator(tree, {
			name: postGenName,

			configureCypress: false,
			standaloneConfig: schema.standaloneConfig || false,
			uiFramework: '@storybook/react',
		})

		const libraryRoot = readProjectConfiguration(tree, postGenName).root

		updateJson(
			tree,
			join(libraryRoot, `./.storybook/tsconfig.json`),
			(cfg) => ({
				...cfg,
				include: [],
			})
		)

		updateJson(tree, join(libraryRoot, `./tsconfig.lib.json`), (cfg) => ({
			...cfg,
			exclude: (cfg.exclude ?? []).filter(
				(x: string) => !x.includes('stories')
			),
		}))
	}

	await globalTsInjector(tree, { project: postGenName })

	await formatFiles(tree)

	return () => {
		installPackagesTask(tree)
	}
}
