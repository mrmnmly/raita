# admin

> Vue.js admin panel for raita static site generator.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Customization

### Custom entries metadata

Markdown file parsing supports metadata at the top of the file. Example:

```
title: Hello world
date: 2017-11-27
tags: blog, hello world, random stuff

< after blank line the article content is stored >
```

By default, *Raita* supports `title`, `date`, and `tags` metadata. If You want to customize these properties to be accessible in the editor, please take a look on `src/components/EditorMetadataForm.vue` component file. 
