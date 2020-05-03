const conf = {

    // expand art a lot 
    art: ['dalia.jpg', 'heart.jpeg', 'illuminat.jpeg', 'lomLogo.jpg', 'mirage.jpg', 'scrub.jpeg', 'x1.jpg', 'x4.jpg', 'x9.jpg', 'x16.jpg'],
    nature: ['EvolutionUrbanGrows.info', 'RestoreNativePlants.info', 'ThePlantGroup.info'], //Future : ThePlantGroup.info, HarlemGrown.info
    code: ['EvolutionUrbanGrows.info','MovieQuoteQuiz.info', 'PropellerCommunication.info', 'PlantEnvMonitor.info' ], // Future: ChaseGame.info
    menu: ['Words of Wisdom', 'Tag - Game', 'Adventures', 'Do Our Part', 'Restart?'],
    widsom: ['test1','test2','test3','test4','test5','test6','test7','test8','test9','test0'],
}


let menuOpen = false;
let filesOpen = 0;
let foldersOpen = 0;
let numFolders = 3;
let windowsThatAreOpen = []

// function getCookie()


// Prevents Duplicate Windows from being open
// Take a window type and a window element
function screencontrol(type, title){
    if (windowsThatAreOpen.includes(title)){

        document.getElementById(title).remove()
        if (type === "folder") { foldersOpen--; }
        if (type === "file") { filesOpen--;}

    } else {
        windowsThatAreOpen.push(title);
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Creating Menu
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createMenuRowText(content){
    let menuRowText = document.createElement('p');
    menuRowText.classList.add('menu-text');
    menuRowText.appendChild(document.createTextNode(content));

    return menuRowText;
}

function createMenuRowStyle(el, id){
    let menuRowStyle = el;

    if (id === "Toolbelt"){
        // Change animation for on hover only
        // Save bandwidth and speed on mobile

        menuRowStyle.style.color = "white";
        menuRowStyle.classList.add('toolbelt');

        // FOR LOOP?????
        let belt = document.createElement('span');
        belt.classList.add("belt");
        let tool1 = document.createElement('span');
        tool1.classList.add("javascript");
        tool1.classList.add("toolbelt-tool");
        belt.appendChild(tool1);

        let tool2 = document.createElement('span');
        tool2.classList.add("html");
        tool2.classList.add("toolbelt-tool");
        belt.appendChild(tool2);

        let tool3 = document.createElement('span');
        tool3.classList.add("react");
        tool3.classList.add("toolbelt-tool");
        belt.appendChild(tool3);

        let tool4 = document.createElement('span');
        tool4.classList.add("mongo");
        tool4.classList.add("toolbelt-tool");
        belt.appendChild(tool4);

        menuRowStyle.appendChild(belt);
    }

    if (id === "Tag - Game"){
        // Static image of ball sliding across
        // Give shadow with opacity decreasing
        // 5 layers

        // On Mouse over 
        // have ball slide out of row
        // have ball change color when out of site

        // Open Tag Game
    }

    if (id === "Words of Wisdom"){
        menuRowStyle.classList.add('wisdom');
        menuRowStyle.addEventListener("click", function() {
            // Close menu
            toggleMenu();
            let container = document.createElement("div");
            let title = document.createElement("p");
            title.appendChild(document.createTextNode("Words"));
            container.appendChild(title);
            // open
            openWindow("file", "Words");

            let randomQuote = Math.floor(Math.random() * Math.floor(conf.widsom.length));

            let quoteBox = document.getElementById("Words")
            let quote = document.createElement("p");
            quote.classList.add("quote");
            console.log(conf.widsom[randomQuote])
            quote.appendChild(document.createTextNode(conf.widsom[randomQuote]));
            quoteBox.appendChild(quote);
        })
    }

    if (id === "Contact"){
        menuRowStyle.classList.add('contact');
        menuRowStyle.addEventListener("click", function() {
            toggleMenu();
            let container = document.createElement("div");
            let title = document.createElement("p");
            title.appendChild(document.createTextNode("Contact.info"));
            container.appendChild(title);
            // open
            openWindow("file", "Contact.info");
        });
    }

    if (id === "Adventures"){
        menuRowStyle.style.color = "white";
        menuRowStyle.classList.add('adventure');
        menuRowStyle.addEventListener("click", function() {
            toggleMenu();
            let container = document.createElement("div");
            let title = document.createElement("p");
            title.appendChild(document.createTextNode("Adventures.info"));
            container.appendChild(title);
            // open
            openWindow("file", "Adventures.info");
        });
    }

    if (id === "Do Our Part"){
        menuRowStyle.classList.add('earth');
    }

    if (id === "Restart?"){
        menuRowStyle.style.color = "white";
        menuRowStyle.classList.add('restart');
        menuRowStyle.addEventListener("click", function() {
            document.location.reload(true)
        })
    }
    
    return menuRowStyle;
}

function createMenuRowAction(el){
    let menuRowAction = el;
    let firstScroll;
    
    // Hover Actions
    // To animate images a little
    menuRowAction.addEventListener("mouseenter", function() {
        this.classList.add('on');
        this.getElementsByTagName('p')[0].classList.add('on');
    });
    menuRowAction.addEventListener("mouseleave", function() {
        this.classList.remove('on');
        this.getElementsByTagName('p')[0].classList.remove('on');
    });

    // Scroll Actions
    // To open and close menu with scroll
    menuRowAction.addEventListener('touchstart', function (e){
        firstScroll = firstScroll ? firstScroll : e.touches[0].clientY;            
        // if (e.y > firstScroll){
        //     console.log(ey);
        // }
    })
    menuRowAction.addEventListener('touchmove', function (e){
        // console.log(e);
        // e.preventDefault();
    })
    menuRowAction.addEventListener('touchend', function (e){
        let scrollCloseMenu = 150;
        let scrollDelta = e.changedTouches[0].clientY
       
        if (scrollDelta > firstScroll){
            setTimeout(() => {
                if (scrollDelta > firstScroll + scrollCloseMenu){
                    document.getElementsByClassName('open-menu')[0].remove();
                    menuOpen = false;
                }
            }, 500)
        }          
    })
    
    return menuRowAction;
}

function createMenuRow(content){
    let menuRow = document.createElement('div');
    menuRow.classList.add('menu-row');

    menuRow.appendChild(createMenuRowText(content));
    menuRow = createMenuRowStyle(menuRow, content);
    menuRow = createMenuRowAction(menuRow);
    return menuRow;
}

function toggleMenu() {
    if (!menuOpen){
        let menu = document.createElement("div");
        menu.classList.add('open-menu');  

        for (let content of conf.menu) {
            let menuRow = createMenuRow(content);
            menu.appendChild(menuRow);
        }
        
        document.body.appendChild(menu);
        menuOpen = true;
    }
    else {
        document.getElementsByClassName('open-menu')[0].remove();
        menuOpen = false;
    }

}


function createFolderRowTitle(content){
    // row text
    let rowTitle = document.createElement('p');
    // if (content.length > 10){
    //     let content1 = content.slice(0, 12);
    //     let content2 = content.slice(-8);
    //     content = content1 + "..." + content2;

        // Switch info opening to a data attribute
    //     rowTitle.setAttribute('data-title', content)
    // }
    let rowTitleText = document.createTextNode(content);
    rowTitle.style.alignSelf=  'center';
    rowTitle.style.fontSize = "20px";
    // rowTitle.style.fontSize = "24px";
    rowTitle.style.paddingLeft = "5px";
    rowTitle.appendChild(rowTitleText);

    return rowTitle;
}

function createFolderRow(content, folderTitle){
    let folderRow = document.createElement('div');
    folderRow.classList.add('folder-content');
    folderRow.style.backgroundColor = (conf[folderTitle].indexOf(content)  % 2 ) ? '#EDE2DE' : 'rgba($color: #000000, $alpha: 0)';
    folderRow.addEventListener('click', () => {getIconInfo(folderRow);})
    folderRow.appendChild(createFolderRowTitle(content));

    return folderRow;
}
// Creates folder content based on title
// Title correlates to array above
function folderBody(title) {
    let folderTitle = title.toLowerCase();

    // contains each Row
    let folderBody = document.createElement('div');
    folderBody.classList.add('folder-body');
    
    // Generating each row
    for (let content of conf[folderTitle]) {
        let folderRow = createFolderRow(content, folderTitle)
        if (conf[folderTitle].indexOf(content) === 0){ 
            folderRow.setAttribute('style', 'border-top: none;')
        }
        folderBody.appendChild(folderRow);
    }

    let folder = document.getElementsByClassName('open-folder')[foldersOpen - 1];
    folder.appendChild(folderBody);


}

function createWindowTitle(title) {
    let windowTitle = document.createElement('p')
    windowTitle.classList.add('window-title')
    let modTitle = title;
    if (modTitle.length > 10){
        modTitle = title.slice(0, 9);
        modTitle = modTitle + "..."
    }
    windowTitle.appendChild(document.createTextNode(modTitle));

    return windowTitle;
}

function closeButton(type){
    let closeBtn = document.createElement('div');
    closeBtn.classList.add('red-close');
    closeBtn.addEventListener('click', function() { 
        closeWindow(this, type);
    }, false);

    return closeBtn;
}

function createInfoWindow(title){
    let fileExtensionIndex = title.indexOf('.');
        // Special Case Info Files

    let divReveal = title.slice(0, fileExtensionIndex);
    divReveal = document.getElementById(divReveal).cloneNode(true);
    
    if (divReveal.classList.contains("d-none")){
        divReveal.classList.remove("d-none");
    }
    // upgrade this to be for every animate class
    divReveal.setAttribute("id", title);
    divReveal.classList.add("open-info");
    divReveal.style.backgroundColor = "#fff";

    let closeBtn = closeButton("info");
    divReveal.appendChild(closeBtn)
    console.log(divReveal);

    let windowTitle = createWindowTitle(title)
    let windowShadow = document.createElement('div');
    windowShadow.classList.add('window-shadow');
    divReveal.appendChild(windowShadow);
    divReveal.appendChild(windowTitle);
    
    document.body.appendChild(divReveal);

    setTimeout(() =>{
        let aniDiv = divReveal.getElementsByClassName('animate');
        for (let animation of aniDiv){
            animation.classList.add("on");
        }
    }, 10)
}


function openWindow(type, title) {
    screencontrol(type, title);
    
    // newWindow, the close button and title 
    let newWindow = document.createElement("div");
    newWindow.setAttribute("id", title);

    // Allow Windows to be movable ( desktop )
    newWindow.setAttribute('onmousedown', 'mydragg.startMoving(this,"container",event);');
    newWindow.setAttribute('onmouseup', 'mydragg.stopMoving("container");');

    // file vs folder sorting

    if (type === 'file'){
        filesOpen++;
        newWindow.classList.add('open-file');
        newWindow.style.backgroundImage = "url('./images/" + title + "')";
    
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Info Files
        let fileExtensionIndex = title.indexOf('.');
        let fileExtension = title.slice(fileExtensionIndex);
        if(fileExtension === '.info') {
            createInfoWindow(title);
            return;
        }
    }

    if (type === 'folder') {
        foldersOpen++;
        newWindow.classList.add('open-folder');
    }

    newWindow.appendChild(createWindowTitle(title));
    newWindow.appendChild(closeButton(type));

    let windowShadow = document.createElement('div');
    windowShadow.classList.add('window-shadow');
    newWindow.appendChild(windowShadow);
    document.body.appendChild(newWindow);
}

// figure out icon type
function getIconInfo(item) {
    let itemName = item.getElementsByTagName('p')[0].innerHTML;
    let extension = itemName.indexOf('.');
    if (extension >= 0){
        openWindow('file', itemName);
    } else {
        openWindow('folder', itemName);
        // Currently a seperate call, or else no DOM element for Body to load too
        folderBody(itemName);
    }
};

// removes Data and Window from DOM
function closeWindow(el, type) {    
    if (type === "info" || type === "file"){
        filesOpen--;
    }
    if (type === "folder"){
        foldersOpen--;
    }
    let elTitle = el.parentElement.getElementsByTagName('p')[0].innerHTML;
    let elTitleLocation = windowsThatAreOpen.indexOf(elTitle);
    windowsThatAreOpen.splice(elTitleLocation, 1);
    el.parentElement.remove()
}



// Move this up ! First thing to load
// initial functionality
window.onload = (e) => {
    // Remove preloader from here will load too slow on Mobile
        let preloader = document.getElementsByClassName('preload')
        for (let preload of preloader){
            preload.classList.add('on');
        }


    // have Getting started only show up on first enter or every month
    // console.log(document.cookie);
    
    // give icons actions
    let deskIcon = document.getElementsByClassName('desk-icon');
    for (let item of deskIcon) {
        item.addEventListener("click", () => {getIconInfo(item)});
    }

    // give menu action
    let menu = document.getElementById('menu-btn');
    menu.addEventListener('click', () => {toggleMenu()})

    let background = document.getElementById('container');
    let firstScroll;
    background.addEventListener('touchstart', function (e){
        // set timeout to reset firstScroll
        firstScroll = e.touches[0].clientY;
        
        // if (e.y > firstScroll){
        //     console.log(ey);
        // }

    })
    // document.body.addEventListener('touchmove', function (e){
    //     e.preventDefault();
    // })


    // SCROLL UP TO OPEN MENU
    // NEEDS TO BE CLEANED UP less sensitive>
    background.addEventListener('touchend', function (e){
        let scrollCloseMenu = 100;
        let scrollDelta = e.changedTouches[0].clientY
       
        if (scrollDelta < firstScroll){

            setTimeout(() => {
                if (scrollDelta < firstScroll - scrollCloseMenu){                    
                    toggleMenu();
                }
            }, 200)
        }          
        // set timeout if scrollLimit is reached within 200ms 
    })
}

// what is happening????
// investigate further
// limit so cannot go out of window  or over menu bar --- hiding overflow right now 
var mydragg = function(){
    return {
        move : function(el,xpos,ypos){
            
            el.style.left = xpos + 'px';
            el.style.top = ypos + 'px';
        },
        startMoving : function(el,container,evt){
                
            if(evt.offsetY < 0){
                
                evt = window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                divTop = el.style.top,
                divLeft = el.style.left,
                eWi = parseInt(el.style.width),
                eHe = parseInt(el.style.height),
                cWi = parseInt(document.getElementById(container).style.width),
                cHe = parseInt(document.getElementById(container).style.height);
                document.getElementById(container).style.cursor='move';
                divTop = divTop.replace('px','');
                divLeft = divLeft.replace('px','');
                var diffX = posX - divLeft,
                    diffY = posY - divTop;

                document.onmousemove = function(evt){
                    evt = evt || window.event;
                    
                    var posX = evt.clientX,
                        posY = evt.clientY;
                        aX = posX - diffX,
                        aY = posY - diffY;
                        
                        if (aX < 0) aX = 0;
                        if (aY < 0) aY = 0;
                        if (aX + eWi > cWi) aX = cWi - eWi;
                        if (aY + eHe > cHe) aY = cHe -eHe;
                    
                    mydragg.move(el,aX,aY);
                }
            }
        },
        stopMoving : function(container){
            // var a = document.createElement('script');
            document.getElementById(container).style.cursor='default';
            document.onmousemove = function(){}
        },
    }
}();