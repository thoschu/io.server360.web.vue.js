// utils.mjs
export function addTextToBody(text) {
    const div = document.createElement('div');
    div.textContent = text;
    document.body.appendChild(div);
    // document.currentScript.before(counterNode);
    console.log(document);
}
