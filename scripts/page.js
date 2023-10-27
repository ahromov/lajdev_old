var lang = '';
var login = '';
var messages = {};
var loadTimeout = 400;

function generateHeaderLogo() {
    $('#logo').html(`
        <h1 class="logo">${serverName}</h1>
        <p class="logo">${messages.slogan}</p>
    `);
}

function generateFooterLogo() {
    $('#social .l2logo').html(`
        <h1 class="logo">${serverName}</h1>
        <p class="logo">${messages.slogan}</p>
    `);
}

function generateHeader() {
    $('header').html(`
        <nav>
        </nav>
        <div class="main_31">
            <div id="logo"></div>
            <div class="status">
                <ul>
                    <li id="serverName"></li>
                    <li id="status"></li>
                    <li id="count"></li>
                </ul>
            </div>
        </div>
    `);
}

function generateMenu() {
    $('nav').html(`
        <ul>
            <li><a href="#!home" id="home">${messages.general}</a></li>
            <li><a href="#!about" id="about">${messages.aboutServer}</a></li>
            <li><a href="#!reg" id="reg">${messages.registration}</a></li>
            <li><a target="_blank" href="https://drive.google.com/drive/folders/16HTmRrs3jnxeBoKxVjb8ydaCa60LGYgO?usp=sharing" id="files">${messages.files}</a></li>
            <li><a href="#!stat" id="stat">${messages.statistic}</a></li>
            <li><a href="#!cont" id="contact">${messages.contact}</a></li>
            //<li><a target="_blank" href="${urlForum}" id="forum">${messages.forum}</a></li>
        </ul>
    `);
}

function looginFormView() {
    $("#lk_form").html(`
        <form>
            <h1>${messages.personalCabinet}</h1>
            <div id="formInputs">
                <div><span class="login">${messages.loginName}:</span><input autocomplete="off" id="inputLoginl3" type="text"></div>
                <div><span class="password">${messages.password}:</span><input autocomplete="off" id="inputPassword3" type="password"></div>
            </div>
            <div>
                <button class="login" type="button">${messages.enter}</button>
            </div>
		</form>
		<div id="formBoard">
			<span>${messages.forgotPassword}</span> <a class="forgot">? >></a>
        </div>
    `);
}

function cabinetFormView() {
    let formSelector = '#lk_form form';
    $(formSelector).html(`
        <h1>${messages.welcome}  ${login}!</h1>
        <button type="button" class="changePass">${messages.passwordChanging}</button>
        <button type="button" class="exit">${messages.exit}</button>
    `);
    $(formSelector + ' button').css('width', '159px');
}

function formInfoView(status, message) {
    let formSelector = '#lk_form form';
    $(formSelector).html(`
        <h1>${status}  ${message}!</h1>
        ${message}
    `);
    $(formSelector + ' button').css('width', '159px');
}

function generatePosts() {
    $('#forum .posts').html('');
    let countListItem = 0;

    function myFunction(value) {
        let date = new Date(value.lastPostedDate);
        let topicImageUrl = '';
        if (value.icon !== null) {
            topicImageUrl = `<img src="${urlForum}/images/icons/${value.icon.url}">`;
        }
        $('#forum .posts').append(`
            <li id=${countListItem}>
                <h2>${topicImageUrl}<a target="_blank" href="${urlForum}/viewtopic.php?f=${value.forumId}&t=${value.id}">${value.title.substring(0, 25) + (value.title.length > 25 ? " ..." : "")}</a> // ${date.toLocaleDateString()} ${date.toLocaleTimeString()} • ${value.posterName}</h2>
            </li>`).css({transform: 'translateY(0px)'});
        if (topicImageUrl !== '') {
            $(`#forum .posts li[id="${countListItem}"]`).addClass('empty_marker');
        }
        countListItem++;
    };
    fetch(serverUrl + '/forums/get/topics/last5')
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                data.forEach(element => {
                    myFunction(element)
                });
            }
        });
}

