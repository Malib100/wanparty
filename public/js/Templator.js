/* --------------------------------------------------------------------
 *
 * Templator is a handy lightweight JS utility that renders static templates within the DOM.
 * Its main purpose is to reduce the amount of repeated html.
 *
 * --------------------------------------------------------------------
 * 
 * Current version: 0.0.7 (14.11.2019)
 * Initial version: 0.0.1 (12.09.2019)
 * Author: Žan Pukmajster (https://pukmajster.github.io)
 *
 * --------------------------------------------------------------------
 *
 * EXAMPLE:
 * 
 * HTML: <redText text="Hi!" />
 * 
 * JS: Templator.New({
 *          name: 'redText',
 *          observe: 'body',
 *          render: (props) => { 
 *              return (html`
 *                  <p style="color: red"> ${props.text} </p>
 *          `)}
 *      })
 *
 * OUTCOME: <p style="color: red">Hi!</p>
 * 
 * --------------------------------------------------------------------
 * 
 * TO-DO:
 *
 * --------------------------------------------------------------------
 *
 * PATCH NOTES:
 *
 * v0.0.7 (14.11.2019):
 * - render() props now hold a special object called '$meta', which holds
 *   templator meta deta for the unique template render.
 *   - The unique template ID and GUID can be used to identify rendered elements.
 * - Added extra comments for documentation's sake.
 *
 * v0.0.6 (11.11.2019):
 * - Added a shorthand function for Templator.New() called T().
 * - Removed unnecessary console logs.
 *
 * v0.0.5 (13.10.2019):
 * - Fixed a collision bug with the class template attributes.
 * - The class shortand now appends the given classes to the already existing ones.
 * - Template attributes will no longer cause crashes if only a prefix was given.
 *
 * v0.0.4:
 * - Added new template attributes:
 *    - INHERIT_ATTRIBUTES (  <element INHERIT_ATTRIBUTES />  )
 *      - Adds all inheritable attributes of the template root to the element.
 *    - INHERIT: INHERIT_NAME + INHERIT_ATTRIBUTES
 * - Fixed the class shorthand template attribute. It now also has its own keyword.
 * 
 * v0.0.3:
 * - Added the "dot" template attribute as a shorthand for the "class" attribute.
 *
 * v0.0.2:
 * - Added new template attributes:
 *   - Necessary (  <element !attr="${props.value}" />  )
 *     - The attribute tag is added to the element, even if the attribute value is empty.
 *   - Unecessary (  <element ?attr="${props.value}" />  )
 *     - The attribute tag is only added to the element if it has a non-empty value.
 *   - INHERIT_NAME (  <element INHERIT_NAME />  )
 *     - Adds the name of the template as a class to the element.
 * - Templator now sets {display: none} for all elements that are named after a template.
 *
 * v0.0.1 (12.09.2019):
 * - Added Templator template attributes.
 *
 * -------------------------------------------------------------------- */

