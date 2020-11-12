"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var conf = {
  // expand art a lot
  graphics: ['retro.png', 'boogie.png', '2222.png', '33333.png', 'Maniac.png', 'dalia.jpg', 'heart.jpeg', 'illuminat.jpeg', 'idc2.jpg', 'lomLogo.jpg', 'mirage.jpg', 'scrub.jpeg', 'x1.jpg', 'x4.jpg', 'x9.jpg', 'x16.jpg'],
  nature: ['EvolutionUrbanGrows.info' // 'RestoreNativePlants.info',
  // 'ThePlantGroup.info'
  ],
  // Future : ThePlantGroup.info, HarlemGrown.info
  code: [// 'EvolutionUrbanGrows.info',
  'MovieQuoteQuiz.info', // 'PropellerCommunication.info',
  'PlantEnvMonitor.info'],
  // Future: ChaseGame.info
  menu: ['Words of Wisdom', // 'Tag - Game',
  // 'Adventures',
  // 'Do Our Part',
  // 'Toolbelt',
  'Restart?'],
  widsom: ['Luxuries burn easy', 'The maker brings the loop that is tomorrow', 'I can only show, it is up to you to learn', 'Don\'t decide who\'s weight to bear, instead just wait', 'When filled with malice stop seeking more in the well, challenge the habit', 'We seek freedom in responsibility', 'People with rights tend to be more inclined to work and produce wealth than slaves', 'There is no control to be had, just focus.', 'Water flows through you, not around you']
};
var menuOpen = false;
var filesOpen = 0;
var foldersOpen = 0;
var numFolders = 3;
var windowsThatAreOpen = []; // function getCookie()
// Prevents Duplicate Windows from being open
// Take a window type and a window element

function screencontrol(type, title) {
  if (windowsThatAreOpen.includes(title)) {
    document.getElementById(title).remove();
    if (type === 'folder') foldersOpen--;
    if (type === 'file') filesOpen--;
  } else {
    windowsThatAreOpen.push(title);
  }
} // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Creating Menu
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function createMenuRowText(content) {
  var menuRowText = document.createElement('h2');
  menuRowText.classList.add('menu-text');
  menuRowText.appendChild(document.createTextNode(content));
  return menuRowText;
}

function addQuote() {}

function createMenuRowStyle(el, id) {
  var menuRowStyle = el;

  if (id === 'Toolbelt') {
    // Change animation for on hover only
    // Save bandwidth and speed on mobile
    menuRowStyle.style.color = 'white';
    menuRowStyle.classList.add('toolbelt'); // FOR LOOP?????

    var belt = document.createElement('span');
    belt.classList.add('belt');
    var tool1 = document.createElement('span');
    tool1.classList.add('javascript-icon');
    tool1.classList.add('toolbelt-tool');
    belt.appendChild(tool1);
    var tool2 = document.createElement('span');
    tool2.classList.add('html');
    tool2.classList.add('toolbelt-tool');
    belt.appendChild(tool2);
    var tool3 = document.createElement('span');
    tool3.classList.add('react');
    tool3.classList.add('toolbelt-tool');
    belt.appendChild(tool3);
    var tool4 = document.createElement('span');
    tool4.classList.add('mongo');
    tool4.classList.add('toolbelt-tool');
    belt.appendChild(tool4);
    menuRowStyle.appendChild(belt);
  }

  if (id === 'Tag - Game') {// Static image of ball sliding across
    // Give shadow with opacity decreasing
    // 5 layers
    // On Mouse over
    // have ball slide out of row
    // have ball change color when out of site
    // Open Tag Game
  }

  if (id === 'Words of Wisdom') {
    menuRowStyle.classList.add('wisdom');
    menuRowStyle.addEventListener('click', function () {
      // Close menu
      toggleMenu();
      var container = document.createElement('div');
      var title = document.createElement('p');
      title.appendChild(document.createTextNode('Words'));
      container.appendChild(title); // open

      openWindow('file', 'Words'); // const randomQuote = Math.floor(Math.random() * Math.floor(conf.widsom.length));
      // const quoteBox = document.getElementById('Words');
      // const quote = document.createElement('p');
      // quote.classList.add('quote');
      // quote.appendChild(document.createTextNode(conf.widsom[randomQuote]));
      // quoteBox.appendChild(quote);
    });
  }

  if (id === 'Contact') {
    menuRowStyle.classList.add('contact');
    menuRowStyle.addEventListener('click', function () {
      toggleMenu();
      var container = document.createElement('div');
      var title = document.createElement('p');
      title.appendChild(document.createTextNode('Contact.info'));
      container.appendChild(title); // open

      openWindow('file', 'Contact.info');
    });
  }

  if (id === 'Adventures') {
    menuRowStyle.style.color = 'white';
    menuRowStyle.classList.add('adventure');
    menuRowStyle.addEventListener('click', function () {
      toggleMenu();
      var container = document.createElement('div');
      var title = document.createElement('p');
      title.appendChild(document.createTextNode('Adventures.info'));
      container.appendChild(title); // open

      openWindow('file', 'Adventures.info');
    });
  }

  if (id === 'Do Our Part') menuRowStyle.classList.add('earth');

  if (id === 'Restart?') {
    menuRowStyle.style.color = 'white';
    menuRowStyle.classList.add('restart');
    menuRowStyle.addEventListener('click', function () {
      document.location.reload(true);
    });
  }

  return menuRowStyle;
}

