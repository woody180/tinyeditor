/*
// How to use
FgTinyEditor.init({
    path: 'http://localhost/tinyeditor',
    saveUrl: 'http://localhost/tinyeditor/pages/save',
    tools: [
        {
            icon: 'paint-bucket',
            title: 'Pain this',
            callback: () => {
                alert('Pain something');
            }
        }
    ]
});

*/


const FgTinyEditor = {
    init(config = {}) {

        this.path = config.path ? config.path : '';
        this.saveUrl = config.saveUrl ? config.saveUrl : undefined;
        this.tools = config.tools || undefined; 

       

        // Append deps
        this.functions.deps.call(this).then(res => {
            this.functions.wait(() => {
                this.catchDOM();
                this.bindEvents();
    
                // Insert editor
                this.functions.insertEditor.call(this);
            });
        }).catch(err => console.error(err));

        // Apply styles
        this.styles();
    },

    lib(el = undefined) {
        return {
            el: document.querySelectorAll(el),
            on(event, callback, classList = undefined) {
                if (!classList) {
                    this.el.forEach(item => {
                        item.addEventListener(event, callback.bind(item))
                    })
                } else {
                    this.el.forEach(item => {
                        item.addEventListener(event, (e) => {
                            if (e.target.closest(classList)) {
                                callback.call(e.target.closest(classList), e)
                            }
                        })
                    })
                }
            }
        }
    },

    html: {
        editor() {
            const toolsOuter = `<div class="editor-wrapper" class="uk-flex">%inner%</div>`;
            let tools = `
                <a uk-tooltip="Start editing" href="editor-toggle" class="editor-toggle"><i uk-icon="icon: pencil; ratio: .8;"></i></a>
                <a uk-tooltip="Save changes" href="save-content" class="save-content"><i uk-icon="icon: bookmark; ratio: .8;"></i></a>
            `;

            if (this.tools && Array.isArray(this.tools)) {
                this.tools.forEach(tool => {
                    tools += `<a onclick="(${tool.callback})(); return false;" uk-tooltip="${tool.title}" href="#" class="${tool.trigger}"><i uk-icon="icon: ${tool.icon}; ratio: .8;"></i></a>`
                });
            }

            return toolsOuter.replace('%inner%', tools);
        },

        loaderAnimation() {
            const loader =  `
                <div id="tiny-loader-animation" class="uk-flex uk-flex-middle uk-flex-center uk-position-fixed uk-position-top-left uk-width-1-1 uk-height-1-1 uk-position-z-index" style="background-color: black">
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
    },

    styles() {
        const styles = `
            .editor-wrapper {
                position: absolute;
                width: auto;
                background-color: #1e87f0;
                border-radius: 3px;
                top: -30px;
                z-index: 1;
                opacity: 0;
                visitility: hidden;
            }
            .editor-wrapper a {
                color: white;
                display: inline-block;
                padding: 3px 9px;
                margin: 0;
                justify-content: center;
                position: relative;
            }
            .editor-wrapper a::after {
                content: "";
                display: block;
                position: absolute;
                right: -2px;
                top: 50%;
                transform: translateY(-50%);
                height: 10px;
                width: 1px;
                background-color: rgb(255 255 255 / 0.5);
            }
            .editor-wrapper a:last-child::after {
                display: none;
            }
            .editable {
                position: relative;
            }
            .editable:hover .editor-wrapper {
                opacity: 1;
                visibility: visible;
            }

            .sk-chase {
                width: 40px;
                height: 40px;
                position: relative;
                animation: sk-chase 2.5s infinite linear both;
            }
              
            .sk-chase-dot {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0; 
                animation: sk-chase-dot 2.0s infinite ease-in-out both; 
            }
              
            .sk-chase-dot:before {
                content: '';
                display: block;
                width: 25%;
                height: 25%;
                background-color: #fff;
                border-radius: 100%;
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
              
            @keyframes sk-chase {
                100% { transform: rotate(360deg); } 
            }
              
            @keyframes sk-chase-dot {
                80%, 100% { transform: rotate(360deg); } 
            }
              
            @keyframes sk-chase-dot-before {
                50% {
                    transform: scale(0.4); 
            } 100%, 0% {
                    transform: scale(1.0); 
                } 
            }
        `;

        const styleEl = document.createElement('style');
        styleEl.insertAdjacentHTML('afterbegin', styles);
        document.head.appendChild(styleEl);
    },

    selectors: {
        toggleEditor: '.editor-toggle',
        editableElement: '.editable',
        elementCage: '.editable-cage',
        activeEditbleElement: '.editable-cage[contenteditable=true]',
        saveContent: '.save-content'
    },

    catchDOM() {
        this.editableElement = document.querySelectorAll(this.selectors.editableElement);
    },

    bindEvents() {
        this.lib('body').on('click', this.functions.toggleEditor.bind(this), this.selectors.toggleEditor);
        this.lib('body').on('click', this.functions.saveContent.bind(this), this.selectors.saveContent);
    },

    tinymceConfig() {
        return {
            selector: this.selectors.activeEditbleElement,
            paste_as_text: true,
            plugins: 'quickbars paste code print preview importcss searchreplace autolink autosave directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap emoticons',
            quickbars_selection_toolbar: 'bold italic underline | formatselect | alignleft aligncenter alignright alignjustify | forecolor backcolor | image media quicklink',
            toolbar: false,
            menubar: false,
            inline: true,
            image_title: true,
            image_advtab: true,
    
            toolbar_drawer: 'sliding',
            spellchecker_dialog: true,
            tinycomments_mode: 'embedded',
    
            extended_valid_elements: "svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]",
    
            // toolbar1: "undo redo | formatselect | forecolor backcolor casechange formatpainter removeformat | insertfile image media link | showcomments addcomment | alignleft aligncenter alignright alignjustify | numlist | code",
            toolbar: false,

            // save_onsavecallback: this.save,
            file_picker_callback: (cb, value, meta) => {
                // Open filemanager
                filemanager((files) => {
                    let imageLink = files[0].split('files/')[1];
                    
                    let image = {
                        link: `${this.path}/filemanager/files/${imageLink}`,
                        name: files[0].split('/').reverse()[0].split('-').join(' ').split('.')[0]
                    };

                    cb(image.link, { title: image.name, alt: image.name });
                })
            },
            init_instance_callback: function(editor) {
                editor.on('click', (e) => {})
            }
        }
        
    },

    functions: {
        toggleEditor(e) {
            e.preventDefault();

            const editableSection = e.target.closest('.editable');
            const icon = editableSection.querySelector('i');
            
            // If icon not found
            if (!icon) return false;

            // Toggle tinymce on/off
            if (!editableSection.className.includes('active')) {
                
                // Disable all editable elements
                this.editableElement.forEach(editable => {
                    editable.classList.remove('active');
                    editable.querySelector('i').setAttribute('uk-icon', 'icon: pencil; ratio: .8;');
                });

                this.functions.tinyDisable.call(this);

                icon.setAttribute('uk-icon', 'icon: check; ratio: .8;');
                editableSection.classList.add('active');
                
                // Make element editable
                editableSection.querySelector(this.selectors.elementCage).setAttribute('contenteditable', true);

                // Init tinymce
                tinymce.init(this.tinymceConfig.call(this));
            } else {
                this.functions.tinyDisable.call(this);
                editableSection.classList.remove('active');
                icon.setAttribute('uk-icon', 'icon: pencil; ratio: .8;');
            }

        },

        tinyDisable() {

            if (tinymce.activeEditor) {
                // Disable editor
                tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                tinyMCE.remove()
            }

            document.querySelectorAll('.editor-toggle .uk-icon').forEach(icon => {
                icon.setAttribute('uk-icon', 'icon: pencil; ratio: .8;');
                icon.classList.remove('yes');

                icon.closest('.editable').querySelector('.editable-cage').removeAttribute('contenteditable');
            })
        },

        // Save contnet
        saveContent(e) {
            e.preventDefault();

            const el = e.target.closest(this.selectors.editableElement);
            const alias = el.getAttribute('alias');
            const content = el.querySelector(this.selectors.elementCage);
            const contentHTML = content.innerHTML.trim();

            // Start loading animation
            this.html.loaderAnimation();

            UIkit.util.ajax(this.saveUrl, {
                method: 'PATCH',
                data: JSON.stringify({
                    alias: alias,
                    content: contentHTML
                }),
                responseType: 'JSON'
            }).then(res => {
                const response = JSON.parse(res.response);

                // Remove loading animation
                document.getElementById('tiny-loader-animation').remove();

                if (response.success) {
                    UIkit.notification({
                        message: `${response.success}`,
                        status: 'primary',
                        pos: 'top-center',
                        timeout: 3000
                    });
                } else {
                    UIkit.notification({
                        message: `data can't be saved`,
                        status: 'danger',
                        pos: 'top-center',
                        timeout: 3000
                    });
                }
                
            });
        },

        insertEditor() {
            if (!this.editableElement) return false;
            this.editableElement.forEach(editableSection => {
                editableSection.insertAdjacentHTML('afterbegin', this.html.editor.call(this));
            });
        },
        
        

        // Waiting for function
        wait(callback) {
            let count = 0;
            let interval = setInterval(() => {
                count ++;
                if (window.jQuery) {
                    clearInterval(interval);
                    callback('Success');
                } 

                if (count > 100) {
                    clearInterval(interval);
                    callback('Too long time waiting');
                }

            }, 100);
        },
        
        // Create dependences
        async deps() {
            const path = this.path;
            const depsObject = {
                css: [
                    `${path}/plugins/jqueryui/css/jquery-ui.css`,
                    `${path}/filemanager/filemanager.css`,
                    `${path}/filemanager/css/elfinder.min.css`,
                    `${path}/filemanager/css/theme.css`
                ],
                js: [
                    `${path}/plugins/jqueryui/js/jquery-3.5.1.min.js`,
                    `${path}/plugins/jqueryui/js/jquery-ui.js`,
                    `${path}/tinymce.min.js`,
                    `${path}/filemanager/js/elfinder.min.js`,
                    `${path}/filemanager/js/extras/editors.default.min.js`,
                    `${path}/filemanagerModal.js`
                ]
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

            return 'done';
        }

       
    }
}


