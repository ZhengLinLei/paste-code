// Tab Size: Default 4

/* ==============================================================  

    Paste Code - A simple code pasting tool for developers.

    ██████╗ ███████╗███████╗████████╗███████╗    ███████╗███████╗██████╗ ███████╗
    ██╔══██╗██╔══██║██╔════╝   ██╔══╝██╔════╝    ██╔════╝██╔══██║██╔══██╗██╔════╝
    ██████╔╝███████║███████╗   ██║   █████╗      ██║     ██║  ██║██║  ██║█████╗
    ██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝      ██║     ██║  ██║██║  ██║██╔══╝
    ██║     ██║  ██║███████║   ██║   ███████╗    ███████╗███████║██████╔╝███████╗ 
    ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝    ╚══════╝╚══════╝╚═════╝ ╚══════╝

    ██████╗ ███████╗███████╗███████╗███████╗██████╗ ███████╗
    ██╔══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝
    ██████╔╝█████╗  █████╗  ███████╗█████╗  ██████╔╝███████╗
    ██╔═══╝ ██╔══╝  ██╔══╝  ╚════██║██╔══╝  ██╔══██╗╚════██║
    ██║     ███████╗███████╗███████║███████╗██║  ██║███████║
    ╚═╝     ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝


    Author: Zheng Lin Lei
    Email: zheng9112003@icloud.com
    Github: https://github.com/ZhengLinLei

    Project: Paste Code
    Github: https://github.com/ZhengLinLei/paste-code


    © 2022 ZhengLinLei <zheng9112003@icloud.com>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


============================================================== */


let setTabSize = (size) => {
    document.querySelectorAll('.textarea div pre code').forEach(textarea => {
        textarea.style.tabSize = `${(size != 0 ? size : 4)}`;
        textarea.style.MozTabSize = `${(size != 0 ? size : 4)}`;
    });

    tabSize = size;

};

// One way hash generator
const hashValue = val =>
  crypto.subtle
    .digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

let tabSize = 4, tabRegex = /\t/g;
// Theme list
const ThemeArr = ['light', 'dark', 'funky', 'twilight', 'solarized', 'night', 'zll'];
let THEME_ = {
    importTheme: (el) => {
        // Get el fileContent
        var reader = new FileReader();
        const terminalOutput = document.querySelector('#terminal-main-history');
        reader.readAsText(el.files[0], "UTF-8");
        reader.onload = e => {
            // Read content
            let content = e.target.result, out = '';
            // Parse JSON
            try {
                content = JSON.parse(content);

                // Set class
                document.body.removeAttribute('class');
                document.body.classList.add(content.class);
                localStorage.setItem('theme', content.class);
                delete content.class;

                // Add every property to css
                for (let i in content) {
                    document.body.style.setProperty(i, content[i]);
                }

                // Save to local storage
                localStorage.setItem('customTheme', JSON.stringify(content));
            } catch (error) {
                out = "Error: Cannot parse JSON";
            }

            // Write output
            let _output = document.createElement('div');
            _output.classList.add('terminal-output');
            _output.innerHTML = out;
            terminalOutput.appendChild(_output);

            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }
        reader.onerror = () => {
            // Write outpur
            let _output = document.createElement('div');
            _output.classList.add('terminal-output');
            _output.innerHTML = "Error: Cannot read file content";
            terminalOutput.appendChild(_output);

            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }
    },
    exportTheme: () => {
        // --theme-bg-color: #000;
        // --theme-primary-color: #fff;
        // --theme-secondary-color: rgb(240, 240, 240);
        // --theme-color-muted: #506882;
        // --theme-text-color: #000000;
        // --theme-extra-color: #fff;
        // --theme-border-color: rgba(0, 0, 0, 0.3);
        // --theme-caret-color: #000000;
        // --theme-alert-color: rgba(0, 0, 0, 0.8);
        // --theme-cristal-color: rgba(0, 0, 0, 0.3);
        // --theme-footer-color: rgba(0, 0, 0, 0.8);
        let cssVar = {
            "--theme-bg-color": "",
            "--theme-primary-color": "",
            "--theme-secondary-color": "",
            "--theme-color-muted": "",
            "--theme-text-color": "",
            "--theme-extra-color": "",
            "--theme-border-color": "",
            "--theme-caret-color": "",
            "--theme-alert-color": "",
            "--theme-cristal-color": "",
            "--theme-footer-color": "",
        }

        // Get all css variables and convert json
        for (let i in cssVar) {
            cssVar[i] = document.body.style.getPropertyValue(i);
        }

        // Class
        cssVar.class = document.body.classList[0];

        // Write output and download file
        saveToFile('PasteCodeTheme.json', JSON.stringify(cssVar));
    },
}

let TMP_ID = 0;
// Display Output
function Out(str){
    document.querySelector('#'+TMP_ID).innerHTML += str + "<br>";
}