function generateNewsPage(pageId) {
    $('#articles').html('');

    function myFunction(value) {
        let date = new Date(value.date);
        $('#articles').append(`
                    <section>
                        <figure>
                            <img src="data:image/jpg;base64,${value.image}">
                            <div>
                            <figcaption>
                            <time datetime="${value.date}"><span>${date.getDate()}</span>/${date.getMonth() + 1}/${date.getFullYear()}</time>
                            <p><span>${messages.publishingIn}</span> ${date.toLocaleTimeString()}</p>
                            </figcaption>
                            </div>
                            <a class="readMore" id="${value.id}" type="button"><span>${messages.readMore}</span></a>
                        </figure>
                        <div id="news">                
                            <h2>${value.title}</h2>
                            <p>${value.text.substring(0, 200) + (value.text.length > 200 ? " ..." : "")}</p>
                        </div>
                    </section>
                `).css({transform: 'translateY(0px)'});
    };
    if (pageId == null)
        pageId = 0;
    fetch(serverUrl + '/news/get/pages/' + pageId)
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                data.forEach(element => {
                    myFunction(element)
                });
            }
        });
    setButtonActive('a.nextNewsPage', 'npActive', '#next_page ul li a[id="' + pageId + '"]');
}

function generateNewsPagesButtons(id) {
    $('#next_page ul').append(`
        <li><a class="nextNewsPage" id="${id}" type="button">${id + 1}</a></li>
    `);
    $('#next_page ul li:first-child a').addClass('npActive');
}

function generateLanguageSelectors(checkedUa, checkedRu, checkedEn) {
    return `<ul>
                <li class="${checkedUa}"><a id="ua" href="#">UA</a></li>                
                <li class="${checkedEn}"><a id="en" href="#">EN</a></li>
            </ul>`;
}

function generateMainContent(languagesSelectors) {
    let playIndex = Math.floor(Math.random() * videosIds.length);
    $('main').html(`
        <div id="left">
            <article>
                <h1>${messages.news}</h1>
                <div id="articles">

                </div>
            </article>
        </div>
        <div id="right">
            <div>
                <section id="lk_form">
                    
                </section>
                <section id="lang">
                    ${languagesSelectors}
                </section>
            </div>
            <section id="slider">
                <div class="wrap">
                    <iframe autoplay=1 width="430" height="245" src="https://www.youtube.com/embed/${videosIds[playIndex]}?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </section>
            <section id="forum">
                <div class="caption">
                    <h1>${messages.forumMessages}</h1>
                </div>
                <ul class="posts">
                    
                </ul>
            </section>
        </div>
    `);
    looginFormView();
    elementFadeShow('main');
    fetch(serverUrl + '/news/pages/count')
        .then(response => response.text())
        .then(data => {
            if (data > 0) {
                for (let i = 0; i < data; i++) {
                    generateNewsPagesButtons(i);
                }
            }
        });
}

function generateMain(newsPageId) {
    setButtonActive('nav ul li a', 'navActive', 'nav #home');
    switch (lang) {
        case 'ru':
            generateMainContent(generateLanguageSelectors('', 'checked', ''));
            break;
        case 'ua':
            generateMainContent(generateLanguageSelectors('checked', '', ''));
            break;
        case 'en':
            generateMainContent(generateLanguageSelectors('', '', 'checked'));
            break;
    }
    generateNewsPage(newsPageId);
    generatePosts();
}

function generateBackButton(id) {
    let slelector = '#next_page ul';
    if (id != null) {
        $(slelector).html(`
            <li><a class="newsBack" id="${id}" href="#"><<</a></li>
        `);
    } else {
        $(slelector).html(`
            <li><a class="homeBack" href="#"><<</a></li>
        `);
    }
}

function generateFooter() {
    $('footer').html(`
        <section class="left">
            <div id="next_page"><ul></ul></div>
            <h1>© ${new Date().getFullYear()} ${developerName}</h1>
            <p>${messages.license}</p>
        </section>
        <section id="social" class="right">
            <div class="title"><h1>${messages.ourCommunitys}:</h1></div>
            <div class="l2logo"></div>
            <div class="social_list">
                <ul>
                    <li>
                        <div>FB</div>
                        <a>facebook.com/<span>${developerName}</span></a>
                    </li>
                    <li>
                        <div>TW</div>
                        <a>twitter.com/<span>${developerName}</span></a>
                    </li>
                </ul>
            </div>
        </section>
    `)
}

function setButtonActive(elementRemove, className, elementActive) {
    $(elementRemove).removeClass(className);
    $(elementActive).addClass(className);
}

