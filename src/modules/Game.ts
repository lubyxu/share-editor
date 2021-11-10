import Quill from 'quill';

const Parchment = Quill.import('parchment')
function sanitize(url, protocols) {
    let anchor = document.createElement('a');
    anchor.href = url;
    let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
    return protocols.indexOf(protocol) > -1;
}

const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];


class Game extends Parchment.Embed {
  static create(value) {
    let node = super.create(value);

    // node.innerText = value;
    node.setAttribute('src', value);
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  }

  static value(domNode) {
    //   return domNode.innerText
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Game.blotName = 'game';
Game.tagName = 'IMG';


export default Game;
