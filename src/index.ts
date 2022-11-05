import { Config } from 'payload/config'

export const isServer = typeof window !== 'undefined'
export const isBrowser = !isServer

export const serverOnlyModules = [
  'express',
  'express-session',
  'nodemailer',
  'passport',
  'util',
]

/** Webpack type for alias */
export interface ResolveOptionsWebpackOptions {
  alias?: {
    [index: string]: string | false | string[]
  }
  // Not supported
  // | {
  //     alias: string | false | string[]
  //     name: string
  //     onlyModule?: boolean
  //   }[]
}

/** Options for this plugin */
export type resolveAliasPluginOptions =
  | ResolveOptionsWebpackOptions['alias']
  | string
  | string[]
  | false

/**
 * Pass the module names that should be bundled by webpack
 *
 * ```
 * export default buildConfig({
 *   plugins: [
 *     resolveAlias('nodemailer'),
 *   ],
 * })
 * ```
 */
export const resolveAlias =
  (...aliases: resolveAliasPluginOptions[]) =>
  (incoming: Config): Config => {
    const clean = normalize(aliases)
    return {
      ...incoming,
      admin: {
        ...incoming.admin,
        webpack: (webpackConfig) => {
          const config = incoming.admin?.webpack?.(webpackConfig) || {}
          if (Array.isArray(config.resolve?.alias))
            throw new Error('payload-plugin-resolve-alias cannot handle arrays')
          return {
            ...config,
            resolve: {
              ...config.resolve,
              alias: {
                ...clean,
                ...config.resolve?.alias,
              },
            },
          }
        },
      },
    }
  }

/** Simplify the options to a single object */
function normalize(aliases: resolveAliasPluginOptions[]) {
  const clean: ResolveOptionsWebpackOptions['alias'] = {}

  for (const alias of aliases) {
    if (!alias) continue
    if (Array.isArray(alias)) {
      aliases.push(...alias)
      continue
    }
    if (typeof alias === 'string') {
      clean[alias] = false
      continue
    }
    Object.assign(clean, alias)
  }

  return clean
}