function getRegisteredServerName() {
    let prom = fetch(serverUrl + '/ls/getServers');
    prom.then(response => response.json()).then(data => {
        if (data.length > 0) {
            data.forEach(element => {
                $('#serverName').text(element.name);
            });
        } else
            $('#serverName').text("None");
    });
}

function showGreeting(statusText, onlineCount) {
    $('.status ul li#status').html(statusText).css('color', (statusText === 'ON' ? 'green' : null));
    $('.status ul li#count').html(onlineCount);
}

function getServerStatus() {
    let prom = fetch(serverUrl + '/gs/status');
    prom.then(response => {
        if (response.status == 200) {
            prom.then(response => response.text()).then(data => {
                showGreeting("ON", data);
            });
        } else {
            console.log("Server unavailable")
            showGreeting("OFF", 0);
        }
    });
}

function initDefaultLanguagesSettings() {
    if ($.cookie('language') != null)
        lang = $.cookie('language');
    else lang = 'ru';
    switch (lang) {
        case 'ru':
            messages = ruMessages;
            break;
        case 'ua':
            messages = uaMessages;
            break;
        case 'en':
            messages = enMessages;
            break;
    }
}

function generateMainPage(newsPageId) {
    document.title = messages.title;
    generateMenu();
    generateHeaderLogo();
    generateMain(newsPageId);
    generateFooter();
    generateFooterLogo();
}

function cantEmpty(data) {
    $('div.message form  p.' + data).html(messages.fieldsCannotEmpty).css('color', 'red');
}

function setFormHeaderStatusText(statusMessage, color) {
    $('#lk_form form h1').html(statusMessage).css("color", color);
}

function formsPsswordChangedView() {
    $('#lk_form form #formInputs').html(`
        <div class="infoMessage">
            ${messages.passwordChanged}
        </div>
	`).css('text-align', 'center');
    $('button.changePassword').hide();
    $('button.restore').hide();
    setFormHeaderStatusText(messages.passwordChanged, 'green');
}

function formsRegisteredUserView() {
    $('#lk_form form #formInputs').html(`
        <div class="infoMessage">
            ${messages.accountCreated}
        </div>
	`).css('text-align', 'center');
    $('button.register').hide();
    setFormHeaderStatusText(messages.accountCreated, 'green');
}

function elementFadeHide(elSelector) {
    $(elSelector).css({opacity: 0});
}

function elementFadeShow(elSelector) {
    $(elSelector).css({opacity: 1});
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        $('form button[type="button"]').focus();
    }
}

function formReset() {
    $('form').trigger('reset');
}

function setFormHeaderMessageByStatusCode(data) {
    switch (data.status) {
        case 409:
            formReset();
            setFormHeaderStatusText(data.message, 'yellow');
            break;
        case 404:
            formReset();
            setFormHeaderStatusText(data.message, 'orange');
            break;
        case 400:
            formReset();
            setFormHeaderStatusText(data.message, 'red');
            break;
    }
}

async function sendHttpRequest(method, url, data) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function sendRequestAndChangeFormView(method, userData, path, view) {
    let prom = sendHttpRequest(method, serverUrl + path, userData);
    elementFadeHide('#lk_form form');
    prom.then((response) => {
        setTimeout(function () {
            if (response.status <= 299) {
                formReset();
                if (view !== null) {
                    view();
                } else {
                    setFormHeaderMessageByStatusCode(response.status)
                    formInfoView(response.status, "All OK");
                }
            } else {
                prom.then(response => response.json()).then(data => {
                    setFormHeaderMessageByStatusCode(data);
                });
            }
            elementFadeShow('#lk_form form');
        }, loadTimeout);
    });
}

function changePageLanguage(langAbbr, messagesObj) {
    let navSelector = 'nav';
    let logoSelector = '#logo';
    let mainSelector = 'main';
    elementFadeHide(navSelector);
    elementFadeHide(logoSelector);
    elementFadeHide(mainSelector);
    setTimeout(function () {
        lang = langAbbr;
        messages = messagesObj;
        $.cookie('language', lang);
        elementFadeShow(navSelector);
        elementFadeShow(logoSelector);
        generateMainPage();
    }, loadTimeout);
}

