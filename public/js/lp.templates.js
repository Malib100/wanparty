// Templator je en moj majhen framework kateri omogoča ponovno-uporabo statičnih templejtov.
// Moje sožalje, če boš moral razumeti to kodo.

const lp = {
    allowOnlySingleExtendedTeamPanel: false
}

Templator.New({
    name: 'lpNav',
    observe: '#header',
    render: props => {
        return (html `
            <div .header-nav-btn ?id="${props._id}">
                <a ?href="${props.link}">
                    <div><div class="header-nav-btn-content" >${props.children}</div></div>
                </a>
                <div class="header-nav-btn-underline"></div>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpNav_Brackets',
    observe: '#header',
    render: props => {
        return (html `
            <div .header-nav-btn ?id="${props._id}">
                <a ?href="${props.link}">
                    <div><div class="header-nav-btn-content" >${props.children}</div></div>
                </a>
                <div class="header-nav-btn-underline"></div>

                <div  .header-nav-bracketlist>
                    <a href="/razporedje/lol" ><div>LoL</div></a>
                    <a href="/razporedje/valorant" ><div>Valorant</div></a>
                    <a href="/razporedje/rl" ><div>Rocket Leauge</div></a>
                </div>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpCornerBox',
    observe: 'body',
    render: props => {
        return (html `
            <div INHERIT  >
                <div #pointer-events="none" .no-select #height="32px">
                    <img .crnr-tl src="./media/images/corner.png" />
                    <img .crnr-tr src="./media/images/corner.png" />
                </div>
                <div .content >${props.children}</div>
                <div #pointer-events="none" .no-select #height="32px">
                    <img .crnr-bl src="./media/images/corner.png" />
                    <img .crnr-br src="./media/images/corner.png" />
                </div>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpButton',
    observe: 'body',
    render: props => {
        return (html `
            <div INHERIT_NAME ><a href="${props.link}"><span>${props.children}</span></a></div>
        `)
    }
})

Templator.New({
    name: 'lpTitle',
    observe: 'body',
    render: props => {
        return (html `
            <div INHERIT_NAME #user-select="none" #text-align="center" #font-weight="600" #font-size="58px" #margin-bottom="0.2em"><span>${props.children}</span></div>
        `)
    }
})

Templator.New({
    name: 'lpPost',
    observe: 'body',
    render: props => {
        return (html `
            <div INHERIT_NAME #margin-bottom="5px"><a ?href=${props.link}><div>
                <div .title>${props.title}</div>
                <div .content>${props.children}</div>
            </div></a></div>
        `)
    }
})

Templator.New({
    name: 'lpButton2',
    observe: 'body',
    render: props => {
        if (props.disabled != null) {
            return (html `
                <a #font-size="19px"  #background="gray" #text-decoration="none" #color="white" target="blank" >
                    <div #cursor="default" .disabled_btn INHERIT_NAME #margin="0 auto" #margin-top="5px " #overflow-x="">
                        <span #background-color="gray" #max-width="80%"> ${props.children}</span>
                    </div>
                </a>
            `)
        }

        return (html `
            <a #font-size="19px" #text-decoration="none" #color="white" target="blank" !href="${props.link}"><div INHERIT_NAME #margin="0 auto" #margin-top="5px " #overflow-x=""><span #max-width="80%"> ${props.children}</span></div></a>
        `)
    }
})

Templator.New({
    name: 'lpStream',
    observe: 'body',
    render: props => {
        return (html `
            <div>
                <div><lpTitle>STREAM</lpTitle></div>
                <div id="twitch-embed"></div>
    <script src="https://embed.twitch.tv/embed/v1.js"></script>
    <script type="text/javascript">
      new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: "monstercat",
        parent: ["wanparty.herokuapp.com"]
      });
    </script>
            </div>
        `)
    }
})

const ToggleResponsiveMenuNav = () => {
    let elem = document.getElementById('responsiveHeader_Menu');
    if (elem) {
        elem.toggleAttribute('show');
    }
}
Templator.New({
    name: 'lpResponsiveLogo',
    observe: 'body',
    render: props => {
        return (html `
            <div #text-align="center" #height="100%" >
                <a>
                    <div onClick="ToggleResponsiveMenuNav()"  #padding-right="1em" #float="right" #display="inline-block" #position="absolute"  #padding-right="0.8em"  #right="0" #height="100%" #width="3em">
                        <div #transform="scale(0.6)" .menu #height="100%" #width="3em"></div>
                    </div> 
                </a>
  
                <a href="/">
                    <div INHERIT_NAME #display="inline-block"  #margin="0 auto" .logo #width="4em" #height="100%"></div>
                </a>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpMenu',
    observe: 'body',
    render: props => {
        return (html `
            <div #float="right" #height="100%">
                <div
                    INHERIT_NAME .menu
                    #display="inline-block"
                    #margin="auto 0"
                    #width="4em"
                    #height="100%"
                ></div>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpFancyButton',
    observe: 'body',
    render: props => {
        return (html `
            <div #display="inline-block" #padding="6px 12px" #border="1px solid black" INHERIT_NAME #position="relative">
                <a href="ww">
                    <div .clippedBg></div>
                    <div>${props.children}</div>
                </a>
            </div>
        `)
    }
})

Templator.New({
    name: 'lpSep',
    observe: 'body',
    render: props => {
        return html `
            <div #margin="1em 0" #background-color="black" #height="1px"></div>
        `
    }
})

Templator.New({
    name: 'lpResMenuNav',
    observe: 'body',
    render: props => {
        return html `
            <a  ?href="${props.link}"><div  #padding="15px 0" #text-align="center" >${props.children}</div></a>
        `
    }
})

const toggleBracketsPanel = () => {
    let elem = document.getElementById('responsiveBracketsPanel');
    if (elem) {
        elem.toggleAttribute('open');
    }
}
Templator.New({
    name: 'lpResBracketsNav',
    observe: 'body',
    render: props => {
        return html `
            <a #user-select="none" onClick="toggleBracketsPanel()"><div  #padding="15px 0" #text-align="center" >${props.children}</div></a>
            <div id="responsiveBracketsPanel" >
                <a href="/razporedje/lol" ><div>Leauge of Legends</div></a>
                <a href="/razporedje/valorant" ><div>Valorant</div></a>
                <a href="/razporedje/rl" ><div>Rocket Leauge</div></a>
            </div
        `
    }
})

Templator.New({
    name: 'lpSocialsBar',
    observe: 'body',
    render: props => {
        return html `
            <div #display="flex" #justify-content="center" #align-content="center" #align-items="center" >
                <lpSocialLink
                    name="facebook"
                    link="https://www.facebook.com/scvlanparty/"
                ></lpSocialLink>
  
                <lpSocialLink
                    name="twitter"
                    link="https://twitter.com/LanScv"
                ></lpSocialLink>
  
                <lpSocialLink
                    name="discord"
                    link="https://discord.gg/Wep26wxXUP"
                ></lpSocialLink>
  
                <lpSocialLink
                    name="twitch"
                    link="https://twitch.tv/scvlanparty"
                ></lpSocialLink>
            </div>
        `
    }
})

Templator.New({
    name: 'lpSocialLink',
    observe: 'body',
    render: props => {
        return html `
            <a #margin="0 5px" INHERIT_NAME target="blank" href="${props.link}"  >
                <img width="52" alt="${props.alt}" src="/media/images/s-${props.name}.png"> 
            </div>
        `
    }
})

Templator.New({
    name: 'lpTopBorderedTitle',
    observe: 'body',
    render: props => {
        return html `
            <div  INHERIT #display="flex" #justify-content="space-around" >
                <div #background-color="black" #height="1px" #flex="1"></div>
                <div #font-size="58px">${props.children}</div>
                <div #background-color="black" #height="1px" #flex="1"></div>
            </div>
        `
    }
})

Templator.New({
            name: 'lpTeamsContainer',
            observe: 'body',
            render: props => {
                    return html `
        <div INHERIT #margin-bottom="3em">
            <div>
                <div #overflow="hidden" #position="relative" -#margin="0 .5em 0 .5em" >

                    <!-- There is a little glitch in chromium, where if you put a blur filter on an element
                         which is transformed in scale, it will result in a transparent blur... but only when
                         the scrollbar is visible. Ugh. Firefox doesn't have this issue :)
                        
                         To combat this, the blurred background image is repeated many times, which sort of 
                         makes the opacity issue almost unnoticable. It may not be efficient, but hey, it works! -->
                    ${html`
                    <div
                        #transform-origin="50% 50%"
                        #transform="scale(1.8)"
                        #filter="blur(8px)"
                        #position="absolute"
                        #width="100%"
                        #height="100%"
                        #top="0"
                        #left="0"
                        #right="0"
                        #background-size="cover"
                        #background-image="url('${props.frame}')" 
                    ></div>`.repeat(4)}
                    <div #padding="0.7em 1em" #position="relative" #font-size="25px" #text-align="center" >
                        <span class="__title_long" #user-select="none" #padding="0.3em 0.5em" #background="rgba(0,0,0,.5)" #color="white">${props.game}</span>
                </div>
            </div>
  
            <div
                #cursor="pointer"
                class="__teams"
                -#margin=" 0 0.5em 0.5em"
                #display="flex"
                #flex-direction="column"
            >
                <div  #cursor="default">${props.children}</div>
            </div>
        </div>
      `
    }
})

function toggleTeamExpansion(id) {
    let elem = document.getElementById(id);
    let others = document.getElementsByClassName('lpTeam');

    if (lp.allowOnlySingleExtendedTeamPanel) {
        Array.from(others).forEach(other => {
            if (other !== elem)
                other.classList.remove('open');
        })
    }

    if (elem) {
        elem.classList.toggle("open");
    }
}

T('lpTeam', ({teamname, $meta, children, ...rest}) => {
    let teamId = `lpTeam-${$meta.id}`;
    return html`
        <div
            id="${teamId}"
            #cursor="pointer"
            INHERIT
            class="lpTeam"
            #padding="12px 12px"
            #font-size="22px"
            onclick="toggleTeamExpansion('${teamId}')"
            #user-select="none"
        >
            <span>${teamname}</span>
            <span class="closedExpand" #float="right" > + </span>
            <span class="openExpand" #float="right" #padding-right="4px" #letter-spacing="-3px" > --- </span>
        </div>

        <div class="lpTeamInfoPanel" #overflow="hidden">
            <div #position="static" #padding="8px 0 8px 18px">
                ${children}
            </div>
        </div>
    `
})

T('lpPlayers', ({teamname, $meta, children, ...rest}) => {
    let teamId = `lpTeam-${$meta.id}`;
    return html`
        <div  INHERIT #overflow="hidden">
            <div #position="static" #padding="8px 0 8px 18px">
                ${children}
            </div>
        </div>
    `
})


T('lpHomeGame', ({title, image, $meta}) => {
    return html`
        <a>
            <div #overflow="hidden" #position="relative" #height="6em" #margin-top="8px">
                <div
                #transform-origin="50% 50%"
                #transform="scale(1.2)"
                #filter="blur(8px)"
                #position="absolute"
                #width="100%"
                #height="100%"
                #top="0"
                #left="0"
                #right="0"
                #background-size="cover"
                #background-image="url('${image}')"
                >
                </div>

                <div
                #position="absolute"
                #width="100%"
                #height="100%"
                #top="0"
                #left="0"
                #right="0"
                >
                    <div #padding="1em 1em" #position="relative" #font-size="25px" #text-align="center" >
                        <span class="__title_long" #user-select="none" #padding="0.3em 0.5em" #background="rgba(0,0,0,.5)" #color="white">${title}</span>
                    </div> 
                </div>      
            </div>
        </a>
    `
})

T('faq', ({q, a}) => html`
    <div #margin-bottom="2em">
        <div class="faq-question">
            <strong>${q}</strong>
        </div>
        <div class="faq-answer">${a}</div>
    </div>
`)

T('faqContainer', ({children}) => html`
    <div #display="flex" #justify-content="center" #margin-bottom="2em">
        <div #max-width="800px">
            <lpCornerBox #background-color="red">
                <div #display="flex" #justify-content="center"><div  #width="100%"  #margin-top="2em">${children}</div></div>
            </lpCornerBox>
        </div>
    </div>
`)

T('lpSponsor', ({children: name, image, url}) => html`
    <a href="${url}" target="blank"><img alt="${name}" src="${image}" /></a> 
`)

T('lpBracketTitle', ({children: title}) => html`
    <div #INHERIT class="lpBracketTitle" #padding="5px" >
        <a >${title}</a>
    </div
`)

T('lpSporedSep', () => html`
    <div #INHERIT class="lpSporedSep" #padding="1px 0 0 0" #max-height="1px" #background-color="black" #margin=".5em 0" >
    </div
`)

Templator.RenderInDomAll();