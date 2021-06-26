const { initFirebase } = require('./firestore-db');

let firestore;

exports.onPreInit = (_, { credential }) => {
    firestore = initFirebase(require(credential));
}

exports.sourceNodes = async (
  { actions, createContentDigest },
  { types }
) => {
    const { createNode } = actions;

    const promises = types.map(async ({ collection, type, map }) => {
        const snapshot = await firestore.collection(collection).get();
        snapshot.docs.forEach(doc => {
            const contentDigest = createContentDigest(doc.id);
            createNode({
                ...map(doc.data()),
                id: doc.id,
                parent: null,
                children: [],
                internal: {
                    type,
                    contentDigest,
                },
            });
            Promise.resolve();
        });
    });

    await Promise.all(promises);
};
