/* ==============================================================  

    ██████╗ ███████╗███████╗████████╗███████╗    ███████╗███████╗██████╗ ███████╗
    ██╔══██╗██╔══██║██╔════╝   ██╔══╝██╔════╝    ██╔════╝██╔══██║██╔══██╗██╔════╝
    ██████╔╝███████║███████╗   ██║   █████╗      ██║     ██║  ██║██║  ██║█████╗
    ██╔═══╝ ██╔══██║╚════██║   ██║   ██╔══╝      ██║     ██║  ██║██║  ██║██╔══╝
    ██║     ██║  ██║███████║   ██║   ███████╗    ███████╗███████║██████╔╝███████╗ 
    ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝    ╚══════╝╚══════╝╚═════╝ ╚══════╝

   
    ╔════╦═══╦═══╦═╗╔═╦══╦═╗─╔╦═══╦╗
    ║╔╗╔╗║╔══╣╔═╗║║╚╝║╠╣╠╣║╚╗║║╔═╗║║
    ╚╝║║╚╣╚══╣╚═╝║╔╗╔╗║║║║╔╗╚╝║║─║║║
    ──║║─║╔══╣╔╗╔╣║║║║║║║║║╚╗║║╚═╝║║─╔╗
    ──║║─║╚══╣║║╚╣║║║║╠╣╠╣║─║║║╔═╗║╚═╝║
    ──╚╝─╚═══╩╝╚═╩╝╚╝╚╩══╩╝─╚═╩╝─╚╩═══╝


    This is the terminal main motor code, which is used to control the terminal and the terminal's output.
    All execution will be executed in this Class constructor.


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


class Terminal{
    #hash; // Hash of the terminal
    #history = []; // History of the terminal
    help = `
        <div>
            <pre>
<span class="token comment">-----------------------------</span>
    <span class="class-name token">Commands:</span>
        - window [add | remove] [:int]
            usage:
                window add 3
        
        - terminal [close | open]
            usage:
                terminal close
        
        - terminal [color | bg] [set | get | reset] [:hex | :rgb | :hsl]    (not implemented)
            usage:
                terminal color set #fff
        
        - config [set | get | reset]
            usage:
                config get

        - font [set | get | reset] [:int]
            usage:
                font set +3

        - theme [set | get | reset | list] [:string]
            usage:
                theme set dark

        - run [:int (windows: 0-3, default: 0)]
            usage:
                run 1

        - execute [:int (windows: 0-3, default: 0)]
            usage:
                execute 0

        - cls
    
        - exit
    
        - help
    
    <span class="class-name token">More info:</span>
        <a href="https://github.com/ZhengLinLei/paste-code">https://github.com/ZhengLinLei/paste-code</a>
    
    <span class="class-name token">Issues:</span>
        <a href="https://github.com/ZhengLinLei/paste-code/issues">https://github.com/ZhengLinLei/paste-code/issues</a>
    
    <span class="class-name token">Author:</span>
        <a href="https://github.com/ZhengLinLei">Zheng Lin Lei</a>
<span class="token comment">-----------------------------</span>
            </pre>
        </div>
    `;

    executer = {
        python: "https://pyscript.net/latest/pyscript.js",
        javascript: "./js/src/executer.js",
    }

    constructor(opt){
        this.#hash = opt;
    }

    commands = {
        window: ["add", "remove"],
        terminal: ["close", "open"],
        cls: 0,
        exit: 0,
        help: 0,
        config: ["set", "get", "reset"],
        font: ["set", "get", "reset"],
        theme: ["set", "get", "reset", "list"],
        run: 0,
        execute: 0
    }
    // Execution
    exec = (arg) => {
        return new Promise((resolve) => {
            let args = arg.split(" ");

            this.#history.push(arg);

            if(Object.keys(this.commands).includes(args[0])){
                if(this.commands[args[0]] == 0 || this.commands[args[0]].includes(args[1])){
                    resolve(this.execution[args[0]](args));
                }

                resolve([0, `Path "${args[1]}" not found`]);
            }

            resolve([0, `Command "${args[0]}" not found`]);
        });
    };

    // terminal
    execution = {
        "terminal": (opt) => {
            this.#hash.terminal.toggleFnc(opt[1]);

            return [1, ""];
        },
        "window": (opt) => {
            let loop = 0;
            if(opt.length > 2){
                if(parseInt(opt[2])) loop = parseInt(opt[2]);
                else return [0, `Invalid argument ${opt[2]}`];
            }else loop = 1;

            for (let i = 0; i < loop; i++) {
                (opt[1] == "add") ? this.#hash.window.add() : this.#hash.window.remove();
            }

            return [1, ""];
        },
        "exit": () => {
            this.#hash.terminal.toggleFnc('close');

            return [1, ""];
        },
        "cls": () => {
            this.#hash.terminal.output.innerHTML = "";
            this.#hash.terminal.caret.style.transform = "translateX(0px)";
            this.#hash.terminal.config.position = 0;

            return [1, ""];
        },
        "help": () => {
            return [1, this.help]
        },
        "config": (opt)=>{
            let data = {}, result = [1,
                `
                <br>
                <div>
                    <span>Reload required <a href="javascript:location.reload()">[yes]</a><a>[no]</a></span>
                </div>
                <br>
                `
            ];

            switch (opt[1]) {
                case "set":
                    data = JSON.parse(opt.slice(2).join(""));

                    Object.entries(data).forEach(([key, value]) => {
                        if(value === "undefined" || value === "null" || value === "NaN") result = [0, `Invalid value ${value}`]; // Invalid value
                        
                        if(value != "default"){
                            localStorage.setItem(key, value); // key - value
                        }else{
                            localStorage.removeItem(key);
                        }
                    })
                    break;
            
                case "get":
                    data = {
                        terminal : localStorage.getItem("terminal") || false,
                        terminalHeight: localStorage.getItem("terminalHeight") || "default",
                        terminalOptWidth: localStorage.getItem("terminalOptWidth") || "default",
                        fontSize: localStorage.getItem("fontSize") || "default",
                        theme: localStorage.getItem("theme") || "default",                        
                    }

                    result = [1, 
                        `
                        <br>
                        <div>
                            <pre><code class="language-json">${Prism.highlight(JSON.stringify(data, null, 4).trim(), Prism.languages.json, 'json')}</code></pre>
                        </div>
                        <div>
                            <span>config set ${JSON.stringify(data)}</span>
                        </div>
                        <br>
                        `
                    ]
                    break;

                case "reset":
                    localStorage.clear();
                    break;
            }
            return result;
        },
        "font": (opt) => {
            let result = [1, ""], root = document.documentElement || document.querySelector(':root');
            let newFontSize = parseInt(window.getComputedStyle(root, null).getPropertyValue('font-size').replace("px", ""));

            switch (opt[1]) {
                case "set":
                    if(opt[2].match(/[-+]/)){
                        // Get current font size
                        let currentFontSize = newFontSize;

                        // Get the value
                        let value = parseInt(opt[2]);

                        // Set the new font size
                        newFontSize = currentFontSize + value;
                    }else
                        newFontSize = parseInt(opt[2]);

                break;

                case "get":
                    result = [1, `<br><div><span>Font size: <span class="token comment">${newFontSize}px</span></span></div><br>`];
                break;

                case "reset":
                    newFontSize = 12;
                break;
            }

            if(opt[1] != "get")
                root.style.setProperty('--font-size', `${newFontSize}px`);

                // Save to local storage
                localStorage.setItem("fontSize", newFontSize);

            return result;
        },
        "theme": (opt) => {
            let result = [1, ""];
            switch (opt[1]) {
                case "set":
                    if(!this.#hash.theme.list.includes(opt[2])){
                        result = [0, `Theme "${opt[2]}" not found`];
                    }else{
                        this.#hash.theme.set(opt[2]);
                    }
                    break;
            
                case "get":
                    result = [1, `<div><span>Current theme: <span class="token comment">${(localStorage.getItem('theme') || this.#hash.theme.list[0])}</span></span></div>`];
                    break;

                case "reset":
                    this.#hash.theme.set("light");
                    break;

                case "list":
                    result = [1, `<div><span>Theme list: <span class="token comment">${this.#hash.theme.list.join(", ")}</span></span><p>See <a href="https://github.com/ZhengLinLei/paste-code/blob/main/THEME.md">https://github.com/ZhengLinLei/paste-code/blob/main/THEME.md</a> to customise themes.</div>`];
                    break;
            }

            return result;
        },
        "run": (opt) => {

            // Return list
            if (opt.length >= 2 && opt[1] == "list")
                return [1, `<div><span>Executer supported languages: <span class="token comment">${Object.keys(this.executer).join(', ')}</span></span></div><br>`];


            let result = [0, `
                <div>
                    <span>Language not found.</span>
                </div>
                <div>
                    <span>Example: <span class="token comment">!PY</span></span>
                </div>
            `];


            let lang = {
                "python" : ["python", "py"],
                "javascript" : ["javascript", "js"],
            }

            let i = opt[1] || 0;

            let el = this.#hash.window.config.windows[i];
            if(!el) return [0, `Window ${i} not found`];

            let code = el.value;

            // Get first line of code
            const _LINES = code.split('\n')
            const firstLine = _LINES[0];
            if(!firstLine.includes("!")) return result;

            // Get language
            let arr = firstLine.split('!');
            const language = arr[arr.length-1].toLowerCase();  // Fixed ISSUE #8

            // Get language code
            let langCode = Object.entries(lang).find(([key, value]) => value.includes(language))[0];

            if(!langCode) return [0, `Language "${language}" not executable. See <a href="https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md">https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md</a> for more information.`];

            let url = this.executer[langCode];

            // Check if <script src="url"></script> is already loaded
            let script = document.querySelector(`script[src="${url}"]`);

            if(!script){
                script = document.createElement('script');
                // Add defer and src
                script.setAttribute('defer', 'true');
                script.src = url;

                // Add script to body to execute
                document.body.appendChild(script);
            }

            // Generate random tmp string
            let tmp = `b${Math.random().toString(36).substring(7)}b`;
            TMP_ID = tmp;

            this.#hash.terminal.output.innerHTML += `<div id="${tmp}"></div>`;

            // Action
            switch (langCode) {
                case 'python':
                    // Change print to Out
                    code = code.replace(/print\(/g, "Out(");

                    let elpy = document.createElement('py-script');
                    elpy.style.opacity = 0;
                    elpy.innerHTML = `
                    from js import Out

                    ${code}
                    `;

                    // Append
                    this.#hash.terminal.output.appendChild(elpy);
                    break;

                case 'javascript':
                    // Change console.log to Out
                    code = code.replace(/console.log\(/g, "Out(");

                    let runned = new JSexecuter(code);
                    runned.run();
                
            }

            return [1, ""];
        },

        "execute": (opt) => {
            if (opt.length > 1 && opt[1].includes('alert')){
                if (opt[1].includes('disable')){
                    localStorage.setItem('disableAlertExec', true);
                }else{
                    localStorage.removeItem('disableAlertExec');
                }

                return [1, `
                <br>
                <div>
                    <span>Alert <span class="token title important">warning</span> updated</span>
                </div>
                <div>
                    <span class="token comment">Disable it with <span class="token operator">execute disable-alert</span>.<br> Or enable it with <span class="token operator">execute enable-alert</span></span>
                </div>
                <br>
                `];

            }else{
                if(typeof JSexecuter === 'undefined'){
                    let script = document.createElement('script');
                    // Add defer and src
                    script.setAttribute('defer', 'true');
                    script.src = this.executer.javascript;

                    // Add script to body to execute
                    document.body.appendChild(script);

                    return [0, `Execution failed due: Script loading...; Please execute again <a>${opt.join(" ")}</a>`];
                }

                let i = opt[1] || 0;

                let el = this.#hash.window.config.windows[i];

                if(!el) return [0, `Window ${i} not found`];

                // Create script
                let scriptText = `
                    function runModule(){
                        ${el.value}

                        return "Script Loaded";
                    }
                `;

                let runned = new JSexecuter(scriptText);
                runned.run();


                // Run the script

                if(!localStorage.getItem('disableAlertExec'))
                    return [1, 
                    `
                        <br>
                        <div>
                            <span>This action could be dangerous. Are you sure you want to execute it? <a href="javascript:runModule()">[yes]</a><a>[no]</a></span>
                        </div>
                        <div>
                            <span class="token comment">By the way you can disable this alert with <span class="token operator">execute disable-alert</span>.<br> Or enable it with <span class="token operator">execute enable-alert</span></span>
                        </div>
                        <br>
                    `
                    ];
                    
                return [1, `
                <span class="comment token">${runModule()}</span>
                `];
            }
        }
    }

    getHistory(){
        return this.#history;
    }
}