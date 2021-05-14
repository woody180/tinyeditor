const FgTinyEditor = function (config) {

    this.config = config;

    this.lib = (el = undefined) => {
        return {
            el: document.querySelectorAll(el),
            on(event, callback, classList = undefined) {
                if (!classList) {
                    this.el.forEach(item => {
                        item.addEventListener(event, callback.bind(item))
                    });
                } else {
                    this.el.forEach(item => {
                        item.addEventListener(event, (e) => {
                            if (e.target.closest(classList)) {
                                callback.call(e.target.closest(classList), e)
                            }
                        });
                    });
                }
            }
        }
    }

    const variables = {
        selectorClass: this.config.selector.split('.')[1]
    }

    this.html = {
        editor() {
            const toolsOuter = `<div class="${variables.selectorClass}-editor-wrapper" class="uk-flex">%inner%</div>`;
            let tools = `
                <a title="Edit" uk-tooltip="Start editing" href="${variables.selectorClass}-editor-toggle" class="${variables.selectorClass}-editor-tootls ${this.selectors.toggleEditor.split('.')[1]}">${this.icons.pencil}</a>
                <a title="Save" uk-tooltip="Save changes" href="${variables.selectorClass}-save-content" class="${variables.selectorClass}-editor-tootls ${variables.selectorClass}-save-content">${this.icons.save}</a>
            `;

            if (this.tools && Array.isArray(this.tools)) {
                this.tools.forEach(tool => {
                    tools += `<a onclick="(${tool.callback})(); return false;" title="${tool.title}" uk-tooltip="${tool.title}" href="#" class="${variables.selectorClass}-editor-tootls ${tool.trigger}">
                        ${tool.icon}
                    </a>`
                });
            }

            return toolsOuter.replace('%inner%', tools);
        },

        loaderAnimation() {
            const loader =  `
                <div id="tiny-loader-animation">
                    <div>
                        <div class="sk-chase">
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                            <div class="sk-chase-dot"></div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', loader);
        }
    }

    this.selectors = {
        toggleEditor: `${this.config.selector}-editor-toggle`,
        editableElement: this.config.selector,
        elementCage: `${this.config.selector}-cage`,
        activeEditbleElement: `${this.config.selector}-cage[contenteditable=true]`,
        saveContent: `${this.config.selector}-save-content`,
        editorWrapper: `${this.config.selector}-editor-wrapper`
    }

    this.catchDOM = () => {
        this.editableElement = document.querySelectorAll(this.selectors.editableElement);
    }

    this.bindEvents = () => {
        this.lib('body').on('click', functions.toggleEditor.bind(this), this.selectors.toggleEditor);
        this.lib('body').on('click', functions.saveContent.bind(this), this.selectors.saveContent);
    }

    this.tinymceConfig = () => {
        const quickbars_selection_toolbar = this.config.tinymceConfig && "quickbars_selection_toolbar" in this.config.tinymceConfig ? this.config.tinymceConfig.quickbars_selection_toolbar : 'code | bold italic | formatselect | alignleft aligncenter alignright alignjustify | numlist bullist table | forecolor backcolor | image media quicklink' ;
        const plugins = this.config.tinymceConfig && "plugins" in this.config.tinymceConfig ? this.config.tinymceConfig.plugins : 'quickbars lists wordcount paste code print preview importcss searchreplace autolink autosave directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap emoticons';
        const extended_valid_elements = this.config.tinymceConfig && "extended_valid_elements" in this.config.tinymceConfig ? config.tinymceConfig.extended_valid_elements : "div[editable-json|class|name|id],svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]";
        
        return {
            selector: this.selectors.activeEditbleElement,
            icons_url: `${this.rootPath}/material/default/icons.min.js`,
            paste_as_text: this.config.tinymceConfig && this.config.tinymceConfig.paste_as_text ? this.config.tinymceConfig.paste_as_text : true,
            plugins,
            quickbars_selection_toolbar,
            toolbar: this.config.tinymceConfig && "toolbar" in this.config.tinymceConfig ? this.config.tinymceConfig.toolbar : false,
            menubar: this.config.tinymceConfig && "menubar" in this.config.tinymceConfig ? this.config.tinymceConfig.menubar : false,
            inline: this.config.tinymceConfig && "inline" in this.config.tinymceConfig ? this.config.tinymceConfig.inline : true,
            image_title: this.config.tinymceConfig && "image_title" in this.config.tinymceConfig ? this.config.tinymceConfig.image_title : true,
            image_advtab: this.config.tinymceConfig && "image_advtab" in this.config.tinymceConfig ? this.config.tinymceConfig.image_advtab : true,

            // extended_valid_elements: "div[editable-json|class|name|id]",
            // verify_html: false,
                
            toolbar_drawer: this.config.tinymceConfig && "toolbar_drawer" in this.config.tinymceConfig ? this.config.tinymceConfig.toolbar_drawer : 'sliding',
            spellchecker_dialog: this.config.tinymceConfig && "spellchecker_dialog" in this.config.tinymceConfig ? this.config.tinymceConfig.spellchecker_dialog : true,
            tinycomments_mode: this.config.tinymceConfig && "tinycomments_mode" in this.config.tinymceConfig ? this.config.tinymceConfig.tinycomments_mode : 'embedded',
    
            extended_valid_elements,
    
            // save_onsavecallback: this.save,
            file_picker_callback: (cb, value, meta) => {
                // Open filemanager
                filemanager((files) => {
                    let imageLink = files[0].split('files/')[1];

                    let image = {
                        link: `${this.rootPath}/filemanager/files/${imageLink}`,
                        name: files[0].split('/').reverse()[0].split('-').join(' ').split('.')[0]
                    };

                    // Decode image link and image name
                    const imgLink = decodeURI(image.link), imageName = decodeURI(image.name);
                    
                    cb(imgLink, { title: imageName, alt: imageName });
                })
            },
            init_instance_callback: function(editor) {
                editor.on('click', (e) => {})
            }
        }
        
    }

    const functions = {

        // Notifications flashed
        notify(data) {
            const message   = data.message;
            const type      = data.type;

            if (document.querySelector('.tinyeditor-notify')) return false;

            document.body.insertAdjacentHTML('beforeend', `
                <div class="tinyeditor-notify ${type}">
                    <div>${message}</div>
                </div>
            `);


            // Remove after two seconds
            setTimeout(() => {
                document.querySelectorAll('.tinyeditor-notify').forEach(item => item.remove());
            }, 2300);
        },

        toggleEditor(e) {
            e.preventDefault();

            const editableSection = e.target.closest(this.config.selector);
            const icon = editableSection.querySelector(this.selectors.toggleEditor);

            // Send trigger
            if (this.config.onClick) this.config.onClick(e.target.closest('a'))

            
            
            // If icon not found
            if (!icon) return false;

            // Toggle tinymce on/off
            if (!editableSection.className.includes('active')) {

                // Send trigger
                if (this.config.onActive) this.config.onActive(e.target.closest('a'))
                
                // Disable all editable elements
                this.editableElement.forEach(editable => {
                    editable.classList.remove('active');
                    icon.innerHTML = this.icons.pencil;
                });

                functions.tinyDisable.call(this);

                icon.innerHTML = this.icons.check;
                editableSection.classList.add('active');
                
                // Make element editable
                editableSection.querySelector(this.selectors.elementCage).setAttribute('contenteditable', true);

                // Init tinymce
                tinymce.init(this.tinymceConfig.call(this));
            } else {

                // Send trigger
                if (this.config.onDisabled) this.config.onDisabled(e.target.closest('a'));

                functions.tinyDisable.call(this);
                editableSection.classList.remove('active');
                icon.innerHTML = this.icons.pencil;
            }

        },

        tinyDisable() {

            if (tinymce.activeEditor) {
                // Disable editor
                tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                tinyMCE.remove()
            }

            document.querySelectorAll(this.selectors.toggleEditor).forEach(icon => {
                icon.innerHTML = this.icons.pencil;
                icon.classList.remove('yes');

                icon.closest(this.config.selector).querySelector(`${this.config.selector}-cage`).removeAttribute('contenteditable');
            })
        },

        // Save content
        saveContent() {
            
            const e = window.event;
            e.preventDefault();

            // Disable tinymce
            const editorToggle = e.target.closest(this.selectors.editorWrapper).querySelector(this.selectors.toggleEditor);
            functions.tinyDisable.call(this);
            editorToggle.classList.remove('active');
            editorToggle.innerHTML = this.icons.pencil;

            const el = e.target.closest(this.selectors.editableElement);
            const alias = el.getAttribute('alias');
            const content = el.querySelector(this.selectors.elementCage);
            let contentHTML;

            // Check if content is type of JSON
            if (el.getAttribute('editable-type') && el.getAttribute('editable-type', 'json')) {

                const keyValues = el.querySelectorAll('[editable-json]');
                const keys = [];
                const values = [];
      
                keyValues.forEach(elem => {
                    if (elem.getAttribute('editable-json') === 'key') {
                        keys.push(elem.innerText.trim());
                    } else {
                        values.push(elem.innerText.trim());
                    }
                })
                const keyValuesArray = keys.map((el, i) => [keys[i], values[i]])
                const contentObject = Object.fromEntries(keyValuesArray)

                contentHTML = JSON.stringify(contentObject);
            } else {
                contentHTML = content.innerHTML.trim();
            }

            

            

            if (this.config.onSave) {
                this.config.onSave({
                    alias: alias,
                    params: this.config.params ?? {},
                    content: contentHTML
                });
            } else {

                // Start loading animation
                this.html.loaderAnimation();

                // Send patch request
                fetch(this.saveUrl, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({
                        alias: alias,
                        params: this.config.params ?? {},
                        content: contentHTML
                    }),
                    responseType: 'JSON'
                })
                .then(res => res.json())
                .then(res => {
                    // Remove loading animation
                    document.getElementById('tiny-loader-animation').remove();

                    if (res.success) {

                        functions.notify({
                            message: res.success,
                            type: 'success'
                        });

                    } else {

                        functions.notify({
                            message: res.error,
                            type: 'error',
                        });
                    }

                    // On save event callback
                    if (this.config.onResponse) this.config.onResponse(res)
                })
                .catch(err => err => {
                    document.getElementById('tiny-loader-animation').remove();
                    
                    functions.notify({
                        message: err,
                        type: 'error',
                    });

                })
            }

            
         
        },

        insertEditor() {
            if (!this.editableElement) return false;
            this.editableElement.forEach(editableSection => {
                editableSection.insertAdjacentHTML('afterbegin', this.html.editor.call(this));
            });
        },
        
        // Create dependences
        async deps() {
            const path = this.rootPath;

            const depsObject = {
                css: [
                    `${path}/plugins/jqueryui/css/jquery-ui.css`,
                    `${path}/filemanager/filemanager.css`,
                    `${path}/filemanager/css/elfinder.min.css`,
                    `${path}/filemanager/css/theme.css`
                ],
                js: [
                    `${path}/tinymce.min.js`,
                    `${path}/filemanager/js/elfinder.min.js`,
                    `${path}/filemanager/js/extras/editors.default.min.js`,
                    `${path}/filemanagerModal.js`,
                ]
            }

            // If loading jquery in config
            if (this.config.loadjQuery) {
                depsObject.js.unshift(
                    `${path}/plugins/jqueryui/js/jquery-3.6.0.min.js`,
                    `${path}/plugins/jqueryui/js/jquery-ui.js`,
                )
            }

            depsObject.css.forEach(linkToCss => {
                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', linkToCss);
                document.head.appendChild(link);
            });

            depsObject.js.forEach(linkToJs => {
                const script = document.createElement('script');
                script.setAttribute('src', linkToJs);
                document.body.appendChild(script);
            });

            await depsObject;
        }

    }

    const init = (() => {
        this.rootPath   = this.config.rootPath ? this.config.rootPath : '';
        this.saveUrl    =  this.config.saveUrl ? this.config.saveUrl : undefined;
        this.tools      = this.config.tools || undefined;
        this.onsave     = this.config.onsave || undefined;
        this.loadjQuery = this.config.loadjQuery === undefined ? true : this.config.loadjQuery;

        // Append deps
        functions.deps.call(this).then(res => {

            // Catching DOM elements & bind events
            this.catchDOM();
            this.bindEvents();

            // Insert editor
            functions.insertEditor.call(this);
        }).catch(err => console.error(err));

        // Make path root global
        if (this.rootPath) {window.tinyeditorPath = this.rootPath;}

        // Icons set
        this.icons = {
            pencil: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <polygon points="51.2,353.28 0,512 158.72,460.8 		"/> </g> </g> <g> <g> <rect x="89.73" y="169.097" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -95.8575 260.3719)" width="353.277" height="153.599"/> </g> </g> <g> <g> <path d="M504.32,79.36L432.64,7.68c-10.24-10.24-25.6-10.24-35.84,0l-23.04,23.04l107.52,107.52l23.04-23.04 C514.56,104.96,514.56,89.6,504.32,79.36z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>',
            save: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M346,422H166c-8.284,0-15,6.716-15,15s6.716,15,15,15h180c8.284,0,15-6.716,15-15S354.284,422,346,422z"/> </g> </g> <g> <g> <path d="M346,302H166c-8.284,0-15,6.716-15,15s6.716,15,15,15h180c8.284,0,15-6.716,15-15S354.284,302,346,302z"/> </g> </g> <g> <g> <path d="M346,362H166c-8.284,0-15,6.716-15,15s6.716,15,15,15h180c8.284,0,15-6.716,15-15S354.284,362,346,362z"/> </g> </g> <g> <g> <rect x="121" width="210" height="130"/> </g> </g> <g> <g> <path d="M507.606,84.394l-80-80C424.793,1.581,420.978,0,417,0h-56v145c0,8.284-6.716,15-15,15H106c-8.284,0-15-6.716-15-15V0H15 C6.716,0,0,6.716,0,15v482c0,8.284,6.716,15,15,15c4.645,0,475.762,0,482,0c8.284,0,15-6.716,15-15V95 C512,91.022,510.419,87.207,507.606,84.394z M391,482H121V272h270V482z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>',
            check: '<svg viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>'
        }

        // Apply styles
        this.styles();
    })()
}





// Styles 
FgTinyEditor.prototype.styles = function () {
    const styles = `
        ${this.config.selector}-editor-wrapper {
            position: absolute !important;
            width: auto !important;
            height: 30px !important;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex  !important;
            -webkit-box-align: center !important;
            -ms-flex-align: center !important;
            align-items: center !important;
            background-color: #1e87f0 !important;
            border-radius: 3px !important;
            top: -30px !important;
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            padding: 0 !important;
            -webkit-transition: all .2s ease;
            transition: all .2s ease;
        }
        ${this.config.selector}-editor-wrapper::before {display: none;}
        ${this.config.selector}-editor-wrapper::after {display: none;}
        ${this.config.selector}-editor-wrapper a {
            position: relative;
            display: inline-block;
            padding: 0 12px;
            margin: 0;
            color: white;
            line-height: 0;
            text-decoration: none !important;
        }
        ${this.config.selector}-editor-wrapper a::after {
            content: "";
            display: block;
            position: absolute;
            right: -2px;
            top: 50%;
            -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
            height: 10px;
            width: 1px;
            background-color: rgb(255 255 255 / 0.5);
        }
        ${this.config.selector}-editor-wrapper a:last-child::after {
            display: none;
        }
        ${this.config.selector} {
            position: relative;
        }
        ${this.config.selector}:hover ${this.config.selector}-editor-wrapper {
            opacity: 1;
            visibility: visible;
        }

        /* Animation loader */
        #tiny-loader-animation {
            background-color: rgb(0 0 0 / 0.8);
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
                    justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
                    align-items: center;
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        /* editor tools */
        ${this.config.selector}-editor-tootls svg {
            width: 12px !important;
            height: 12px !important;
            fill: white !important;
        }
        ${this.config.selector}-editor-tootls path {
            fill: white !important;
        }
        ${this.config.selector}-editor-tootls circle {
            fill: white !important;
        }

        .sk-chase {
            width: 40px;
            height: 40px;
            position: relative;
            -webkit-animation: sk-chase 2.5s infinite linear both;
                    animation: sk-chase 2.5s infinite linear both;
        }
          
        .sk-chase-dot {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0; 
            -webkit-animation: sk-chase-dot 2.0s infinite ease-in-out both; 
                    animation: sk-chase-dot 2.0s infinite ease-in-out both; 
        }
          
        .sk-chase-dot:before {
            content: '';
            display: block;
            width: 25%;
            height: 25%;
            background-color: #fff;
            border-radius: 100%;
            -webkit-animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
                    animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
        }
          
        .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
        .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
        .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
        .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
        .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
        .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
        .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
        .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
        .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
        .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
        .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
        .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }
          
        @-webkit-keyframes sk-chase {
            100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } 
        }
          
        @keyframes sk-chase {
            100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } 
        }
          
        @-webkit-keyframes sk-chase-dot {
            80%, 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } 
        }
          
        @keyframes sk-chase-dot {
            80%, 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } 
        }
          
        @-webkit-keyframes sk-chase-dot-before {
            50% {
                -webkit-transform: scale(0.4);
                        transform: scale(0.4); 
        } 100%, 0% {
                -webkit-transform: scale(1.0);
                        transform: scale(1.0); 
            } 
        }
          
        @keyframes sk-chase-dot-before {
            50% {
                -webkit-transform: scale(0.4);
                        transform: scale(0.4); 
        } 100%, 0% {
                -webkit-transform: scale(1.0);
                        transform: scale(1.0); 
            } 
        }


        /* Notifycation animation */
        .tinyeditor-notify {
            position: fixed;
            opacity: 0;
            visibility: hidden;
            top: -20px;
            left: 50%;
            -webkit-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                    transform: translateX(-50%);
            background-color: white;
            border-radius: 3px;
            -webkit-box-shadow: 0 3px 11px -5px #9e9e9e;
                    box-shadow: 0 3px 11px -5px #9e9e9e;
            -webkit-animation: nitify 2s .3s ease;
                    animation: nitify 2s .3s ease;
            z-index: 999;
        }
        .tinyeditor-notify > * {
            padding: 15px 20px;
            font-family: inherit;
            font-size: 15px;
            line-height: 32px;
            color: #4e4e4e;
        }
        .tinyeditor-notify.success {
            background-color: #4CAF50;
        }
        .tinyeditor-notify.success > * {
            color: white;
        }
        .tinyeditor-notify.info {
            background-color: #4c6caf;
        }
        .tinyeditor-notify.info > * {
            color: white;
        }
        .tinyeditor-notify.error {
            background-color: #e88322;
        }
        .tinyeditor-notify.error > * {
            color: white;
        }
        @-webkit-keyframes nitify {
            from {top: -20px; opacity: 0; visibility: hidden;}
            20% {top: 10px; opacity: 1; visibility: visible;}
            80% {top: 10px; opacity: 1; visibility: visible;}
            to {top: -20px; opacity: 0; visibility: hidden;}
        }
        @keyframes nitify {
            from {top: -20px; opacity: 0; visibility: hidden;}
            20% {top: 10px; opacity: 1; visibility: visible;}
            80% {top: 10px; opacity: 1; visibility: visible;}
            to {top: -20px; opacity: 0; visibility: hidden;}
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.insertAdjacentHTML('afterbegin', styles);
    document.head.appendChild(styleEl);
}