function initAll() {
    initDefaultLanguagesSettings();
    generateHeader();
    generateMainPage();
    getRegisteredServerName();
    getServerStatus();
}

$(document).ready(function () {
    initAll();
})

$(document).on('click', 'nav #home', function () {
    let navSelector = 'nav';
    let mainSelector = 'main';
    elementFadeHide(navSelector);
    elementFadeHide(mainSelector);
    setTimeout(function () {
        elementFadeShow(navSelector);
        generateMainPage();
    }, loadTimeout);
})

$(document).on('click', 'nav #about', function () {
    let navSelector = 'nav';
    let mainSelector = 'main';
    elementFadeHide(navSelector);
    elementFadeHide(mainSelector);
    let ratesTable = '';
    fetch(serverUrl + '/gs/get/rates')
        .then(response => response.json()).then(data => {
        if (data != null) {
            $.each(data, function (i, val) {
                ratesTable += `<tr><th>${i}</th><td>x${val}</td></tr>`;
            });
            setTimeout(function () {
                $(mainSelector).html(`
                        <div class="top">
                            <div id="stat">
                                <article>
                                    <h1>${messages.rates}</h1>
                                    <section>
                                        <table id="rates">
                                            ${ratesTable}
                                        </table>
                                    </section>
                                </article>
                                <article>
                                    <h1>${messages.selectIntoTop}:</h1>
                                    <div class="top">
                                        <p>${messages.selectIntoTopDescription}</p>
                                    </div>
                                </article>
                                <article>
                                    <h1>${messages.common}:</h1>
                                    <div class="top">
                                        <p>${messages.commonDescription}</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    `);
                setButtonActive('nav ul li a', 'navActive', 'nav #about');
                elementFadeShow(navSelector);
                elementFadeShow(mainSelector);
                generateBackButton(null);
            }, loadTimeout);
        }
    });
})

$(document).on('click', 'nav #reg', function () {

    var hiddenCaptcha;
    var realCaptcha;

    fetch(serverUrl + '/accounts/captcha')
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                hiddenCaptcha = data.hiddenCaptcha;
                realCaptcha = data.realCaptcha;
            }
        });

    let formSelector = "#lk_form form";
    let navSelector = 'nav';
    let mainSelector = 'main';
    elementFadeHide(navSelector);
    elementFadeHide(mainSelector);
    setTimeout(function () {
        elementFadeShow(navSelector);
        generateMainPage();
        setButtonActive('nav ul li a', 'navActive', 'nav #reg');
        $(formSelector).html(`
            <form> 
            <h1>${messages.registration}</h1>
            <div id="formInputs">
            <div><span>${messages.loginName}:</span><input id="inputLoginl3" type="text"></div>
            <div><span>${messages.email}:</span><input id="inputEmail3" type="email"></div>
            <div><span>${messages.password}:</span><input id="inputPassword3" type="password"></div>
            <div><span><img id="realCaptcha" src="data:image/png;base64,${realCaptcha}"></span><input id="captcha" type="text"></div>
	    	<div><input id="hiddenCaptcha" type="hidden" value="${hiddenCaptcha}"></div>
            <button class="register" type="button">${messages.send}</button>
        `);
        $(formSelector + ' h1').css({
            'font-size': '10px',
            'margin-top': '-5px'
        });
        $(formSelector + ' div').css({
            'margin-top': '0px',
            'margin-bottom': '2px'
        });
        $(formSelector + ' div input').css('height', '20px');
        $(formSelector + ' div span').css('padding-top', '2px');
        $(formSelector + ' button').css({
            'width': '134px',
            'margin-right': '35px',
            'height': '18px',
            'margin-top': '0px'
        });
    }, loadTimeout);
})