const Templator = new class {

    // Constructor :D
    constructor() {
        this.debug = true;
        this.definedTemplates = [];
        this.idTracker = -1;

        // General configuration
        this.cfg = {
            disableTemplatorAttributes: false,
            hideElementsNamedAfterTemplates: true,
            removeTemplatorStyleTagAfterDomLoad: true,
            makeTemplatorElementCss: true
        };

        // Syntaxing configuration
        this.syntax = {
            attributes: {
                class: '.', 	                            // Bind one specific class
                classShorthand: 'c',                        // Shorthand for the "class" attribute
                style: '#',                                 // Specify a style property
                necessary: '!',                             // Bind an attribute, even if no value has been given
                unnecessary: '?',                           // Bind an attribute, but only if the given value isn't null
                inheritName: 'inherit_name',                // Inherit the root name
                inheritAttributes: 'inherit_attributes',    // Inherit root attributes
                inherit: 'inherit',                         // Inherit the template name and root attributes
                inheritableAttribute: ':'                   // Marks an attribute for inheritance
            }
        };

        // Create a style block for Templator
        let styleBlock = document.createElement('style');
        styleBlock.id = "TemplatorStyle";
        let head = document.getElementsByTagName('head')[0];
        if(head){head.appendChild(styleBlock)};

        // // Create a style block for Templator
        // styleBlock = document.createElement('style');
        // styleBlock.id = "TemplatorElementsCss";
        // styleBlock.innerHTML = `
        //     t-display {
        //         display: none;
        //     }

        //     t-display {}
        // `
        // if(head){head.appendChild(styleBlock)};
    }
    
    // Debug logging
    Log(message) {
        if(this.debug === true) console.log(message);
    }

    // Returns a single element
    QueryOne(query) {
        return document.querySelector(query);
    }

    // Returns an array of elements
    Query(query) {
        return Array.from(document.querySelectorAll(query));
    }

    // Appends a function which is later executed once the DOM is fully loaded
    OnDomLoad(func) {
        document.addEventListener("DOMContentLoaded", func);
    }

    // Define new template
    New(templateData) {
        let { name, render, observe } = templateData;

        // Make sure all required data is present
        if( !name || !render || !observe ) return null;
        
        // Make sure we have a valid target to observe
        let target = this.QueryOne(observe);
        if(!target) return null;

        // Create a new observer
        let templateObserver = new MutationObserver((mutationsList, observer) => {
            this.RenderInDom(templateData);
        });
        templateObserver.observe(target, {
            attributes: false,
            childList: true, 
            subtree: true
        })
        templateData.observer = templateObserver;

        // Set the target, which is observed for mutations.
        templateData.target = target;

        // All is good, push the template
        this.definedTemplates.push(templateData);

        // Hide all template roots with the same name
        if(this.cfg.hideElementsNamedAfterTemplates === true) {
            let templatorStyleBlock = document.querySelector('#TemplatorStyle');
            if(templatorStyleBlock) {
                templatorStyleBlock.innerHTML += ` ${templateData.name}, .${templateData.name} { display: none; }`;
            }
        }
    }
    
    // Render a template within it's observer element
    RenderInDom(template) {

        // Apply inheritable attributes to an element
        const InheritAttributes = (elem, attrs) => {
            // console.log(attrs)
            Array.from(attrs).forEach(attr => {
                elem.setAttribute(attr[0], attr[1]);
            });
        }

        let items = Array.from(template.target.querySelectorAll(template.name));
        items.forEach(item => {

            // Gather item attributes and assigned them as props
            let rootProps = {};
            for(let attrName of item.getAttributeNames()) {
                let attrValue = item.getAttribute(attrName);
                rootProps[attrName] = attrValue;
            }

            // Look for child <prop> elements and add their contents as props
            Array.from(item.querySelectorAll('prop[name]')).forEach(propElem => {
                let propElemName = propElem.getAttribute('name')

                if(propElemName) 
                    rootProps[propElemName] = propElem.innerHTML;
            })

            // Take the children elements of the root and group them as one prop.
            // In this case, the props.children is preserved;
            rootProps.children = item.innerHTML;

            // Add Templator metadata to props
            rootProps.$meta = {
                id: ++this.idTracker,
                guid: ''
            }

            // Gather all inheritable attributes/props.
            let inheritableRootProps = [];
            let prefix = this.syntax.attributes.inheritableAttribute;
            Object.keys(rootProps).forEach((key,index) => {
                if(key.startsWith(prefix))
                    inheritableRootProps.push([key.slice(prefix.length), rootProps[key]]);
            });

            // Insert the new element before the root
            let newRoot = document.createElement(null);
            newRoot.innerHTML = template.render(rootProps);

            // Parse Templator attributes?
            if(this.cfg.disableTemplatorAttributes == false) {

                // Put the new root and all of its children in an array
                let tree = Array.from(newRoot.querySelectorAll("*"));
                tree.push(newRoot);

                // Make things easier
                let pre = this.syntax.attributes;

                // Loop through the entire tree
                tree.forEach(elem => {

                    // Prepare some variables                
                    let attrName, attrValue, cleanAttrName, isTemplatorAttribute;

                    // Loop through all attributes of an element
                    Array.from(elem.attributes).forEach(attr => {
                        attrName = attr.nodeName;
                        attrValue = attr.nodeValue;
                        cleanAttrName = '';
                        isTemplatorAttribute = true;

                        // Determine the attribute type
						if(attrName === pre.classShorthand) {
                            // The class shorthand
                            // This will also keep all of the previously assigned classes
                            elem.className += ' ' + attrValue;
						}
                        else if(attrName.startsWith(pre.class) && attrName.length > 1) {
                            // Adds class
                            cleanAttrName = attrName.slice(pre.class.length);
                            elem.classList.add(cleanAttrName);
                        }
                        else if(attrName.startsWith(pre.style) && attrName.length > 1) {
                            // Adds css rule
                            cleanAttrName = attrName.slice(pre.style.length);
                            elem.style.cssText += `; ${cleanAttrName}: ${attrValue}`
                        }
                        else if(attrName.startsWith(pre.necessary) && attrName.length > 1) {
                            // Add attribute, even if there is no value given
                            cleanAttrName = attrName.slice(pre.necessary.length);
                            elem.setAttribute(cleanAttrName, attrValue);
                        }
                        else if(attrName.startsWith(pre.unnecessary) && attrName.length > 1) {
                            //  Add attribute, but only if there is a given value
                            cleanAttrName = attrName.slice(pre.unnecessary.length);
                            if (attrValue.length > 0) { elem.setAttribute(cleanAttrName, attrValue); }
                        }
                        else if(attrName == pre.inheritName) {
                            // Add template name as class
                            elem.classList.add(template.name);
                        }
						else if(attrName == pre.inheritAttributes) {
                            // Add inheritable attributes
                            InheritAttributes(elem, inheritableRootProps);
                        }
						else if(attrName == pre.inherit) {
                            // Add template name as class
                            elem.classList.add(template.name);

                            // Add inheritable attributes
                            InheritAttributes(elem, inheritableRootProps);
                        }
                        else if(isTemplatorAttribute) {
                            // Not a Templator attribute
                            isTemplatorAttribute = false;
                        }

                        // Remove the old template attribute
                        if(isTemplatorAttribute == true) {
                            elem.removeAttribute(attrName);
                        }                        
                    })
                })
            }

            // Insert the new roots before the original root
            Array.from(newRoot.childNodes).forEach(eachNewRoot => {
                item.parentElement.insertBefore(eachNewRoot, item);
            })

            // Remove the original root
            item.parentElement.removeChild(item);
        });
    }

    // Try to render all templates
    RenderInDomAll() {
        this.definedTemplates.forEach(template => {
            this.RenderInDom(template);
        })
    }
}

// html() is a template literal tag. It simply returns the given string.
// You can use it alongside 'lit-html' for html syntaxing in .js files.
const html = (strings, ...values) => {
    let str = '';
    strings.forEach((string, i) => {
       str += string + (values[i] || '');
    });
    return str;
}

let example = html`<div>${'hi'}</div>`;

// This renders all the templates once the DOM is first loaded.
Templator.OnDomLoad(() => {

    // You should call this line at the end of the body element to properly render
    // all templates before the user gets to see any loaded html.
    Templator.RenderInDomAll();

    if(Templator.cfg.removeTemplatorStyleTagAfterDomLoad === true) {
        let ts = document.getElementById('TemplatorStyle');
        ts.parentElement.removeChild(ts);
    }
})

// A shorthand for defining Templator templates
const T = (name, render, ...options) => {

    // Make sure we have the required arguments
    if(!( name && render )) return;

    // Define a new template
    Templator.New({
        name: name,
        render: render,
        observe: 'body',
        ...options
    })
}
