# Resolve alias webpack helper for Payload CMS

<a href="LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
</a>
<a href="https://github.com/thgh/payload-plugin-resolve-alias/issues">
  <img src="https://img.shields.io/github/issues/thgh/payload-plugin-resolve-alias.svg" alt="Issues" />
</a>
<a href="https://npmjs.org/package/payload-plugin-resolve-alias">
  <img src="https://img.shields.io/npm/v/payload-plugin-resolve-alias.svg?style=flat-squar" alt="NPM" />
</a>

## Encountered this?

```
ERROR in ./node_modules/next/dist/compiled/micromatch/index.js 22:3471-3486
Module not found: Error: Can't resolve 'util' in '\node_modules\next\dist\compiled\micromatch'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "util": require.resolve("util/") }'
        - install 'util'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "util": false }
```

## Features

- Easy way to fix the webpack error
- Built-in list of common server-only modules

## Installation

```
npm install payload-plugin-resolve-alias
# or
yarn add payload-plugin-resolve-alias
```

## Usage

```js
// payload.config.ts
import { resolveAlias, serverOnlyModules } from 'payload-plugin-resolve-alias'

export default buildConfig({
  plugins: [
    resolveAlias(serverOnlyModules, ['nodemailer']),

    // Alternative syntax
    resolveAlias(
      // Object
      { nodemailer: false, passport: false },
      // Arra
      ['nodemailer', 'passport'],
      // String
      'nodemailer',
      'passport',
      // Falsy arguments are ignored
      process.env.NODE_ENV === 'production' && ['production-only']
    ),
  ],
})
```

## Community-driven list of server-only modules

`serverOnlyModules` is an array of modules that you probably don't want in the browser:

- express
- express-session
- nodemailer
- passport
- util

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Contributions and feedback are very welcome.

To get it running:

1. Clone the project.
2. `npm install`
3. `npm run build`

## Credits

- [Thomas Ghysels](https://github.com/thgh)
- [All Contributors][link-contributors]

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-contributors]: ../../contributors