$(document).on('click', 'nav #stat', function () {
    let navSelector = 'nav';
    let mainSelector = 'main';

    elementFadeHide(navSelector);
    elementFadeHide(mainSelector);
    setTimeout(function () {
        $('main').html(
            `<div class="top">
                <div id="stat">
                    <article>
                        <h1>${messages.common}</h1>
                        <section>
                            <table>
                                <tr>
                                    <th>${messages.accounts}:</th>
                                    <th>${messages.characters}:</th>
                                    <th>${messages.nobleses}:</th>
                                    <th>${messages.heroes}:</th>
                                    <th>${messages.gameMasters}:</th>
                                    <th>${messages.clans}:</th>
                                    <th>${messages.allys}:</th>
                                </tr>
                                <tr>
                                    <td id="accCount"></td>
                                    <td id="countAll"></td>
                                    <td id="countNobless"></td>
                                    <td id="countHeroes"></td>
                                    <td id="countGm"></td>
                                    <td id="countClans"></td>
                                    <td id="countAllys"></td>
                                </tr>
                            </table>
                        </section>
                    </article>
                    <article id="top10">
                        <h1>${messages.top10chars}</h1>
                        <section>
                            <table>
                                <tr>
                                    <th>${messages.charName}:</th>
                                    <th>${messages.lvl}:</th>
                                    <th>${messages.charClass}:</th>
                                    <th>${messages.charSex}:</th>
                                    <th>${messages.clanName}:</th>
                                    <th>${messages.gameTime}:</th>
                                    <th>PvP/PK:</th>
                                </tr>
                            </table>
                        </section>
                    </article>
                    <article id="clans">
                        <h1>${messages.clans}</h1>
                        <section>
                            <table>
                                <tr>
                                    <th>${messages.clanName}:</th>
                                    <th>${messages.lvl}:</th>
                                    <th>${messages.leader}:</th>
                                    <th>${messages.castleName}:</th>
                                    <th>${messages.fortName}:</th>
                                    <th>${messages.reputation}:</th>
                                    <th>${messages.midLvl}:</th>
                                    <th>${messages.ally}:</th>
                                </tr>
                            </table>
                        </section>
                    </article>
                    <article id="castles">
                        <h1>${messages.castles}</h1>
                        <section>
                            <table>
                                <tr>
                                    <th></th>
                                    <th>${messages.castleName}:</th>
                                    <th>${messages.clanName}:</th>
                                    <th>${messages.tax}:</th>
                                    <th>${messages.treasure}:</th>
                                    <th>${messages.siegeDate}:</th>
                                </tr>
                            </table>
                        </section>
                    </article>
                    <article id="forts">
                        <h1>${messages.forts}</h1>
                        <section>
                            <table>
                                <tr>
                                    <th></th>
                                    <th>${messages.fortName}:</th>
                                    <th>${messages.clanName}:</th>
                                    <th>${messages.siegeDate}:</th>
                                </tr>
                            </table>
                        </section>
                    </article>
            </div>
        </div>
        `);

        elementFadeShow(navSelector);
        elementFadeShow(mainSelector);
        setButtonActive('nav ul li a', 'navActive', 'nav #stat');
        generateBackButton();

        fetch(serverUrl + '/accounts/count/all')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    $('#accCount').html(data);
                }
            });

        fetch(serverUrl + '/characters/count/byType')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    $('#countAll').html(data.all);
                    $('#countNobless').html(data.nobles);
                    $('#countHeroes').html(data.heroes);
                    $('#countGm').html(data.gms);
                }
            });

        fetch(serverUrl + '/clans/count/all')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    $('#countClans').html(data);
                }
            });

        fetch(serverUrl + '/clans/count/allAllys')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    $('#countAllys').html(data);
                }
            });

        fetch(serverUrl + '/clans/get/all')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    data.forEach(element => {
                        $('#stat #clans table').append(
                            '<tr>' +
                            '<td>' + element.name + '</td>' +
                            '<td>' + element.level + '</td>' +
                            '<td>' + element.leaderName + '</td>' +
                            '<td>' + element.castleName + '</td>' +
                            '<td>' + element.fortName + '</td>' +
                            '<td>' + element.reputation + '</td>' +
                            '<td>' + element.midCharsLevel + '</td>' +
                            '<td>' + (element.alyName == null ? 'None' : element.alyName) + '</td>' +
                            '</tr>'
                        );
                    });
                }
            });

        fetch(serverUrl + '/characters/get/top10')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    data.forEach(element => {
                        $('#stat #top10 table').append(
                            `<tr>
                            <td>` + element.charName + `</td>
                            <td >` + element.level + `</td>
                            <td >` + element.className + `</td>
                            <td >` + element.gender + `</td>
                            <td >` + element.clanName + `</td>
                            <td >` + Math.round((element.onlineTime / 1000 / 60) * 100) / 100 + ` С‡.</td>
                            <td >` + element.pvpKills + '/' + element.pkKills + `</td>
                            </tr>`
                        );
                    });
                }
            });

        fetch(serverUrl + '/castles/get/all')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    data.forEach(element => {
                        let date = new Date(element.siegeDate);

                        $('#stat #castles table').append(
                            '<tr>' +
                            '<td><img src="images/castles/' + element.id + '.jpg"</td>' +
                            '<td>' + element.name + '</td>' +
                            '<td >' + element.clanName + '</td>' +
                            '<td >' + element.taxPercent + '%</td>' +
                            '<td >' + element.treasury + '</td>' +
                            '<td >' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '</td>' +
                            '</tr>'
                        );
                    });
                }
            });

        fetch(serverUrl + '/forts/get/all')
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    data.forEach(element => {
                        let siegeDate = 'None';

                        if (element.siegeDate !== 0) {
                            let date = new Date(element.siegeDate);
                            siegeDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                        }

                        $('#stat #forts table').append(
                            '<tr>' +
                            '<td><img src="images/forts/' + element.id + '.jpg"</td>' +
                            '<td>' + element.name + '</td>' +
                            '<td>' + element.clanName + '</td>' +
                            '<td>' + siegeDate + '</td>' +
                            '</tr>'
                        );
                    });
                }
            });
    }, loadTimeout);
})

