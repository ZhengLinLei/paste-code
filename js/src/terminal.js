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

        - theme [set | get | reset | list | import | export] [:string]
            usage:
                theme set dark

        - run [:int (windows: 0-3, default: 0)] [list]
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
        python: "https://pyscript.net/latest/pyscript.js", // https://github.com/pyscript/pyscript
        javascript: "./js/min/executer/executer.min.js", // https://github.com/ZhengLinLe/paste-code
        typescript: "https://unpkg.com/typescript@latest/lib/typescriptServices.js", // https://github.com/basarat/typescript-script
        brainfuck: "./js/min/executer/brainfuck.min.js", // https://github.com/maciejkrol/brainfuck
        php: "./js/src/executer/php.js", // https://github.com/niklasvh/php.js
        java: "https://unpkg.com/java-to-javascript@latest/build/java-to-javascript.min.js", // https://github.com/wyattades/java-to-javascript
        html: ""
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
        theme: ["set", "get", "reset", "list", "import", "export"],
        run: 0,
        execute: 0,
        a: 0,
        yes: 0,
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
                case "export":
                    // Code here
                    break;
                case "import":
                    // Push input file
                    result = [1, `<div><p>Upload theme file</p><br><input onchange="alertModal('Changing theme')" type="file" accept="*.json, application/JSON, application/json"/></div><br>`];
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
                    <span>Example: <span class="token comment">!PY</span>, <span class="token comment">!TS</span>, <span class="token comment">!JAVASCRIPT</span></span>
                </div>
                <br>
                <div>See <a href="https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md">https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md</a> for more information.</div>
            `];


            let lang = {
                "python" : ["python", "py"],
                "javascript" : ["javascript", "js"],
                "typescript" : ["typescript", "ts"],
                "brainfuck" : ["brainfuck", "bf"],
                "php" : ["php"],
                "java" : ["java"],
                "html" : ["html"],
            }

            let i = opt[1] || 0;

            let el = this.#hash.window.config.windows[i];
            if(!el) return [0, `Window ${i} not found`];

            let code = el.value;
            
            let _LINES = code.split("\n");
            // Get lang
            let language = this.#hash.window.getLang(el);

            if(language === false) return result;


            // Get language code
            let langCode = Object.entries(lang).find(([key, value]) => value.includes(language));

            if(!langCode) return [0, `Language "${language}" not executable. See <a href="https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md">https://github.com/ZhengLinLei/paste-code/blob/main/EXECUTER.md</a> for more information.`];
            else langCode = langCode[0];

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

            this.#hash.terminal.output.innerHTML += `<div id="${tmp}">Loading executer...</div>`;

            function clearLoad(){
                document.querySelector(`#${tmp}`).innerHTML = "";
            }
            function writeLoad(test){
                document.querySelector(`#${tmp}`).innerHTML += test;
            }

            // Remove first line in code
            code = _LINES.slice(1).join('\n');
            // Action
            switch (langCode) {
                case 'python':
                    // Change print to Out
                    code = code.replace(/print\(/g, "Out(");

                    function executePY(el){
                        let elpy = document.createElement('py-script');
                        elpy.style.opacity = 0;
                        elpy.innerHTML = `
                        from js import Out

                        ${code}
                        `;

                        // Append
                        el.#hash.terminal.output.appendChild(elpy);
                        clearLoad();
                    }
                    if(typeof pyscript === 'undefined')
                        script.onload = () => {
                            executePY(this);
                        }
                    else
                        executePY(this);
                
                    break;

                case 'javascript':
                    // Change console.log to Out
                    code = code.replace(/console.log\(/g, "Out(");
                    
                    clearLoad();
                    let runned = new JSexecuter(code);
                    runned.run();

                    break;

                case 'typescript':
                    // Change console.log to Out
                    code = code.replace(/console.log\(/g, "Out(");

                    function executeTS(){
                        clearLoad();

                        try{
                            // Transpile
                            let jsCode = window.ts.transpile(code);

                            let runned = new JSexecuter(jsCode);
                            runned.run();
                        } catch(e){
                            writeLoad(`<span class="token title important">Error TS</span>: ${e}`);

                            return [0, "Error executing"]
                        }
                    }
                    if(!window.ts)
                        script.onload = executeTS;
                    else
                        executeTS();
                    
                    break;

                case 'brainfuck':

                    let arr = [], bf = [];
                    function executeBF(){
                        let brainfuck = new Brainfuck(new Infinite());

                        clearLoad();
                        // console.log(output)
                        brainfuck.code.source(code);

                        brainfuck.onOutput(function (_o) {
                            arr.push(String.fromCharCode(_o));
                            bf.push(_o);
                        });

                        brainfuck.run(() => {
                            let html = `
                            <style>
                            td{
                                text-align: center;
                                padding-right: 10px;
                            }
                            </style>
                            <table>
                                <tr>
                            `;
                            // Text
                            arr.forEach(el => html += `<td>${el}</td>`);
                            html += `
                                </tr>
                                <tr>
                            `;
                            // Num
                            bf.forEach(el => html += `<td><span class="token comment">${el}</span></td>`);
                            html += `
                                </tr>
                            </table>
                            `;

                            Out(html);
                            Out(arr.join(''));
                        });
                    }

                    if(typeof Brainfuck === 'undefined')
                        script.onload = executeBF;
                    else
                        executeBF();
            
                    break;

                case 'php':
                    const urlParams = new URLSearchParams(window.location.search);
                    const entry = urlParams.entries();

                    // Join entry as ["aa" => "AAA"]
                    let get = [];
                    for (const pair of entry) {
                        get.push(`"${pair[0]}" => "${pair[1]}"`);
                    }
                    
                    // Remove <?php
                    code = code.replace('<?php', '');
                    code = code.replace('?>', '');
                    // Add $_GET variable
                    code = `<?php
                        $_GET = [${get.join(', ')}];
                    ` 
                    + code + `
                    ?>
                    `;

                    function executePHP(){
                        let php = new PHP(code);
                        let output = php.vm.OUTPUT_BUFFER;

                        clearLoad();
                        Out(output);
                    }

                    if(typeof PHP === 'undefined')
                        script.onload = executePHP;
                    else
                        executePHP();

                    break;

                case "java":
                    // Replace System.out.println to Out
                    code = code.replace(/System.out.println\(/g, "Out(");

                    function executeJAVA(){
                        clearLoad();

                        // JAVA to JS
                        try{
                            let js = window.javaToJavascript(code);
                            js += `
                            if(typeof Main === 'function'){
                                Main.main();
                            }
                            `;
                            console.log(js);
                            let runned = new JSexecuter(js);
                            runned.run();
                        }
                        catch(e){
                            writeLoad(`<span class="token title important">Error Java</span>: ${e}`);

                            return [0, "Error executing"];
                        }
                    }

                    if(typeof window.javaToJavascript === 'undefined')
                        script.onload = executeJAVA;
                    else
                        executeJAVA();

                    break;

                case "html":
                    // Temporal solution

                    // Open new window and write the html
                    document.open();
                    document.write(code);
                    document.close();

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
        },
        "a": () => {
            //https://shattereddisk.github.io/rickroll/rickroll.mp4

            function video(){
                document.body.innerHTML = `
                    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);text-align:center;">
                        <h1>Waiting...</h1>
                    </div>
                `;
                let video = document.createElement('video');
                video.style.width = "100vw";
                video.style.height = "100vh";
                video.style.position = "fixed";
                video.style.top = "0";
                video.style.left = "0";
                video.style.objectFit = "cover";
                video.src = 'https://shattereddisk.github.io/rickroll/rickroll.mp4';
                video.autoplay = true;
                video.loop = true;
                
                document.body.appendChild(video);
            }

            video();
        },
        "yes": (opt) => {
            let i = 0;
            let yes = setInterval(() => {
                this.#hash.terminal.output.innerHTML += `y - ${i}<br>`;

                // Scroll to bottom
                this.#hash.terminal.main.scrollTop = this.#hash.terminal.main.scrollHeight;

                i++;
            }, (parseInt(opt[1]) || 1));

            let clear = (e) => {
                if((e.altKey && e.key == 'c') || (e.key == 'Escape') || (e.altKey && e.key == '©')){
                    e.preventDefault();
                    clearInterval(yes);

                    this.#hash.terminal.output.innerHTML += `testing cancelled [Alt + C]<br>`;

                    // Clear eventlistener
                    document.removeEventListener('keydown', clear);
                }
            };
            // Create a eventlistener to stop the video when press alt+c and remove the eventlistener
            document.addEventListener('keydown', clear);

            return [1, ""];
        }
    }

    getHistory(){
        return this.#history;
    }
}