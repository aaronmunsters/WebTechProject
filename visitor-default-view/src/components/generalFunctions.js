function parseProps(obj, props) {
  props.forEach(p => (obj[p] = JSON.parse(obj[p])));
}

export default parseProps;
