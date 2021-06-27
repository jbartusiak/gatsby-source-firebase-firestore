# Gatsby Firestore Source Plugin

This is obviously based on
https://github.com/taessina/gatsby-source-firestore

I decided to extend the capability a bit, to better suit my needs - the version of the plugin listed above did not work
for me at all :(

To use the plugin, first run either:

```
yarn add @bartusiak/gatsby-source-firebase-firestore
```

or

```
npm install @bartusiak/gatsby-source-firebase-firestore
```

Then, add the following lines to your gatsby-config.js:

```
const credential = require('...path-to-your-credentials');
const types = require('...path to types def');

module.exports = {
  plugins: [
    (...any other plugins you're using)
    {
      resolve: 'gatsby-source-firebase-firestore',
      options: {
        credential,
        types,
      },
    },
  ]
```

To get the credential JSON file, please follow the intro described
[in Google's docs](https://firebase.google.com/docs/firestore/quickstart#node.js).

For the types, they are just simple array:

```
module.exports = [
  {
    type: `Comments`,
    collection: `comments`,
    map: doc => ({
      content: doc.content,
      name: doc.name,
      slug: doc.slug,
      time: doc.time.toDate().toString(),
    }),
  },
  {
    type: 'PostContents',
    collection: 'post-content',
    map: doc => ({
      contents: doc.contents,
    }),
  },
  {
    type: 'Posts',
    collection: 'posts',
    map: doc => ({
      createdAt: doc.createdAt.toDate().toString(),
      author: doc.author,
      locale: doc.locale,
      title: doc.title,
      updatedAt: doc.updatedAt.toDate().toString(),
      content___NODE: doc.content.id,
    }),
  },
];
```

For embedded documents, append \_\_\_NODE to the field name
(take care - that's **three** underlines in a row) and give it the value of the id of related item (such as posts and
post-contents here). Read more about mapping relationships
[in this tutorial](https://www.gatsbyjs.com/docs/creating-a-source-plugin/#option-1-foreign-key-relationships).
