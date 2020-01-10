const conf = {
    // since all images arent square some get hidden
    // maybe instead of background work with putting an image?
    // figure out file type based on extension?
    art: ['dalia.jpg', 'heart.jpeg', 'illuminat.jpeg', 'lomLogo.jpg', 'mirage.jpg', 'scrub.jpeg', 'x1.jpg', 'x4.jpg', 'x9.jpg', 'x16.jpg'],
    nature: ['Mission.info', 'EvolutionUrbanGrows.info', 'RestoreNativePlants.info'],
    code: ['EvolutionUrbanGrows.info','MovieQuoteQuiz.info', 'PropellerCommunication.info', 'PlantEnvMonitor.info', 'Github.info' ],
    menu: ['Words of Wisdom', 'Tag - Game', 'Adventures', 'Toolbelt', 'Contact', 'Do Our Part', 'Restart?']
}

// need image preloader

let menuOpen = false;

// used for location on creation of elements
// use array of folder/files names
// if they are open --- true
    // 
// if they are closed --- false

let filesOpen = 0;
let foldersOpen = 0;
let numFolders = 3;

// if open and try to open again bring to front
let windowsThatAreOpen = [];


// give this more power
function screencontrol(){
    if (filesOpen + foldersOpen >= 12){
        alert("Try closing some windows");
        return false;
    } else {
        return true;
    }
}