$(document).on('click', 'nav #contact', function () {
    let navSelector = 'nav';
    let mainSelector = 'main';
    elementFadeHide(navSelector);
    elementFadeHide(mainSelector);
    setTimeout(function () {
        $('main').html(`
            <div class="top">
                <div id="stat">
                    <article>
                        <h1>${messages.contactsForm}</h1>
                        <section>
                            <p>${messages.mesageCanOnlyRegisteredUsers}</p>
                            <div class="message">
                                <form>
                                    <label>${messages.fullName}: <input type="text" class="name"><p class="name"></p></label>
                                    <label>${messages.messagesText}: <textarea class="message"></textarea><p class="message"></p></label>
                                    <button class="sendMessage" type="button">${messages.send}</button>
                                </form>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        `);
        elementFadeShow(navSelector);
        elementFadeShow(mainSelector);
        setButtonActive('nav ul li a', 'navActive', 'nav #contact');
        generateBackButton();
    }, loadTimeout);
})

$(document).on('click', 'a.readMore', function () {
    let articlesSelector = '#articles';
    elementFadeHide(articlesSelector);
    let newsId = $(this).attr('id');
    setTimeout(function () {
        function newsRender(value) {
            let date = new Date(value.date);
            $(articlesSelector).html(`
                <section>
                    <figure>
                        <img src="data:image/png;base64,${value.image}">
                        <div>
                            <figcaption>
                                <time datetime="${value.date}"><span>${date.getDate()}</span>/${date.getMonth() + 1}/${date.getFullYear()}</time>
                                <p><span>${messages.publishingIn}</span> ${date.toLocaleTimeString()}</p>
                            </figcaption>
                        </div>
                        <a class="readMore" id="${value.id}" href="#">${messages.readMore}</a>
                    </figure>
                    <div id="news">                
                        <h2>${value.title}</h2>
                        <p>${value.text}</p>
                    </div>
                </section>
            `);
            $(articlesSelector + ' section').css({background: 'none'});
            $('a.readMore').css({display: 'none'});
        };
        fetch(serverUrl + '/news/get/' + newsId)
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    newsRender(data);
                }
            });
        elementFadeShow(articlesSelector);
    }, loadTimeout);
})

$(document).on('click', '.homeBack', function () {
    let mainSelector = 'main';
    elementFadeHide(mainSelector);
    $(this).css({display: 'none'});
    setTimeout(function () {
        generateMainPage(null);
    }, loadTimeout);
})

$(document).on('click', '.nextNewsPage', function () {
    $('#articles').css({opacity: 0});
    let id = $(this).attr('id');
    setTimeout(function () {
        generateNewsPage(id);
        $('#articles').css({opacity: 9});
    }, loadTimeout);
})