function createMenuRowAction(el) {
  var menuRowAction = el;
  var firstScroll; // Hover Actions
  // To animate images a little

  menuRowAction.addEventListener('mouseenter', function () {
    this.classList.add('on');
    this.getElementsByTagName('h2')[0].classList.add('on');
  });
  menuRowAction.addEventListener('mouseleave', function () {
    this.classList.remove('on');
    this.getElementsByTagName('h2')[0].classList.remove('on');
  }); // Scroll Actions
  // To open and close menu with scroll

  menuRowAction.addEventListener('touchstart', function (e) {
    firstScroll = firstScroll || e.touches[0].clientY; // if (e.y > firstScroll){
    //     console.log(ey);
    // }
  });
  menuRowAction.addEventListener('touchmove', function (e) {// console.log(e);
    // e.preventDefault();
  });
  menuRowAction.addEventListener('touchend', function (e) {
    var scrollCloseMenu = 150;
    var scrollDelta = e.changedTouches[0].clientY;

    if (scrollDelta > firstScroll) {
      setTimeout(function () {
        if (scrollDelta > firstScroll + scrollCloseMenu) {
          document.getElementsByClassName('open-menu')[0].remove();
          menuOpen = false;
        }
      }, 500);
    }
  });
  return menuRowAction;
}

function createMenuRow(content) {
  var menuRow = document.createElement('div');
  menuRow.classList.add('menu-row');
  menuRow.appendChild(createMenuRowText(content));
  menuRow = createMenuRowStyle(menuRow, content);
  menuRow = createMenuRowAction(menuRow);
  return menuRow;
}

function toggleMenu() {
  if (!menuOpen) {
    var menu = document.createElement('div');
    menu.classList.add('open-menu');

    var _iterator = _createForOfIteratorHelper(conf.menu),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var content = _step.value;
        var menuRow = createMenuRow(content);
        menuRow.style.height = "".concat(100 / conf.menu.length, "%");
        menu.appendChild(menuRow);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    document.body.appendChild(menu);
    menuOpen = true;
  } else {
    document.getElementsByClassName('open-menu')[0].remove();
    menuOpen = false;
  }
}

