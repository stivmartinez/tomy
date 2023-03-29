export function extractPostParams(json: any): Record<string, any> {
  const postParams: Record<string, any> = {};

  function traverse(json: any) {
    if (json && typeof json === 'object') {
      if (json.componentName === 'BlockPosts') {
        postParams[json.props.posts] = json.props.params;
      }
      for (const key in json) {
        traverse(json[key]);
      }
    }
  }

  traverse(json);
  return postParams;
}