function isInputEmpty(obj) {
    if (obj.login === "" || obj.email === "" || obj.password === "" || obj.repeatedPassword === "" || obj.newPassword === "" || obj.newRepeatedPassword === "")
        return true;
    return false;
}

$(document).on('click', 'button.login', function () {
    grecaptcha.execute('6LcW18QUAAAAAO7x430ImUvox3gR3SzhUwJCIr8C', {
        action: 'login'
    }).then(function (token) {
        if (token !== null) {
            sendHttpRequest('POST', serverUrl + '/reCaptcha/validate', {response: token}).then(response => response.json())
                .then((result) => {
                    if (!result.success && result.score < 0.5) {
                        $('form').trigger('reset');
                        setFormHeaderStatusText(messages.botsAction, 'red');
                        return;
                    }
                    login = $("#inputLoginl3").val();
                    let password = $("#inputPassword3").val();

                    let userData = {
                        login: login,
                        password: password
                    };

                    if (isInputEmpty(userData)) {
                        setFormHeaderStatusText(messages.fieldsCannotEmpty, 'red');
                        return;
                    }

                    setFormHeaderStatusText(messages.waiting, 'inherit');

                    sendRequestAndChangeFormView('POST', userData, "/accounts/login", cabinetFormView);
                });
        }
    });
})

$(document).on('click', "button.register", function () {

    let formSelector = '#lk_form form';
    let login = $("#inputLoginl3").val();
    let email = $("#inputEmail3").val();
    let pass = $("#inputPassword3").val();
    let captcha = $("#captcha").val();
    let hiddenCaptcha = $("#hiddenCaptcha").val();

    $(formSelector + 'h1').css("color", "white").html(messages.waiting);

    var userData = {
        login: login,
        email: email,
        password: pass,
        hiddenCaptcha: hiddenCaptcha,
        captcha: captcha
    };

    if (isInputEmpty(userData)) {
        setFormHeaderStatusText(messages.fieldsCannotEmpty, 'red');
        return;
    }

    sendRequestAndChangeFormView('POST', userData, "/accounts/create", formsRegisteredUserView);
})

$(document).on('click', "button.restore", function () {
    grecaptcha.execute('6LcW18QUAAAAAO7x430ImUvox3gR3SzhUwJCIr8C', {
        action: 'login'
    }).then(function (token) {
        if (token !== null) {
            sendHttpRequest('POST', serverUrl + '/reCaptcha/validate', {response: token}).then(response => response.json())
                .then((result) => {
                    if (result.success && result.score > 0.5) {
                        let login = $("#inputLoginl3").val();
                        let email = $("#inputEmail3").val();

                        setFormHeaderStatusText(messages.waiting, 'inherit');

                        var userData = {
                            login: login,
                            email: email
                        };

                        if (isInputEmpty(userData)) {
                            setFormHeaderStatusText(messages.fieldsCannotEmpty, 'red');
                            return;
                        }

                        sendRequestAndChangeFormView('PUT', userData, "/accounts/restorePass", formsPsswordChangedView);
                    } else {
                        setFormHeaderStatusText(messages.botsAction, 'red');
                        $('form').trigger('reset');
                        return;
                    }
                })
        }
    });
})

$(document).on('click', "button.changePass", function () {
    let formSelector = '#lk_form form';
    elementFadeHide(formSelector);
    setTimeout(function () {
        $(formSelector).html(` 
            <h1>${messages.passwordChanging} ${login}!</h1>
            <div id="formInputs">
                <div><span>${messages.oldPassword}:</span><input id="oldPassword" type="password"></div>
                <div><span>${messages.newPassword}:</span><input id="newFirstPassword" type="password"></div>
                <div><span>${messages.repeatePassword}:</span><input id="newSecondPassword"" type="password"></div>
            </div>
            <button class="back" type="button"><< ${messages.back}</button>
            <button class="changePassword" type="button">${messages.change}</button>
        `);
        $(formSelector + ' h1').css('font-size', '10px').css('margin-top', '-5px');
        $(formSelector + ' div span').css('width', '138px');
        $(formSelector + ' div input').css('height', '25px').css('width', '214px');
        $(formSelector + ' button').css('width', '105px').css('transform', 'translateX(-32px)').css('margin-right', '2px').css('height', '20px').css('width', '105px');
        $(formSelector + ' button.back').css('width', '97px');
        elementFadeShow(formSelector);
    }, loadTimeout);
})