// Save to file
function saveToFile(filename, content){
    if ("saveAs" in window) {
        var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    } else {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

// ==============================================================
window.addEventListener('load', () => {

    // ==============================================================
    // === LZMA =========
    var lzma = new LZMA("./js/src/lzma_worker.js");

    // ==== ROOT =========
    const ROOT = {
        url: document.location,
        base64: 'undefined',
        _get: {},
        localStorage: {
            fileMemory: 'paste-code',
            autoExecuteFlag: 'paste-code-auto-execute',
            projectList: 'paste-code-list'
        }
    }

    let PROJECT_LIST = {
        //
    }

    const WINDOW_CONFIG = {
        parent: document.querySelector('.textarea'),
        max: 4,
        min: 1,
        label: 'Window',
        current: 0,
        focus: 0,   // ISSUE #13
        visible: 0,
        windows: [],
        codeWindow: [],
        windows_value: [],
        lineActive: [],
    }

    let alertModal = (content) => {
        document.querySelector('.alert-modal').classList.add('active');
        document.querySelector('.alert-modal-text').textContent = content;
        setTimeout(function() {document.querySelector('.alert-modal').classList.remove('active');}, 5000);
    }

    let inputPrompt = (content, btn, callback, verify) => {
        let el = document.querySelector('.input-modal');
        // Confirm delete window
        el.querySelector('.modal-text').textContent = content;
        el.querySelector('#confirm-modal').textContent = `[${btn}]`;
        // Open modal
        el.classList.add('show');
        let inputText = el.querySelector('.stdin input');
        inputText.focus();

        let callFnc = () => {
            if (verify(inputText.value)) {
                callback(inputText.value);
                el.querySelector('.stdin input').value = "";

                el.classList.remove('show');
                window.onkeydown = null;
            }
        }
        // Click [yes] --> Close window
        el.querySelector('#confirm-modal').onclick = callFnc;
        window.onkeydown = (e) => {
            if (e.key == 'Enter' || e.keyCode == 13 || e.code == 'Enter' || e.which == 13) {
                callFnc();
            }
        }
    }

    // ==== GET LANG ============
    const _getLang = (window) => {
        // Get first line of code
        const _LINES = window.value.split('\n')
        const firstLine = _LINES[0];
        if(firstLine.match(/[\!|\?]/)) {
            // Get language
            let arr = firstLine.split(/[\!|\?]/);
            let tmpLang = arr[arr.length-1].toLowerCase().trim(); // Fixed ISSUE #8

            // Check if language is valid
            if(!tmpLang.includes('-->')) return tmpLang;

            // Remove -->
            return tmpLang.replace('-->', '').trim();

        }
        return false;
    }
    // ==== UPDATE CODE =========
    const _update_code = (window) => {
        // Get window index
        const index = WINDOW_CONFIG.windows.indexOf(window);
        // Get code window
        const codeWindow = WINDOW_CONFIG.codeWindow[index];
        const windowParent = window.parentElement.parentElement;

        const _LINES = window.value.split('\n')
        // Get lang and set
        let language = _getLang(window);
        if(language) {
            // Set language
            codeWindow.setAttribute('class', `language-${language}`);
            windowParent.querySelector('.title-w-bar').innerText = `window: ${index} - lang: ${language}`;
        } else {
            windowParent.querySelector('.title-w-bar').innerText = `window: ${index}`;
        }

        if (tabRegex.test(window.value))
            window.value = window.value.replaceAll(tabRegex, " ".repeat(tabSize));

        codeWindow.innerHTML = window.value
                                            .replaceAll(new RegExp("&", "g"), "&amp;")
                                            .replaceAll(new RegExp("<", "g"), "&lt;"); /* Global RegExp */

        Prism.highlightElement(codeWindow);


        // Update line numbers
        document.querySelector(`.w-${index}`).style
        .setProperty('--padd',
            (_LINES.length >= 100) ?
                (_LINES.length >= 1000) ? 
                    (_LINES.length >= 10000) ?
                        "55px"
                    : "45px"
                : "35px"
            : "25px"
        );

        // Get line numbers
        const lineNumbers = window.parentElement.querySelector('.line-numbers-rows');
        lineNumbers.innerHTML = Array(_LINES.length).fill('<span></span>').join('')

        // Check if window is focused
        if(window === document.activeElement){
            // Update line numbers
            _set_lines(window);
        }
    }

    // ====  SET LINES  =========
    const _set_lines = (window, delay=-1) => {
        const index = window.value.substring(0, window.selectionStart).split("\n").length;
        const lines = window.parentElement.querySelector('.line-numbers-rows');

        // Set line active

        if((index + delay) < lines.children.length && !lines.children[index+delay].classList.contains('current')) {
            // Clear lines class
            _clear_lines(window);

            // Set current line
            lines.children[index+delay].classList.add('current');
        }
    }
    const _clear_lines = (window) => {
        const lines = window.parentElement.querySelector('.line-numbers-rows');

        // Clear lines class
        Array.from(lines.children).forEach(line => {
            line.classList.remove('current');
        });
    }

    // ==== ADD WINDOWS =========
    function visibilityFullSpan() {
        WINDOW_CONFIG.parent.classList.remove('odd-3');
        WINDOW_CONFIG.parent.classList.remove('odd-4');
        if(WINDOW_CONFIG.visible == 3) {
            // Windows 4
            if(WINDOW_CONFIG.current == 3) {
                WINDOW_CONFIG.parent.classList.add('odd-3');
                return;
            }
            
            // Algorithm:
            // If w-2 is open and w-4
            // The focus span 2 is for w-2
            let hide = [
                WINDOW_CONFIG.windows[2].parentElement.parentElement.style.display == 'none',
                WINDOW_CONFIG.windows[3].parentElement.parentElement.style.display == 'none'
            ];

            // Check
            if(!hide[0] && hide[1]) {
                WINDOW_CONFIG.parent.classList.add('odd-3');
            }

            WINDOW_CONFIG.parent.classList.add('odd-4');
        }
    }

    const addWindow = () => {
        if (WINDOW_CONFIG.current < WINDOW_CONFIG.max) {
            // Add window
            WINDOW_CONFIG.current++;
            let indexW = WINDOW_CONFIG.current-1;

            // Add window to array
            const windowParent = document.createElement('div');
            windowParent.addEventListener('click', () => {
                // Set focus
                WINDOW_CONFIG.focus = indexW;
            });

            const topWBar = document.createElement('div');
            topWBar.classList.add("top-w-bar");

            //
            const titleWBar = document.createElement('div');
            titleWBar.classList.add("title-w-bar");
            titleWBar.innerText = `window: ${indexW}`;

            const closeWBar = document.createElement('div');
            closeWBar.classList.add("close-w-bar");
            
            //
            const closeWindow = document.createElement('a');
            closeWindow.classList.add("close-w");
            closeWindow.innerText = "[close]";
            closeWindow.addEventListener('click', () => {
                // Get focus and close window
                if (WINDOW_CONFIG.visible > 1) {
                    document.querySelector('.hidden-tab').classList.add('demo');
                    setTimeout(() => document.querySelector('.hidden-tab').classList.remove('demo'), 1000);
                    windowParent.style.display = 'none';
                    WINDOW_CONFIG.visible--;

                        // Odd
                        visibilityFullSpan();

                        let a = document.createElement('a');
                        a.onclick = (e) => {
                            windowParent.style.display = 'block';
                            a.remove();

                        WINDOW_CONFIG.focus = indexW;
                        WINDOW_CONFIG.visible++;

                        visibilityFullSpan(true);
                    }
                    let lang;
                    try {
                        lang = windowParent.querySelector('pre').classList[0].replace('language-', '');
                    } catch(e) {
                        lang = '';
                    }
                    a.innerHTML = `[${(lang.length > 0 && lang != 'none') ? `${lang.toUpperCase()}-${indexW}` : indexW}]`
                    document.querySelector('.hidden-tab').appendChild(a);
                }
            });


            // Textarea group
            const codeGroup = document.createElement('div');
            codeGroup.classList.add("code-group");
            //
            const codeWindow = document.createElement('pre');
            codeWindow.setAttribute('aria-hidden', 'true');
            //
            const code = document.createElement('code');
            //
            // Line Numbers
            const lineNumbers = document.createElement('span');
            lineNumbers.setAttribute('aria-hidden', 'true');
            lineNumbers.setAttribute('class', 'line-numbers-rows no-select');
            lineNumbers.innerHTML = '<span></span>';

            // Window label
            const newWindow = document.createElement('textarea');
            newWindow.setAttribute('class', 'textarea-main');
            newWindow.setAttribute('spellcheck', 'false');
            newWindow.setAttribute('outline', 'none');
            newWindow.setAttribute('autofill', 'false');
            newWindow.setAttribute('autocorrect', 'off');
            newWindow.setAttribute('autocapitalize', 'off');
            newWindow.setAttribute('autocomplete', 'off');
            newWindow.setAttribute('wrap', 'off');
            newWindow.setAttribute('aria-label', 'Paste Code');
            newWindow.setAttribute('tabindex', '0');
            newWindow.addEventListener('input', () => _update_code(newWindow));
            newWindow.addEventListener('mouseup', () =>  _set_lines(newWindow)); // ISSUE LINES NUMBER; UPDATE #9

            // Only for mobile devices
            if((('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))){
                newWindow.addEventListener('touchend', () =>  _set_lines(newWindow));   // Update lines number
            }

            newWindow.addEventListener('scroll', () => {
                // Get and set x and y
                codeWindow.scrollTo(newWindow.scrollLeft, newWindow.scrollTop);
                lineNumbers.scrollTo(newWindow.scrollLeft, newWindow.scrollTop);
                // codeWindow.scrollTop = newWindow.scrollTop;
                // codeWindow.scrollLeft = newWindow.scrollLeft;
            });
            newWindow.addEventListener('keydown', (e) => {
                let autoFillFn = (content, offset) => {
                    const start = newWindow.selectionStart;
                    newWindow.value = newWindow.value.substring(0, start) + content + newWindow.value.substring(newWindow.selectionEnd);
                    // fix caret position
                    newWindow.selectionStart = newWindow.selectionEnd = start + offset;

                    // Update code
                    _update_code(newWindow)
                }
                // Write tab on tab press
                if(e.key == 'Tab' || e.keyCode == 9 || e.which == 9) {
                    e.preventDefault();

                    // Check if text is selected
                    if(newWindow.selectionStart != newWindow.selectionEnd) {
                        // Get start and end
                        const start = newWindow.selectionStart;
                        const end = newWindow.selectionEnd;

                        // Get text
                        const text = newWindow.value.substring(start, end);

                        // Add tab
                        if (start == 0) {
                            newWindow.value = ' '.repeat(tabSize) + text.replaceAll('\n', '\n' + ' '.repeat(tabSize)) + newWindow.value.substring(end);
                        } else {
                            newWindow.value = newWindow.value.substring(0, start) + ' '.repeat(tabSize) + text.replaceAll('\n', '\n' + ' '.repeat(tabSize)) + newWindow.value.substring(end);
                        }

                        // Update code
                        _update_code(newWindow);

                        // Select text
                        newWindow.setSelectionRange(start, end + (tabSize * (text.split('\n').length - 1)));
                    } else {
                        autoFillFn(" ".repeat(tabSize), tabSize);
                    }
                }
                // Autofill characters
                let autoFillDict = {
                    '(' : ')',
                    '[' : ']',
                    '{' : '}',
                    '"' : '"',
                    "'" : "'",
                    '`' : '`',
                }
                if (e.key in autoFillDict) {
                    autoFillFn(autoFillDict[e.key], 0);
                }
                
                let lang = (codeWindow.classList[0] ?? '').replace('language-', '').toUpperCase();

                if ( e.key == '<' && (lang == 'HTML' || lang == 'XML')) {
                    autoFillFn('>', 0);
                }


                // Update lines number if the user jump lines
                if(e.key == 'ArrowUp' || e.keyCode == 38 || e.which == 38){
                    // Overload line numbers fnc
                    _set_lines(newWindow, delay=-2);
                }
                
                if(e.key == 'ArrowDown' || e.keyCode == 40 || e.which == 40){
                    // Overload line numbers fnc
                    _set_lines(newWindow, delay=0);
                }

                // Backspace delete 
                if(e.key == 'Backspace' || e.keyCode == 8 || e.which == 8) {
                    // if the text before have ${tabSize} spaces, delete all
                    const start = newWindow.selectionStart;

                    // Get text before
                    const text = newWindow.value.substring(start - tabSize, start);

                    // Check if text is tabSize spaces
                    if(text == ' '.repeat(tabSize)) {
                        // Delete all
                        newWindow.value = newWindow.value.substring(0, (start - tabSize)+1) + newWindow.value.substring(start);

                        // Update code
                        _update_code(newWindow);

                        // Fix caret position
                        newWindow.selectionStart = newWindow.selectionEnd = (start - tabSize)+1;
                    }
                }

                

                // ======= SHORTCUTS =======
                // Select line
                if (e.altKey && e.key == 'l' || e.altKey && e.keyCode == 76 || e.altKey && e.which == 76){
                    e.preventDefault();

                    // Select line
                    const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                    let end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;
                    end += end == newWindow.value.length-1 ? 1 : 0;

                    newWindow.setSelectionRange(start, end);
                }

                // Save context
                if (e.ctrlKey && e.key === 's') {
                    // Prevent the Save dialog to open
                    e.preventDefault();
                    _generate_url('url', true, e => {
                        try {
                            // Save to localStorage
                            localStorage.setItem(ROOT.localStorage.fileMemory, e);
                            alertModal('Content saved successfully');
                        }
                        catch (e) {
                            alertModal('Error saving');
                        }
                    });
                }
                // // Move line up and the line above down
                // if (e.altKey && e.key == 'ArrowUp' || e.altKey && e.keyCode == 38 || e.altKey && e.which == 38){
                //     e.preventDefault();

                //     // Get above and current line
                //     const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                //     const end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;

                //     // Get above line
                //     const aboveStart = newWindow.value.substring(0, start - 1).lastIndexOf("\n") + 1;
                //     const aboveEnd = newWindow.value.substring(start).indexOf("\n") + start;

                //     // Get lines
                //     const aboveLine = newWindow.value.substring(aboveStart, aboveEnd);
                //     const line = newWindow.value.substring(start, end);

                //     // replace line
                //     newWindow.value = newWindow.value.substring(0, aboveStart) + line + newWindow.value.substring(aboveEnd);

                //     // Update code
                //     _update_code(newWindow);

                //     // Select
                //     // newWindow.setSelectionRange(start - 1, end - 1);
                // }
                // // Move line down
                // if (e.altKey && e.key == 'ArrowDown' || e.altKey && e.keyCode == 40 || e.altKey && e.which == 40){
                //     e.preventDefault();
                    
                //     // Get line
                //     const start = newWindow.value.substring(0, newWindow.selectionStart).lastIndexOf("\n") + 1;
                //     const end = newWindow.value.substring(newWindow.selectionEnd).indexOf("\n") + newWindow.selectionEnd;
                //     const line = newWindow.value.substring(start, end);

                //     // Remove line
                //     newWindow.value = newWindow.value.substring(0, start) + newWindow.value.substring(end);

                //     // Add line
                //     newWindow.value = newWindow.value.substring(0, end) + line + newWindow.value.substring(end);

                //     // Update code
                //     _update_code(newWindow);

                //     // Select line
                //     newWindow.setSelectionRange(end, end + line.length);
                // }
            });
            newWindow.addEventListener('keyup', (e) => {
                // Update lines number if the user jump lines
                if
                    ((e.key == 'Enter' || e.keyCode == 13 || e.which == 13)
                    || (e.key == 'ArrowUp' || e.keyCode == 38 || e.which == 38)
                    || (e.key == 'ArrowDown' || e.keyCode == 40 || e.which == 40)
                    || (e.key == 'ArrowLeft' || e.keyCode == 37 || e.which == 37)
                    || (e.key == 'ArrowRight' || e.keyCode == 39 || e.which == 39))
                {
                    // Overload line numbers fnc
                    _set_lines(newWindow);
                }
            });   // Update line numbers

            // Onfocusout
            newWindow.addEventListener('focusout', () => {
                // Clear lines class
                _clear_lines(newWindow);
            });


            // Insert 
            closeWBar.appendChild(closeWindow);
            topWBar.appendChild(titleWBar);
            topWBar.appendChild(closeWBar);
            codeWindow.appendChild(code);
            //
            codeGroup.appendChild(lineNumbers);
            codeGroup.appendChild(newWindow);
            codeGroup.appendChild(codeWindow);
            //
            windowParent.appendChild(topWBar);
            windowParent.appendChild(codeGroup);
            WINDOW_CONFIG.parent.appendChild(windowParent);
            WINDOW_CONFIG.windows.push(newWindow);
            WINDOW_CONFIG.visible++;
            WINDOW_CONFIG.parent.classList.remove('odd-3');
            WINDOW_CONFIG.parent.classList.remove('odd-4');

            // switch (WINDOW_CONFIG.current) {
            //     case 1:
            //         break;
            //     case 2:
            //         break;
            //     case 3:
            //         visibilityFullSpan();
            //         break;
            //     case 4:
            //         break;
            // }
            visibilityFullSpan();

            if (WINDOW_CONFIG.current == 2 || WINDOW_CONFIG.current == 4) {
                let l1 = document.createElement('div');
                l1.classList.add('LR');
                l1.classList.add('LR-1');
                windowParent.appendChild(l1);

                // ['mousedown','touchstart'].forEach( evt => {
                //     l1.addEventListener(evt, (e) => _fncStartResize(e, "x", other = true, windowParent)); ----------------------> Discuss in the future
                // });
            }
            if (WINDOW_CONFIG.current == 2 || WINDOW_CONFIG.current == 3 || WINDOW_CONFIG.current == 4) {
                let t = document.createElement('div');
                t.classList.add('TB');
                t.classList.add('TB-' + (WINDOW_CONFIG.current - 2));
                windowParent.appendChild(t);

                // ['mousedown','touchstart'].forEach( evt => {
                //     t.addEventListener(evt, (e) => _fncStartResize(e, "y", other = true, windowParent)); ----------------------> Discuss in the future
                // });
            }

            // Code insert
            WINDOW_CONFIG.codeWindow.push(code);

            // Update attribute for window
            windowParent.classList.add(`w-${WINDOW_CONFIG.current-1}`);         // ------> To update Line Numbers Padding

            return true;
        }

        if (WINDOW_CONFIG.visible > 0) {
            document.querySelector('.hidden-tab').classList.add('demo');
            setTimeout(() => document.querySelector('.hidden-tab').classList.remove('demo'), 1000);
        }
    }
    // ===== REMOVE WINDOWS =====
    const removeWindow = () => {
        if (WINDOW_CONFIG.current > WINDOW_CONFIG.min && WINDOW_CONFIG.visible > WINDOW_CONFIG.min) {
            // Remove last visible window
            do {
                if (WINDOW_CONFIG.windows[WINDOW_CONFIG.focus].parentElement.parentElement.style.display != 'none')
                    break;

                
                if (WINDOW_CONFIG.focus == 0) 
                    WINDOW_CONFIG.focus = WINDOW_CONFIG.current - 1; // 0 to 3
                else
                    WINDOW_CONFIG.focus--;
            } while (true);

            const removeOnce = () => {
                // ---- Remove window
                WINDOW_CONFIG.parent.removeChild(WINDOW_CONFIG.windows[WINDOW_CONFIG.focus].parentElement.parentElement);
                // Remove from array resetting index
                WINDOW_CONFIG.windows = WINDOW_CONFIG.windows.filter((win, index) => index != WINDOW_CONFIG.focus);
                // Remove code window ISSUE #7 and #13 resetting index
                WINDOW_CONFIG.codeWindow = WINDOW_CONFIG.codeWindow.filter((win, index) => index != WINDOW_CONFIG.focus);  // Remove code window ISSUE #7 and #13

                WINDOW_CONFIG.current--;
                WINDOW_CONFIG.visible--;

                visibilityFullSpan();

                // Update class
                //console.log(WINDOW_CONFIG.windows, WINDOW_CONFIG.codeWindow);   // ISSUE #13
                console.log(WINDOW_CONFIG.windows);
                WINDOW_CONFIG.windows.forEach((win, index) => {
                    // Remove all classlist
                    win.parentElement.parentElement.classList.remove(...win.parentElement.parentElement.classList);
                    win.parentElement.parentElement.classList.add(`w-${index}`);
                });
                document.querySelector('.hidden-tab').classList.add('demo');
                setTimeout(() => document.querySelector('.hidden-tab').classList.remove('demo'), 1000);
            }

            // Confirm delete window
            let elP = document.querySelector('.container-modal');
            elP.querySelector('.modal-text').textContent = 'Are you sure you want to remove the window [' + WINDOW_CONFIG.focus + ']?';
            // Cloning pre
            elP.querySelector('.code').innerHTML = "";
            elP.querySelector('.code').appendChild(WINDOW_CONFIG.codeWindow[WINDOW_CONFIG.focus].parentElement.cloneNode(true));
            // Open modal
            elP.classList.add('show');

            // Click [yes] --> Close window
            elP.querySelector('#confirm-modal').onclick = removeOnce;
            window.onkeydown = (e) => {
                if (e.key == 'Enter' || e.keyCode == 13 || e.code == 'Enter' || e.which == 13) {
                    removeOnce();
                    elP.classList.remove('show');
                    window.onkeydown = null;
                }
            }
        }
    }

    // === Close text offer =====
    const closeOffer = () =>  document.querySelector("body > footer").classList.remove("text-offer");

    // ==== RESIZE ====
    // Get (x,y) position of event
    const _getXY = (e) => {
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
            var touch = evt.touches[0] || evt.changedTouches[0];
                
            x = touch.pageX;
            y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            x = e.clientX;
            y = e.clientY;
        }
        return {x, y};
    }
    // Start resize
    const _fncStartResize = (e, type, other = false, parent = null) => {
        let _Y = (type === "y");
        // If the event is touchstart
        let coords = _getXY(e);
        let _PARENT, _MAX, _MIN;
        if (!other) {
            _PARENT = (_Y) ? document.querySelector('#terminal') : document.querySelector('#terminal-fast-option');
            // Resize terminal height
            _MAX = _Y ? window.innerHeight * 0.8 : window.innerWidth * 0.5;
            _MIN = _Y ? window.innerHeight * 0.2 : window.innerWidth * 0.1;
        } else {
            _PARENT = parent;
            _MAX = _Y ? window.innerHeight * 0.9 : window.innerWidth * 0.5;
            _MIN = _Y ? window.innerHeight * 0.1 : window.innerWidth * 0.1;
        }

        let _SIZE = _PARENT.getBoundingClientRect()[_Y ? "height" : "width"];
        let _START = coords[type];
            
        const fncTouch = (e2) => {
            // Remove if the event is passive
            if(!['touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(e.type)){
                e2.preventDefault();
            }
                
            // If the event is touchstart
            let coordsM = _getXY(e2);

            document.body.classList.add(_Y ? 'row-resize' : 'col-resize');
            document.body.classList.add('no-select');

            let _NEW_SIZE = _SIZE - (coordsM[type] - _START); // - (e.clientY - _START); ---> Because the height grows from bottom to top
            
            if(_NEW_SIZE > _MIN && _NEW_SIZE < _MAX)
                (_Y) 
                ?
                    (document.documentElement || document.querySelector(':root')).style.setProperty('--termSize', `${_NEW_SIZE}px`) 
                :
                    (!other)
                    ?
                        (document.documentElement || document.querySelector(':root')).style.setProperty('--termOption', `${_NEW_SIZE}px`)
                    :
                        parent.style.width = `${_NEW_SIZE}px`;
        }
        window.onmousemove = fncTouch;
        window.ontouchmove = fncTouch;

        window.onmouseup = () => _fncEndResize(type, other);
        window.ontouchend = () => _fncEndResize(type, other);
    };
    // End resize
    const _fncEndResize = (type, other = false) => {
        let _Y = (type === "y");

        document.body.classList.remove(_Y ? 'row-resize' : 'col-resize');
        document.body.classList.remove('no-select');

        window.onmousemove = null;
        window.ontouchmove = null;
        window.onmouseup = null;
        window.ontouchend = null;

        // Save terminal height and option width

        if (!other)
            localStorage.setItem(
                _Y ? 'terminalHeight' : 'terminalOptWidth',
                _Y ? terminal.parentElement.parentElement.getBoundingClientRect().height : document.querySelector('#terminal-fast-option').getBoundingClientRect().width
            );
    };

    // ==== MAIN =========

    const _generate_url = (type, r = false, callback) => {
        // Get all windows
        WINDOW_CONFIG.windows.forEach((window, index) => WINDOW_CONFIG.windows_value[index] = window.value);

        // Compress
        lzma.compress(JSON.stringify(WINDOW_CONFIG.windows_value), 1, (compressed, error) => {
            if (error) {
                alert("Failed to compress data: " + error);
                return;
            }
            let reader = new FileReader();
            reader.onload = function () {
                let base64 = reader.result.substr(reader.result.indexOf(",") + 1);
                // Only return
                if (r) {
                    callback(base64);
                    return;
                }

                let url = "https://" + ROOT.url.host + ROOT.url.pathname + "#" + base64;
                // If auto execution flag is enabled add it to url
                if (localStorage.getItem(ROOT.localStorage.autoExecuteFlag) == 'true') {
                    url += "?execute=true";
                }
                var result = (type === 'markdown') ? "[paste](" + url + ")" : url;

                // Copy to clipboard
                navigator.clipboard.writeText(result);
                document.querySelector('.nav-text-offer input').value = result;
                document.querySelector("body > footer").classList.add("text-offer");
            };
            reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
        });
    }

    const _get_url = async (base64, callback) => {
        let r = await fetch("data:application/octet-stream;base64," + base64);
        let blob = await r.blob();
        let reader = new FileReader();
        reader.onload = function () {
            var compressed_data = Array.from(new Uint8Array(reader.result));
            lzma.decompress(compressed_data, function (plaintext, error) {
                if (error) {
                    alert("Failed to decompress data: " + error);
                }
                // Write each window
                try {
                    const arrayData = JSON.parse(plaintext);
                    // If it is a object
                    if(typeof arrayData === 'object'){
                        arrayData.forEach((el, i) => {
                            addWindow();
                            // Write data
                            WINDOW_CONFIG.windows[i].value = el;

                            // Update code
                            _update_code(WINDOW_CONFIG.windows[i]);
                        });
                    }
                } catch (error) {
                    alert("Failed to writing data: " + error);
                }

                callback();
            });
        };
        reader.readAsArrayBuffer(blob);
    }
    // Global MAIN variables
    let _toggle_terminal;
    const __main__ = () => {
        // Open Terminal
        window.addEventListener('keydown', (e) => {
            if((e.metaKey || e.ctrlKey || e.altKey) && e.key == 't' || (e.metaKey || e.ctrlKey || e.altKey) && e.keyCode == 84 || (e.metaKey || e.ctrlKey || e.altKey) && e.which == 84) {
                e.preventDefault();
                _toggle_terminal();
            }
        });

        const _setTheme = (theme) => {

            if (!ThemeArr.includes(theme)) theme = ThemeArr[0];

            // Remove all themes
            document.body.classList.remove(...ThemeArr);
            // Set theme
            document.body.classList.add(theme);

            // Save to local storage
            localStorage.setItem('theme', theme);

            // Remove custom theme
            // localStorage.removeItem('customTheme');
        }
        // Invert color
        const invert = document.querySelector('.invert-color');
        // Toggle invert color
        invert.addEventListener('click', () => {
            if(document.body.classList.contains('dark')) {
                _setTheme('light');

                return;
            }

            _setTheme('dark');
        });

        // If the url hasn't generated any, create one
        if(WINDOW_CONFIG.current == 0) addWindow();

        // Add window
        document.querySelector('#add-w').addEventListener('click', addWindow);
        // Remove window
        document.querySelector('#remove-w').addEventListener('click', removeWindow);

        // ==== ADD PROJECT  ==========
        const addProject = () => {
            inputPrompt("Project name", "add", (pl) => {
                _generate_url('url', true, e => {
                    try {
                        // Save to localStorage
                        PROJECT_LIST[pl] = e;

                        localStorage.setItem(ROOT.localStorage.projectList, JSON.stringify(PROJECT_LIST));

                        let d = document.createElement('div');
                        let a1 = document.createElement('a');
                        a1.innerText = pl;
                        a1.classList.add('name');
                        a1.onclick = () => {
                            localStorage.setItem(ROOT.localStorage.fileMemory, e);
                            document.location = document.location;
                        }
                        let a2 = document.createElement('a');
                        a2.onclick = (e) => {
                            e.target.parentElement.remove();
                            delete PROJECT_LIST[pl];
                            localStorage.setItem(ROOT.localStorage.projectList, JSON.stringify(PROJECT_LIST));
                            alertModal(`Project "${pl}"deleted`);
                        }
                        a2.innerText = `[delete]`;
                        d.append(a1);
                        d.append(a2);
                        document.querySelector('#library .window .list').append(d);
                    }
                    catch (e) {
                        alertModal('Error saving');
                    }
                });
            }, (pl) => {
                const globalRegex = new RegExp('^[A-Za-z0-9_\-]+$');
                if (!globalRegex.test(pl)) {
                    alertModal('Project name not allowed');
                    return false;
                }
                if (pl in PROJECT_LIST) {
                    alertModal('Project already exist');
                    return false;
                }

                return true;
            });
        }
        document.querySelector('.add-new .add').addEventListener('click', addProject);

        // ==== URL GENERATOR =========
        document.querySelectorAll('.generate-url').forEach(btn => {
            btn.addEventListener('click', () => {
                const btn_type = btn.getAttribute('data-type');

                // Generate url
                _generate_url(btn_type);
            });
        });

        // === CANCEL TEXT OFFER ====
        document.querySelector('a.cancel-url').addEventListener('click', closeOffer);

        // === COPY TEXT OFFER ====
        document.querySelector('a.copy-url').addEventListener('click', ()=>{
            var input = document.querySelector('.nav-text-offer input');
            input.select();
            document.execCommand('copy');
            
            closeOffer()
        });

        // === MODAL ALERT ===
        const modalRemoveShow = (type) => { 
            document.querySelector('.'+type+'-modal').classList.remove('show'); 
            window.onkeydown = null; 
        }
        document.querySelector('.container-modal .bg-event').addEventListener('click', () => modalRemoveShow('container'));
        ['confirm-modal', 'cancel-modal'].forEach(el => document.querySelector(`.container-modal #${el}`).addEventListener('click', () => modalRemoveShow('container')));

        document.querySelector('.input-modal .bg-event').addEventListener('click', () => modalRemoveShow('input'));
        ['cancel-modal'].forEach(el => document.querySelector(`.input-modal #${el}`).addEventListener('click', () => modalRemoveShow('input')));

        // ==== TERMINAL =========
        _toggle_terminal = (type="toggle") => {
            switch (type) {
                case "open":
                    document.querySelector('#terminal').classList.add('open');
                    terminal.focus();

                    // Hidden tab
                    document.querySelector('.hidden-tab').classList.add('terminal-opened');
                    break;
                case "close":
                    document.querySelector('#terminal').classList.remove('open');

                    // Hidden tab
                    document.querySelector('.hidden-tab').classList.remove('terminal-opened');
                    break;
                case "toggle":
                    document.querySelector('#terminal').classList.toggle('open');
                    terminal.focus();

                    // Hidden tab
                    document.querySelector('.hidden-tab').classList.toggle('terminal-opened');
                    break;
            }

            // Save to local storage
            localStorage.setItem('terminal', document.querySelector('#terminal').classList.contains('open') ? true : false);
            
        }

        const _ExecPush = (custom = null) => {
            // History pos reset
            TERMINAL_CONFIG.historyPosition = 0;

            // Add input to history
            let _input = document.createElement('div');
            _input.classList.add('terminal-input');
            _input.innerHTML = document.querySelector('#terminal-main-input').innerHTML;
            terminalOutput.appendChild(_input);

            // Remove button
            _input.removeChild(_input.querySelector('button'));


            _TERMINAL.exec(custom ?? terminalInput.innerText)
            .then((res) => {
                // Clear input
                TERMINAL_CONFIG.position = 0;
                terminalInput.innerHTML = "";

                if(!res[0] || res[1].length > 0){
                    // Write outpur
                    let _output = document.createElement('div');
                    _output.classList.add('terminal-output');
                    _output.innerHTML = res[1];
                    terminalOutput.appendChild(_output);
                }

                // Scroll to bottom
                terminal.scrollTop = terminal.scrollHeight;
            });
        }

        const _option_click = (e) => {
            // Opt object
            let opt = {
                "add": ["window add 1", 1],
                "remove": ["window remove 1", 1],
                "exit": ["exit", 1],
                "clear": ["cls", 1],
                "help": ["help", 1],
                "reset": ["config reset", 1],
                "import": ["config set <span class='token comment'>JSON</span>", 0],
                "export": ["config get", 1],
            };
            
            // Set input
            terminalInput.innerHTML = opt[e][0];
            TERMINAL_CONFIG.position = terminalInput.innerText.length;

            // Execute
            if (opt[e][1])
                _ExecPush();
        }

        const terminal = document.querySelector('#terminal-main');
        const terminalInput = document.querySelector('#terminal-main-command');
        const terminalCaret = document.querySelector('#terminal-caret');
        const terminalOutput = document.querySelector('#terminal-main-history');
        const TERMINAL_CONFIG = {
            position: 0,
            historyPosition: 0,
        }

        document.querySelector('#open-t').addEventListener('click', () => _toggle_terminal("open"));
        document.querySelector('#close-t').addEventListener('click', () => _toggle_terminal("close"));

        // Terminal input
        terminal.addEventListener('focus', () => {
            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
            // Blink caret
            terminalCaret.classList.add('blink');
        });
        terminal.addEventListener('blur', () => terminalCaret.classList.remove('blink'));
        terminal.addEventListener('keydown', (e) => {
            if(!e.ctrlKey && !e.metaKey && !e.altKey){
                e.preventDefault();

                // Write inside terminalInput
                if(e.key.length == 1){
                    TERMINAL_CONFIG.position += 1;
                    terminalInput.innerText = terminalInput.innerText.slice(0, TERMINAL_CONFIG.position-1) + e.key + terminalInput.innerText.slice(TERMINAL_CONFIG.position-1);
                }
            }

            // ==== OPTIONS ====
            // Move caret
            if (e.key == "ArrowLeft") 
                TERMINAL_CONFIG.position -= (TERMINAL_CONFIG.position > 0) ? 1 : 0;

            if (e.key == "ArrowRight") 
                TERMINAL_CONFIG.position += (TERMINAL_CONFIG.position < terminalInput.innerText.length) ? 1 : 0;

            if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
                // Move caret css
                let fs = terminalCaret.getBoundingClientRect().width                                                    // - caret width           
                        - (parseFloat(getComputedStyle(terminalCaret,null).getPropertyValue('border-left-width'))*2)    // - border
                        - 0.00001;                                                                                      // - Error                       

                terminalCaret.style.transform = `translateX(-${((terminalInput.innerText.length - TERMINAL_CONFIG.position) * fs)}px)`;
            }
            // History
            if (e.key == "ArrowUp" || e.key == "ArrowDown") {
                // History get
                const history = _TERMINAL.getHistory();

                TERMINAL_CONFIG.historyPosition += (e.key == "ArrowUp") ? ((TERMINAL_CONFIG.historyPosition >= history.length) ? 0 : 1) : ((TERMINAL_CONFIG.historyPosition <= 0) ? 0 : -1);

                // History pos
                let _w = history[history.length - TERMINAL_CONFIG.historyPosition];
                terminalInput.innerText = _w ? _w : "";
                TERMINAL_CONFIG.position = terminalInput.innerText.length;
            }

            // Paste
            if (e.key == "v" && (e.ctrlKey || e.metaKey)) {
                navigator.clipboard.readText().then(text => {
                    terminalInput.innerText = terminalInput.innerText.slice(0, TERMINAL_CONFIG.position-1) + text + terminalInput.innerText.slice(TERMINAL_CONFIG.position-1);
                    TERMINAL_CONFIG.position += text.length;
                });
            }
            // Backspace
            if (e.key == "Backspace" || e.key == "Delete") {
                terminalInput.innerText = terminalInput.innerText.slice(0, TERMINAL_CONFIG.position-1) + terminalInput.innerText.slice(TERMINAL_CONFIG.position);
                TERMINAL_CONFIG.position -= (TERMINAL_CONFIG.position == 0) ? 0 : 1;
            }
            // Enter
            if (e.key == "Enter" || e.key == "Return" || e.key == "NumpadEnter") {
                _ExecPush();
            }
        });

        // Terminal options
        document.querySelectorAll('.terminal-option').forEach(option => {
            option.addEventListener('click', () => _option_click(option.getAttribute('data-option')));
        });
        
        ['mousedown','touchstart'].forEach( evt => {
            document.querySelector('#scroll-height.terminal').addEventListener(evt, (e) => _fncStartResize(e, "y"));
            document.querySelector('#scroll-width.terminal-opt').addEventListener(evt, (e) => _fncStartResize(e, "x"));
        });

        // ==== TERMINAL CLASS =========
        const _TERMINAL = new Terminal(
            {
                terminal: {
                    main: terminal,
                    input: terminalInput,
                    output: terminalOutput,
                    caret: terminalCaret,
                    toggleFnc: _toggle_terminal,
                    config: TERMINAL_CONFIG,
                },
                window: {
                    add: addWindow,
                    remove: removeWindow,
                    config: WINDOW_CONFIG,
                    getLang: _getLang,
                },
                theme: {
                    list: ThemeArr,
                    set: _setTheme,
                },
                root: ROOT,
            }
        );

        // Get GET parameters
        if ("execute" in ROOT._get && ROOT._get.execute == "true") {
            // Confirm execute
            document.querySelector('.modal-text').innerHTML = 'The auto-execute is <b>enabled</b>. This action could be dangerous.<br><br>Do you want to execute it?';
            // Cloning pre
            document.querySelector('.container-modal .code').innerHTML = "";
            document.querySelector('.container-modal .code').appendChild(WINDOW_CONFIG.codeWindow[0].parentElement.cloneNode(true));
            // Open modal
            document.querySelector('.container-modal').classList.add('show');

            let executeCode = () => {
                _toggle_terminal("open");

                // Execute "run 0"
                _ExecPush('run 0');
            }
            // Click [yes] --> Execute
            document.getElementById('confirm-modal').onclick = executeCode;
            window.onkeydown = (e) => {
                if (e.key == 'Enter' || e.keyCode == 13 || e.code == 'Enter' || e.which == 13) {
                    executeCode();
                    document.querySelector('.container-modal').classList.remove('show');
                    window.onkeydown = null;
                }
            }
        }
    };
    // ==== LOAD CONFIGURATION =========
    const _load_config = () => {
        // ==== DEFAULT THEME =========
        // Check if dark mode is enabled
        if (localStorage.getItem('theme')) {
            document.body.classList.add(localStorage.getItem('theme'));
        }

        // Add custom theme if exists
        if (localStorage.getItem('customTheme')) {
            let parse = JSON.parse(localStorage.getItem('customTheme'));
            // Add every property to css
            for (let i in parse) {
                document.body.style.setProperty(i, parse[i]);
            }
        }

        // Check terminal position
        if (localStorage.getItem('terminalHeight')){
            // Resize terminal height
            let h = parseFloat(localStorage.getItem('terminalHeight'));
            let _MAX = window.innerHeight * 0.8;
            let _MIN = window.innerHeight * 0.2;

            if(h > _MIN && h < _MAX)
                (document.documentElement || document.querySelector(':root')).style.setProperty('--termSize', `${h}px`);
        }

        if (localStorage.getItem('terminalOptWidth')){
            // Resize terminal option width
            let w = parseFloat(localStorage.getItem('terminalOptWidth'));
            let _MAX = window.innerWidth * 0.5;
            let _MIN = window.innerWidth * 0.1;

            if(w > _MIN && w < _MAX)
                (document.documentElement || document.querySelector(':root')).style.setProperty('--termOption', `${w}px`);
        }

        if (localStorage.getItem(ROOT.localStorage.projectList)) {
            PROJECT_LIST = JSON.parse(localStorage.getItem(ROOT.localStorage.projectList));

            function addProjectRow(name, content) {
                let d = document.createElement('div');
                let a1 = document.createElement('a');
                a1.innerText = name;
                a1.classList.add('name');
                a1.onclick = () => {
                    localStorage.setItem(ROOT.localStorage.fileMemory, content);
                    document.location = document.location;
                }
                let a2 = document.createElement('a');
                a2.onclick = (e) => {
                    e.target.parentElement.remove();
                    delete PROJECT_LIST[name];
                    localStorage.setItem(ROOT.localStorage.projectList, JSON.stringify(PROJECT_LIST));
                    alertModal(`Project "${name}"deleted`);
                }
                a2.innerText = `[delete]`;
                d.append(a1);
                d.append(a2);
                document.querySelector('#library .window .list').append(d);
            }

            Object.keys(PROJECT_LIST).forEach(function(key) {
                addProjectRow(key, PROJECT_LIST[key]);
            });
        }

        // Check if terminal is open
        if (localStorage.getItem('terminal') == 'true') {
            _toggle_terminal('open');
        }

        // Font size
        if (localStorage.getItem('fontSize')){
            let size = parseFloat(localStorage.getItem('fontSize'));
            if(size >= 5 && size <= 35)
                (document.documentElement || document.querySelector(':root')).style.setProperty('--font-size', `${size}px`);
        }
    }



    // ==== INIT =========
    fn = async () => {
        const compile = () => {
            // get GET Parameters
            (_get ?? '').split('&').forEach(el => {
                let x = el.split('=');
                ROOT._get[x[0]] = x[1];
            });
            // RUN MAIN
            __main__();
            // ==== LOAD CONFIGURATION =========
            _load_config();
        }
        let _get; [ROOT.base64, _get] = location.hash.substring(1).split('?');
        if (ROOT.base64.length == 0 || ROOT.base64 == "undefined" || !('fetch' in window)) {
            if (!localStorage.getItem(ROOT.localStorage.fileMemory)) {
                compile();
                return;
            }
            ROOT.base64 = localStorage.getItem(ROOT.localStorage.fileMemory);
        }
        
        // Decode base64 and run compile()
        await _get_url(ROOT.base64, compile);
        
    }; fn();
});