function createFolderRowTitle(content) {
  // row text
  var rowTitle = document.createElement('h2'); // if (content.length > 10){
  //     let content1 = content.slice(0, 12);
  //     let content2 = content.slice(-8);
  //     content = content1 + "..." + content2;
  // Switch info opening to a data attribute
  //     rowTitle.setAttribute('data-title', content)
  // }

  var rowTitleText = document.createTextNode(content);
  rowTitle.style.alignSelf = 'center';
  rowTitle.style.fontSize = '20px'; // rowTitle.style.fontSize = "24px";

  rowTitle.style.paddingLeft = '10px';
  rowTitle.appendChild(rowTitleText);
  return rowTitle;
}

function createFolderRow(content, folderTitle) {
  var folderRow = document.createElement('div');
  folderRow.classList.add('folder-content');
  folderRow.style.backgroundColor = conf[folderTitle].indexOf(content) % 2 ? '#EDE2DE' : 'rgba($color: #000000, $alpha: 0)';
  folderRow.addEventListener('click', function () {
    getIconInfo(folderRow);
  });
  folderRow.appendChild(createFolderRowTitle(content));
  return folderRow;
} // Creates folder content based on title
// Title correlates to array above


function folderBody(title) {
  var folderTitle = title.toLowerCase(); // contains each Row

  var folderBody = document.createElement('div');
  folderBody.classList.add('folder-body'); // Generating each row

  var _iterator2 = _createForOfIteratorHelper(conf[folderTitle]),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var content = _step2.value;
      var folderRow = createFolderRow(content, folderTitle);
      if (conf[folderTitle].indexOf(content) === 0) folderRow.setAttribute('style', 'border-top: none;');
      folderBody.appendChild(folderRow);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var folder = document.getElementsByClassName('open-folder')[foldersOpen - 1];
  console.log('folder', folder);
  var firstNode = folder.firstChild;
  folder.insertBefore(folderBody, firstNode);
  folder.appendChild(createWindowTitle(title));
}

function createWindowTitle(title) {
  var windowDiv = document.createElement('div');
  windowDiv.classList.add('window-title');
  var modTitle = title;

  if (modTitle.length > 10) {
    modTitle = title.slice(0, 9);
    modTitle += '...';
  }

  var windowTitle = document.createElement('h2');
  windowTitle.appendChild(document.createTextNode(modTitle));
  windowDiv.appendChild(windowTitle);
  windowDiv.setAttribute('onmousedown', 'mydragg.startMoving(this.parentNode, "container", event)');
  windowDiv.setAttribute('onmouseup', 'mydragg.stopMoving("container")');
  return windowDiv;
}

function closeButton(type) {
  var closeBtn = document.createElement('div');
  closeBtn.classList.add('red-close');
  closeBtn.addEventListener('click', function () {
    closeWindow(this, type);
  }, false); // X on button

  var xleft = document.createElement('div');
  xleft.classList.add('close-x-left');
  var xright = document.createElement('div');
  xright.classList.add('close-x-right');
  var middle = document.createElement('div');
  middle.classList.add('close-x-middle');
  closeBtn.appendChild(middle);
  closeBtn.appendChild(xleft);
  closeBtn.appendChild(xright);
  return closeBtn;
}

function createInfoWindow(title) {
  var fileExtensionIndex = title.indexOf('.'); // Special Case Info Files

  var divReveal = title.slice(0, fileExtensionIndex);

  if (title !== 'Words') {
    divReveal = document.getElementById(divReveal).cloneNode(true); // divReveal.setAttribute('onmouseup', 'mydragg.stopMoving("container")');

    if (divReveal.classList.contains('d-none')) divReveal.classList.remove('d-none');
  } else {
    divReveal = document.createElement('div');
    var randomQuote = Math.floor(Math.random() * Math.floor(conf.widsom.length));
    var quoteContainer = document.createElement('div');
    quoteContainer.classList.add('quote-container');
    var quote = document.createElement('p');
    quote.innerHTML = conf.widsom[randomQuote];
    quoteContainer.appendChild(quote);
    divReveal.appendChild(quoteContainer);
  } // upgrade this to be for every animate class


  divReveal.setAttribute('id', title);
  divReveal.classList.add('open-info');
  divReveal.classList.add(title.slice(0, fileExtensionIndex));
  divReveal.style.backgroundColor = '#fff';
  var closeBtn = closeButton('info');
  divReveal.appendChild(closeBtn);
  var windowShadow = document.createElement('div');
  windowShadow.classList.add('window-shadow');
  divReveal.appendChild(windowShadow);
  divReveal.appendChild(createWindowTitle(title));
  document.body.appendChild(divReveal);
  setTimeout(function () {
    var aniDiv = divReveal.getElementsByClassName('animate');

    var _iterator3 = _createForOfIteratorHelper(aniDiv),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var animation = _step3.value;
        animation.classList.add('on');
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }, 10);
  createSubmenu();
}