$(document).on('click', "button.changePassword", function () {
    let oldPassword = $("#oldPassword").val();
    let newFirstPassword = $("#newFirstPassword").val();
    let newSecondPassword = $("#newSecondPassword").val();

    let userData = {
        login: login,
        password: oldPassword,
        newPassword: newFirstPassword,
        newRepeatedPassword: newSecondPassword
    };

    if (isInputEmpty(userData)) {
        setFormHeaderStatusText(messages.fieldsCannotEmpty, 'red');
        return;
    }

    setFormHeaderStatusText(messages.waiting, 'inherit');
    sendRequestAndChangeFormView('PUT', userData, '/accounts/changePass', formsPsswordChangedView)
})

$(document).on('click', "#lk_form form button.back", function () {
    let formSeletor = '#lk_form form';
    elementFadeHide(formSeletor);
    setTimeout(function () {
        cabinetFormView();
        elementFadeShow(formSeletor);
    }, loadTimeout);
})

$(document).on('click', "button.exit", function () {
    let formSeletor = '#lk_form form';
    elementFadeHide(formSeletor);
    setTimeout(function () {
        login = null;
        looginFormView();
        elementFadeShow(formSeletor);
    }, loadTimeout);
})

$(document).on('click', "a.forgot", function () {
    let formSelector = '#lk_form form';
    elementFadeHide(formSelector);
    setTimeout(function () {
        $("#lk_form form").html(`
            <form> 
                <h1>${messages.passwordChanging}</h1>
                <div id="formInputs">
                    <div><span>${messages.loginName}:</span><input id="inputLoginl3" type="text"></div> 
                    <div><span>${messages.email}:</span><input id="inputEmail3" type="email"></div>
                </div> 
            <button class="restore" type="button">${messages.change}</button>
        `);
        $("button[type='button']").removeClass().addClass('restore');
        $(formSelector + 'button').css({
            'width': '134px',
            'margin-right': '35px',
            'margin-top': '5px'
        });
        elementFadeShow(formSelector);
    }, loadTimeout);
})

$(document).on('click', '#lang a#ua', function () {
    changePageLanguage('ua', uaMessages);
})

$(document).on('click', '#lang a#ru', function () {
    changePageLanguage('ru', ruMessages);
})

$(document).on('click', '#lang a#en', function () {
    changePageLanguage('en', enMessages);
})

$(document).on('click', 'button.sendMessage', function () {
    grecaptcha.execute('6LcW18QUAAAAAO7x430ImUvox3gR3SzhUwJCIr8C', {
        action: 'social'
    }).then(function (token) {
        if (token !== null) {
            sendHttpRequest('POST', serverUrl + '/reCaptcha/validate', {response: token}).then(response => response.json())
                .then((result) => {
                    if (result.success && result.score > 0.5) {
                        let login = $('div.message form input.name').val();
                        let message = $('div.message form textarea.message').val();
                        if (login === '' || login == null) {
                            cantEmpty('name');
                            return;
                        }
                        if (message === '' || message == null) {
                            cantEmpty('message');
                            return;
                        }
                        let userData = {
                            login: login,
                            message: message
                        };
                        let prom = sendHttpRequest('POST', serverUrl + "/accounts/sendMess", userData);
                        prom.then(response => {
                            $('main').css({opacity: 0});
                            setTimeout(function () {
                                if (response.status == 200) {
                                    $('main div.message').html(messages.messageSended).css("color", "green");
                                } else {
                                    prom.then(response => response.json()).then(data => {
                                        switch (data.status) {
                                            case 400:
                                                $('main div.message').html(data.message).css("color", "orange");
                                                break;
                                            case 404:
                                                $('main div.message').html(data.message).css("color", "red");
                                                break;
                                        }
                                    })
                                }
                                $('main').css({opacity: 9});
                            }, loadTimeout);
                        })
                    } else {
                        $('div.message form p.question').html(message.botsAction).css('color', 'red');
                        return;
                    }
                })
        }
    })
})

$(document).on('keypress', 'input[type="password"]', function (e) {
    checkSubmit(e);
})
