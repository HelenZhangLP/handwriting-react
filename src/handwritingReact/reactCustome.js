
function createElement(type, props, ...children) {
    console.log(type, 'createElement')
    console.log(props, 'createElement')
    console.log(...children, 'createElement')
}

export default {createElement}