function openWindow(type, title) {
  screencontrol(type, title); // newWindow, the close button and title

  var newWindow = document.createElement('div');
  newWindow.setAttribute('id', title); // file vs folder sorting

  if (type === 'file') {
    filesOpen++; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Info Files

    var fileExtensionIndex = title.indexOf('.');
    var fileExtension = title.slice(fileExtensionIndex); // if (fileExtension === '.info') {
    //     createInfoWindow(title);
    //     return;
    // }

    newWindow.classList.add('open-file');

    if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
      newWindow.style.backgroundImage = "url('./img/".concat(title, "')");
      var spacerDiv = document.createElement('div');
      spacerDiv.classList.add('image-spacer');
      newWindow.appendChild(spacerDiv);
    } else {
      createInfoWindow(title);
      return;
    }

    newWindow.appendChild(createWindowTitle(title));
  }

  if (type === 'folder') {
    foldersOpen++;
    newWindow.classList.add('open-folder');
  }

  var windowShadow = document.createElement('div');
  windowShadow.classList.add('window-shadow');
  newWindow.appendChild(windowShadow); // newWindow.setAttribute('onmouseup', 'mydragg.stopMoving("container")');
  // newWindow.appendChild(createWindowTitle(title));

  newWindow.appendChild(closeButton(type));
  document.body.appendChild(newWindow);
} // figure out icon type


function getIconInfo(item) {
  var itemName = item.getElementsByTagName('h2')[0].innerHTML;
  var extension = itemName.indexOf('.');

  if (extension >= 0) {
    openWindow('file', itemName);
  } else {
    openWindow('folder', itemName); // Currently a seperate call, or else no DOM element for Body to load too

    folderBody(itemName);
  }
} // removes Data and Window from DOM


function closeWindow(el, type) {
  if (type === 'info' || type === 'file') filesOpen--;
  if (type === 'folder') foldersOpen--;
  var elTitle = el.parentElement.getElementsByTagName('h2')[0].innerHTML;
  var elTitleLocation = windowsThatAreOpen.indexOf(elTitle);
  windowsThatAreOpen.splice(elTitleLocation, 1);
  el.parentElement.remove();
} // Move this up ! First thing to load
// initial functionality
// TODO: Revise preloader to include percentage,  make it live text not an images *//
// const preloader = () => {
//     // Remove preloader from here will load too slow on Mobile
// };
// if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll))
//     preloader();
// else
//     document.addEventListener('DOMContentLoaded', preloader);