function openMenu() {
    if (!menuOpen){
    let newMenu = document.createElement("div");
    newMenu.classList.add('openMenu');  
    
    let firstScroll;
    
    for (let content of conf.menu) {
        let menuRow = document.createElement('div');
        menuRow.classList.add('menuRow');
        menuRow.addEventListener('touchstart', function (e){
            firstScroll = firstScroll ? firstScroll : e.touches[0].clientY;            
            // if (e.y > firstScroll){
            //     console.log(ey);
            // }

        })
        menuRow.addEventListener('touchmove', function (e){

            e.preventDefault();
        })
        menuRow.addEventListener('touchend', function (e){
            let scrollCloseMenu = 180;
            let scrollDelta = e.changedTouches[0].clientY
           
            if (scrollDelta > firstScroll){
                setTimeout(() => {
                    if (scrollDelta > firstScroll + scrollCloseMenu){
                        document.getElementsByClassName('openMenu')[0].remove();
                        menuOpen = false;
                    }
                }, 200)
            }          
            // set timeout if scrollLimit is reached within 200ms 

        })

        if (content === "Words of Wisdom"){
            menuRow.classList.add('wisdom');
        }

        if (content === "Contact"){
            menuRow.classList.add('contact');
        }

        if (content === "Adventures"){
            menuRow.classList.add('adventure');
        }

        if (content === "Do Our Part"){
            menuRow.classList.add('earth');
        }

        if (content === "Restart?"){
            menuRow.style.color = "white";
            menuRow.classList.add('restart');
        }
        menuRow.addEventListener("mouseenter", function() {
            this.classList.add('on');
            this.getElementsByTagName('p')[0].classList.add('on');
        })
        menuRow.addEventListener("mouseleave", function() {
            this.classList.remove('on');
            this.getElementsByTagName('p')[0].classList.remove('on');
        })
        menuRow.addEventListener("click", function() {
            // let menuItem = this.getElementsByTagName('p')[0].classList.innerHTML;
            // openMenuItem(menuItem);
            // menu is unique each row background should be different
            // when you "mouseenter" start animation
            // when you "click" or "mouseleave" stop animation
        })

        

        let menuRowText = document.createElement('p');
        menuRowText.classList.add('menuText');
        menuRowText.appendChild(document.createTextNode(content));
        menuRow.appendChild(menuRowText);
        newMenu.appendChild(menuRow);
    }
    document.body.appendChild(newMenu);

    menuOpen = true;
    }
    else {
        document.getElementsByClassName('openMenu')[0].remove();
        menuOpen = false;
    }

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


// Creates folder content based on title
// Title correlates to array above
function folderContent(title) {
    let folderContent = title.toLowerCase();

    // contains each Row
    let wholeFolder = document.createElement('div');
    wholeFolder.classList.add('folderBody');
    
    // Generating each row
    for (let content of conf[folderContent]) {
        let row = document.createElement('div');
        row.classList.add('folderContent');

        // length > 8 is only useful for mobile
        if(conf[folderContent].indexOf(content) === (conf[folderContent].length - 1) && conf[folderContent].length > 8){
            row.style.borderBottom = 'none';
        }

        // alternating colors
        if(conf[folderContent].indexOf(content) % 2 === 0){
            row.style.backgroundColor = '#e6d9c8';
        } else {
            row.style.backgroundColor = '#fff';

        }
        
        // row text
        let rowTitle = document.createElement('p');
        let rowTitleText = document.createTextNode(content);
        rowTitle.style.justifyContent = 'center';
        rowTitle.appendChild(rowTitleText);
        row.appendChild(rowTitle);

        // gives each row action, relative to it's parent
        row.addEventListener('click', () => {getIconInfo(row, folderContent);})
        wholeFolder.appendChild(row);
    }

    let folder = document.getElementsByClassName('openFolder')[foldersOpen - 1];
    folder.appendChild(wholeFolder);
}

function openWindow(type, el, parent) {
    let title = el.getElementsByTagName('p')[0].innerHTML;

    if (windowsThatAreOpen.includes(title)){
        // this is hefty on the browser, look for alternatives
        document.getElementById(title).remove()
        if (type === "folder") {
            foldersOpen--;
        }
        if (type === "file") {
            filesOpen--;
        }
        // how to differentiate between files and folders to subtract properly

        // let elTitle = el.parentElement.getElementsByTagName('p')[0].innerHTML;
    } else {
        windowsThatAreOpen.push(title);
    }
    console.log(windowsThatAreOpen);

    // need to figure out how to add openFolder to list

    // this is to prevent the same window from opening twice
    // now we have to bring to the front


    // about should probably be moved to screen control
    if (!screencontrol()){
        return;
    }
    
    // newWindow, the close button and title 
    let newWindow = document.createElement("div");
    newWindow.setAttribute("id", title);
    let closeBtn = document.createElement('div')
    closeBtn.classList.add('redClose');
    let windowTitle = document.createElement('p')
    windowTitle.classList.add('windowTitle')
    // add actionlistener for windowTitle to bring element to front
    windowTitle.appendChild(document.createTextNode(title));

    newWindow.appendChild(windowTitle);
    // allow moving of windows
    newWindow.setAttribute('onmousedown', 'mydragg.startMoving(this,"container",event);')
    newWindow.setAttribute('onmouseup', 'mydragg.stopMoving("container");')


    if (type === 'file'){
    newWindow.classList.add('openFile');
    filesOpen++;
    //location of 'file'
    newWindow.style.top = (30 * filesOpen + 220) + 'px';
    newWindow.style.left = (10 + filesOpen * 10)/2 + 'px';
        let fileIndex = title.indexOf('.');
        let fileType = title.slice(fileIndex);
        
        // special .info file
        if(fileType === '.info') {
            let divReveal = title.slice(0, fileIndex);
            divReveal = document.getElementById(divReveal).cloneNode(true);
            
            if (divReveal.classList.contains("d-none")){
                divReveal.classList.remove("d-none");
            }
            divReveal.setAttribute("id", title);
            divReveal.classList.add("openInfo");
            divReveal.style.backgroundColor = "#fff";

            closeBtn.addEventListener('click', function() { closeWindow(this, 'info');}, false);
            divReveal.appendChild(windowTitle);
            divReveal.appendChild(closeBtn)
            document.body.appendChild(divReveal);
            return;
        }

        // for other 'files
        closeBtn.addEventListener('click', function() { closeWindow(this, 'file');}, false);

        // special art files
        if (parent === 'art') {
            newWindow.style.backgroundImage = "url('./" + parent + "/" + title + "')";
            // figure out a way to concat parents for folder depth
            // parent += '/'
        }

        // homescreen images
        if (!parent) {
            newWindow.style.backgroundImage = "url('./images/" + title + "')";
        }
    }

    if (type === 'folder') {
        // location of "folder"
        newWindow.classList.add('openFolder');
        newWindow.style.top = (25 * foldersOpen + 180) + 'px';

        foldersOpen++;
        closeBtn.addEventListener('click', function() { closeWindow(this, 'folder');}, false);
    }

    // adding closeButton with specific listener
    newWindow.appendChild(closeBtn)
    document.body.appendChild(newWindow);
}

// figure out icon type
function getIconInfo(item, parent) {
    let itemName = item.getElementsByTagName('p')[0].innerHTML;
    let extension = itemName.indexOf('.');
    if (extension >= 0){
        openWindow('file', item, parent);
    } else {
        openWindow('folder', item);
        folderContent(itemName);
    }
};

// removes Window from DOM
function closeWindow(el, type) {
    console.log(type);
    
    // removes from windowsThatAreOpen
    let elTitle = el.parentElement.getElementsByTagName('p')[0].innerHTML;
    let elTitleLocation = windowsThatAreOpen.indexOf(elTitle);
    windowsThatAreOpen.splice(elTitleLocation, 1);

    if (type === "info"){
        filesOpen--;
    }
    if (type === "file"){
        filesOpen--;
    }
    if (type === "folder"){
        foldersOpen--;
    }
    el.parentElement.remove()
}

window.onload = (e) => {
    // give icons actions
    let deskIcon = document.getElementsByClassName('deskIcon');
    for (let item of deskIcon) {
        item.addEventListener("click", () => {getIconInfo(item)});
    }

    // give menu action
    let menu = document.getElementById('menuBtn');
    let background = document.getElementById('container');
    let firstScroll;

    menu.addEventListener('click', () => {openMenu()})


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
     background.body.addEventListener('touchend', function (e){
        let scrollCloseMenu = 10
        0;
        let scrollDelta = e.changedTouches[0].clientY
       
        if (scrollDelta < firstScroll){

            setTimeout(() => {
                if (scrollDelta < firstScroll - scrollCloseMenu){                    
                    openMenu();
                }
            }, 200)
        }          
        // set timeout if scrollLimit is reached within 200ms 

    })
}

