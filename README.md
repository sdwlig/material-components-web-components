# Material Web Components

> :warning: These components are still a work in progress. :warning:

Material Web Components helps developers execute [Material Design](https://www.material.io) using [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Built on top of the [Material Components Web](https://github.com/material-components/material-components-web) project and [LitElement](https://github.com/polymerlabs/lit-element), the Material Web Components enable a reliable development workflow to build beautiful and functional web projects.

Web Components can be seamlessly incorporated into a wide range of usage contexts. Whether you're already heavily invested in another framework or not, it's easy to incorporate Material Web Components into your site in a lightweight, idiomatic fashion.

**[DEMOS](https://material-components.github.io/material-components-web-components/demos/index.html)**

<!-- TODO
Insert screenshot of a demo page, including a code snippet.
-->

## Authentic `release` instructions

1. Merge with `develop` branch

    ```git merge origin develop```

    > Fix all merge conflicts.

    > Don't worry about renaming `@material` to `@authentic` at this point.

2. Rename packages names from `@material` to `@authentic`

    ```npm run rescope:authentic```

3. Remove `node_modules` folder and `package-lock.json` file

    ```rm -Rf node_modules && rm package-lock.json```

4. Install dependencies and create the `@authentic` folder

    ```npm i && mkdir node_modules/@authentic```

    > TODO: automate this step

5. Bootstrap the project

    ```npm run bootstrap```

6. Test the project

    ```npm run dev```

    > Test the new functionality.

    > :warning: If something is broken at this point: roll back your changes, fix the issue on `develop` branch and start again from step 1. :warning:

7. `PUSH` your changes

    > If you have new changes at this point, add them to the stash and combine them with the previous commit.

    ```git commit -a --amend```

    > A new screen will appear with the previous commit description, you just need to `save an quit` by typing `:wq` and then clicking `ENTER`.

    > Then:

    ```git push origin publish```

8. Use lerna to help you with the release

    ```lerna publish```

    > Follow lerna instructions in order to move forward with the release

    > Every new release will follow the `PATCH release` approach based on `master`'s version currently at `0.5.0`, so from now on it will continue with 0.5.**`X`**.

    > Lerna will automatically change all packages versions and push a new `commit` & `tag` labeled as `v0.5.X`, right after that it will update the git head of them.

9. Since at this point lerna has updated all of our package.json again, we will need to `COMMIT` and `PUSH` our changes.

    ```git commit -am 'git head updated' && git push origin publish```

## Quick start

> Note: This guide assumes you have npm installed locally.

The easiest way to try out the Material Web Components is to use one of these online tools:

  * Runs in all [supported browsers](#browser-support): [Glitch](https://glitch.com/edit/#!/material-web-components)

  * Runs in browsers with [JavaScript Modules](https://caniuse.com/#search=modules): [JSBin](http://jsbin.com/gitufet/edit?html,output), [CodePen](https://codepen.io/sorvell/pen/MGrZqp?editors=1000).

Or you can also copy [this HTML file](https://gist.githubusercontent.com/sorvell/2ec11ccde449815bc97edc1026be27a9/raw/8bab65dd5d15f657ae69493851690c5564367d13/index.html) into a local file and run it in any browser that supports JavaScript Modules.

When you're ready to use the Material Web Components in your web application:

1. Ensure the webcomponents polyfills are included in your HTML page

    - Install webcomponents polyfills

        ```npm i @webcomponents/webcomponentsjs```

    - Add webcomponents polyfills to your HTML page

        ```<script src="@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>```

2. Add one of the MWC elements to your project, for example for icon:

    ```npm i @material/mwc-icon```

3. Import the element definition into your HTML page:

    ```<script type="module" src="@material/mwc-icon/index.js"></script>```

    Or into your module script:

    ```import {Icon} from "@material/mwc-icon"```

4. Create an instance of element in your HTML page, or via any framework that [supports rendering Custom Elements](https://custom-elements-everywhere.com/):

    ```<mwc-icon>sentiment_very_satisfied</mwc-icon>```

5. Install the Polymer CLI:

    ```npm i -g polymer-cli```

6. Run the development server and open a browser pointing to its URL:

    ```polymer serve```

> The Material Web Components are published on [npm](https://www.npmjs.com) using JavaScript Modules.
This means it can take advantage of the standard native JavaScript module loader available in all current major browsers.
>
> However, since the Material Web Components use npm convention to reference dependencies by name, a light transform to rewrite specifiers to URLs is required to get it to run in the browser. The polymer-cli's development server `polymer serve` automatically handles this transform.

Tools like [WebPack](https://webpack.js.org/) and [Rollup](https://rollupjs.org/) can also be used to serve and/or bundle.

## Contributing guide
Below are instructions for setting up project development.

1. Clone this repo with `git clone`.
1. Install dependencies by running `npm run bootstrap`
1. Run a development server with `npm run dev`
    - View the demos by accessing `<dev server url>`/demos/index.html
    - This will also build the project.
1. Build the project with `npm run build`
1. Run tests with `npm run test`

### Developing Components

Components are written in [Typescript](https://typescriptlang.org), and compiled to [Javascript Modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/).

The output Javascript Modules can be used in every modern browser directly, and are supported a wide variety of popular bundler and build tools.

The components render output structure, handle styling, and manage data flow with `lit-html` while integrating with Material Design's common logic library for each component.

### Styling Components

Components define their styling using [SASS](http://sass-lang.com/).

The SASS output is built into a javascript module which exports the component's styling as a [lit-html](https://github.com/Polymer/lit-html) template.

Component styling is compiled with both `npm run build` and `npm run watch`.

To compile the component SASS manually, use `npm run build-styling`

## Useful Links

- [All Components](packages/)
- [Demos](https://material-components.github.io/material-components-web-components/demos/index.html)
- [Contributing](CONTRIBUTING.md)
- [Material.io](https://www.material.io) (external site)
- [Material Design Guidelines](https://material.io/guidelines) (external site)

## Browser Support

We officially support the last two versions of every major browser. Specifically, we test on the following browsers:

- Chrome
- Safari
- Firefox
- IE 11/Edge
- Opera
- Mobile Safari
- Chrome on Android