window.onload = function (e) {
  var preloader = document.getElementsByClassName('preload');

  var _iterator4 = _createForOfIteratorHelper(preloader),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var preload = _step4.value;
      preload.classList.add('on');
    } // have Getting started only show up on first enter or every month
    // console.log(document.cookie);
    // give icons actions

  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var deskIcon = document.getElementsByClassName('desk-icon');

  var _iterator5 = _createForOfIteratorHelper(deskIcon),
      _step5;

  try {
    var _loop = function _loop() {
      var item = _step5.value;
      item.addEventListener('click', function () {
        getIconInfo(item);
      });
    };

    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      _loop();
    } // give menu action

  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var menu = document.getElementById('menu-btn');
  menu.addEventListener('click', function () {
    toggleMenu();
  });
  var background = document.getElementById('container');
  var firstScroll;
  background.addEventListener('touchstart', function (e) {
    // set timeout to reset firstScroll
    firstScroll = e.touches[0].clientY; // if (e.y > firstScroll){
    //     console.log(ey);
    // }
  }); // document.body.addEventListener('touchmove', function (e){
  //     e.preventDefault();
  // })
  // SCROLL UP TO OPEN MENU
  // NEEDS TO BE CLEANED UP less sensitive>

  background.addEventListener('touchend', function (e) {
    var scrollCloseMenu = 100;
    var scrollDelta = e.changedTouches[0].clientY;

    if (scrollDelta < firstScroll) {
      setTimeout(function () {
        if (scrollDelta < firstScroll - scrollCloseMenu) toggleMenu();
      }, 200);
    } // set timeout if scrollLimit is reached within 200ms

  });
};

function createSubmenu() {
  var submenu = document.getElementsByClassName('body-subtitle submenu');

  var _loop2 = function _loop2(i) {
    var element = submenu[i];
    element.addEventListener('mouseenter', function () {
      element.classList.add('hover');
      console.log('entering');
    }); // element.classList.add('hover'));

    element.addEventListener('mouseout', function () {
      element.classList.remove('hover');
      console.log('leving');
    }); // element.classList.remove('hover'));

    element.addEventListener('click', function () {
      var bodyCopy = element.parentElement.getElementsByClassName('body-copy');

      for (var _i = 0; _i < bodyCopy.length; _i++) {
        // console.log(element.parentElement);
        bodyCopy[_i].classList.toggle('on');
      }
    });
  };

  for (var i = 0; i < submenu.length; i++) {
    _loop2(i);
  }
} // what is happening????
// investigate further
// limit so cannot go out of window  or over menu bar --- hiding overflow right now
// eslint-disable-next-line func-names


var mydragg = function () {
  // return console.log('testing for real');
  return {
    stopMoving: function stopMoving(container) {
      console.log('stop'); // var a = document.createElement('script');

      document.getElementById(container).style.cursor = 'default';

      document.onmousemove = function () {};
    },
    move: function move(el, xpos, ypos) {
      console.log('positoning', [xpos, ypos]);
      el.style.left = "".concat(xpos, "px");
      el.style.top = "".concat(ypos, "px");
    },
    startMoving: function startMoving(el, container, evt) {
      console.log(el);

      if (evt.offsetY > 0) {
        var OGposX = evt.clientX;
        var OGposY = evt.clientY;
        var eWi = parseInt(el.offsetWidth);
        var eHe = parseInt(el.offsetHeight);
        var divTop = el.offsetTop;
        var divLeft = el.offsetLeft;
        var cWi = parseInt(document.getElementById(container).offsetWidth);
        var cHe = parseInt(document.getElementById(container).offsetHeight) - 40;
        document.getElementById(container).style.cursor = 'move';
        var divRight = cWi - (divLeft + eWi);
        var divBottom = cHe - (divTop + eHe);
        var differX = OGposX - divLeft;
        var differY = OGposY - divTop; // eslint-disable-next-line func-names

        document.onmousemove = function (evt) {
          evt = evt || window.event;
          var posX = evt.clientX;
          var posY = evt.clientY;
          var aX = posX - differX;
          var aY = posY - differY;
          if (OGposX - posX >= divLeft - eWi / 2) aX = eWi / 2;
          if (OGposY - posY >= divTop) aY = 0;
          if (posX - OGposX >= divRight + eWi / 2) aX = cWi - eWi / 2;
          if (posY - OGposY >= divBottom) aY = cHe - eHe;
          console.log('final values', [aX, aY]);
          mydragg.move(el, aX, aY);
        };
      }
    }
  };
}();