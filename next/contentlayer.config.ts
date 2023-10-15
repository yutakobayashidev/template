import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  computedFields: {
    url: {
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
      type: "string",
    },
  },
  fields: {
    title: { required: true, type: "string" },
    date: { required: true, type: "date" },
  },
  filePathPattern: `**/*.md`,
}));

export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });
